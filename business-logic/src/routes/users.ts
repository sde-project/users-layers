import { default as express } from "express";
import { body, validationResult, param } from "express-validator";
import { AxiosRequestConfig, default as axios } from "axios";
import { default as bcrypt } from "bcrypt";
import assert from "assert";
import { default as jwt } from "jsonwebtoken";
import { Profile } from "../models/profile.model";

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

const router = express.Router();

assert(process.env.DB_API_KEY, "DB_API_KEY not found in .env file!");
assert(process.env.JWT_SECRET, "JWT_SECRET not found in .env file!");

const axiosConfig:AxiosRequestConfig<any> = {
    headers: {
        "api-key": process.env.DB_API_KEY
    },
    validateStatus: (_) => {
        return true;
    }
}

router.post("/login",
    body("email").isEmail().normalizeEmail(),
    body("password").isString(),
    async (req, res) => {
        const validator_result = validationResult(req);

        if(!validator_result.isEmpty()) {
            return res.status(400).send({errors: validator_result.array()});
        }

        const response = await axios.get("http://db:8000/users/email/" + req.body.email, axiosConfig);

        if(response.status !== 200) {
            return res.status(400).send({
                statusCode: 400,
                message: "Invalid email or password"
            });
        }

        const user = response.data;
        const is_match = await bcrypt.compare(req.body.password, user.password);

        if(!is_match) {
            return res.status(400).send({
                statusCode: 400,
                message: "Invalid email or password"
            });
        }

        assert(process.env.JWT_SECRET, "JWT_SECRET not found in .env file!");

        const token = jwt.sign({
            _id: user._id,
            email: user.email
        }, process.env.JWT_SECRET);

        return res.send({
            token: token
        });
    }
);

router.post("/",
    body("email").exists().isEmail(),
    body("account_type").exists().isIn(["email", "google"]),
    body("password").if(body("account_type").equals("email")).notEmpty(),
    body("username").exists(),
    async (req, res) => {

        const validator_result = validationResult(req);

        if (!validator_result.isEmpty()) {
            return res.status(400).send({ errors: validator_result.array() });
        }

        try {

            let user;

            if (req.body.account_type == "email") {

                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);

                user = {
                    email: req.body.email,
                    account_type: req.body.account_type,
                    password: hash,
                    salt: salt
                };

            } else {

                user = {
                    email: req.body.email,
                    account_type: req.body.account_type,
                }

            }

            const response = await axios.post("http://db:8000/users/", user, axiosConfig);
            if(response.status == 200) {

                //Auth object created succefully, creating user's profile
                const profile = {
                    user: response.data._id,
                    username: req.body.username
                };

                const profile_response = await axios.post("http://db:8000/profiles/", profile, axiosConfig);
                if(profile_response.status == 200) {
                    res.send(profile_response.data);
                } else {
                    //rollback
                    await axios.delete("http://db:8000/users/id/" + response.data._id, axiosConfig);
                    res.status(500).send({
                        statusCode: 500,
                        message: "There was an error creating user's profile",
                    });
                }

            } else {
                res.status(response.status).send(response.data);
            }

        } catch (e) {
            console.error(e);
            res.status(500).send({
                statusCode: 500,
                message: "There was an error communicating with the db",
                exception: e
            });
        }

    }
);

router.use(async (req, res, next) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        assert(process.env.JWT_SECRET, "JWT_SECRET not found in .env file!");
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if(err) {
                return res.status(401).send({
                    statusCode: 401,
                    message: "Invalid token"
                });
            }
            req.user = decoded;

            //Gets profile id
            const profile = await axios.get("http://db:8000/profiles/userid/" + req.user._id, axiosConfig);
            if(profile.status == 200) {
                req.user.profile = profile.data._id;
            }

            next();
        });
    } else {
        return res.status(401).send({
            statusCode: 401,
            message: "No token provided"
        });
    }
});

router.put("/id/:id", async (req, res) => {

    if(req.user._id != req.params.id) {
        return res.status(401).send({
            statusCode: 401,
            message: "You are not authorized to perform this action"
        });
    }

    let editObj:Profile = {};
            
    if(req.body.name) {
        editObj.name = req.body.name;
    }

    if(req.body.bio) {
        editObj.bio = req.body.bio;
    }

    if(req.body.links) {
        editObj.links = req.body.links;
    }

    if(req.body.public) {
        editObj.public = req.body.public;
    }

    if(req.body.cryptos) {
        editObj.cryptos = req.body.cryptos;
    }

    if(req.body.following) {
        editObj.following = req.body.following;
    }

    const response = await axios.put("http://db:8000/profiles/id/" + req.user.profile, editObj, axiosConfig);

    if(response.status != 200) {
        return res.status(response.status).send(response.data);
    }

    return res.send(response.data);

});

router.get("/id/:id", async (req, res) => {
    
    const profile = await axios.get("http://db:8000/profiles/userid/" + req.params.id, axiosConfig);

    if(profile.status != 200) {
        return res.status(profile.status).send(profile.data);
    }

    if(profile.data.public == false && req.user._id != req.params.id) {
        return res.status(401).send({
            statusCode: 401,
            message: "You are not authorized to perform this action"
        });
    }

    return res.send(profile.data);

});

router.get("/me", async (req, res) => {
    
    const profile = await axios.get("http://db:8000/profiles/userid/" + req.user._id, axiosConfig);

    if(profile.status != 200) {
        return res.status(profile.status).send(profile.data);
    }

    return res.send(profile.data);

});

router.get("/fromUsername/:username", 
    param("username").isString(),
    async (req, res) => {

        const validator_result = validationResult(req);

        if(!validator_result.isEmpty()) {
            return res.status(400).send({errors: validator_result.array()});
        }

        const profiles = await axios.get("http://db:8000/profiles/username/" + req.params?.username, axiosConfig);
        
        if(profiles.status !== 200) {
            return res.status(profiles.status).send(profiles.data);
        }

        return res.send(profiles.data.filter((profile:Profile) => profile.public));
    }
);

router.get("/fromCrypto/:crypto", 
    param("crypto").isString(),
    async (req, res) => {

        const validator_result = validationResult(req);

        if(!validator_result.isEmpty()) {
            return res.status(400).send({errors: validator_result.array()});
        }

        const profiles = await axios.get("http://db:8000/profiles/crypto/" + req.params?.crypto, axiosConfig);
        
        if(profiles.status !== 200) {
            return res.status(profiles.status).send(profiles.data);
        }

        return res.send(profiles.data.filter((profile:Profile) => profile.public));
    }
);

export default router;