import { default as express } from "express";
import { body, validationResult, param } from "express-validator";
import { AxiosRequestConfig, default as axios } from "axios";
import { default as bcrypt } from "bcrypt";
import assert from "assert";
import { default as jwt } from "jsonwebtoken";
import { Profile } from "../models/profile.model";
import { authenticate, axiosConfig, filterPublicProfiles } from "../utils/utils";

const router = express.Router();

//this api should not be accessible by the public
router.post("/oauth",
    body("email").isEmail().normalizeEmail(),
    async (req, res) => {
        const validator_result = validationResult(req);

        if (!validator_result.isEmpty()) {
            return res.status(400).send({
                statusCode: 400,
                error: "Invalid request",
                errors: validator_result.array()
            });
        }

        const response = await axios.get("http://db:8000/users/email/" + req.body.email, axiosConfig);

        if (response.status !== 200) {
            return res.status(400).send({
                statusCode: 400,
                message: "User not found"
            });
        }

        const user = response.data;

        assert(process.env.JWT_SECRET, "JWT_SECRET not found in .env file!");

        const profile = await axios.get("http://db:8000/profiles/userid/" + user._id, axiosConfig);

        if (profile.status != 200) {
            return res.status(500).send({
                statusCode: 500,
                message: "Cannot find a profile for this user, contact an administrator",
            });
        }

        const token = jwt.sign({
            id: profile.data._id,
        }, process.env.JWT_SECRET);

        return res.send({
            token: token
        });
    }
);

router.post("/login",
    body("email").isEmail().normalizeEmail(),
    body("password").isString(),
    async (req, res) => {
        const validator_result = validationResult(req);

        if (!validator_result.isEmpty()) {
            return res.status(400).send({
                statusCode: 400,
                error: "Invalid request",
                errors: validator_result.array()
            });
        }

        const response = await axios.get("http://db:8000/users/email/" + req.body.email, axiosConfig);

        if (response.status !== 200) {
            return res.status(400).send({
                statusCode: 400,
                message: "Invalid email or password"
            });
        }

        const user = response.data;
        const is_match = await bcrypt.compare(req.body.password, user.password);

        if (!is_match) {
            return res.status(400).send({
                statusCode: 400,
                message: "Invalid email or password"
            });
        }

        assert(process.env.JWT_SECRET, "JWT_SECRET not found in .env file!");

        const profile = await axios.get("http://db:8000/profiles/userid/" + user._id, axiosConfig);

        if (profile.status != 200) {
            return res.status(500).send({
                statusCode: 500,
                message: "Cannot find a profile for this user, contact an administrator",
            });
        }

        const token = jwt.sign({
            id: profile.data._id,
        }, process.env.JWT_SECRET);

        return res.send({
            token: token
        });
    }
);

router.get("/username/:username", param("username").isString().isLength({min: 8}), async (req, res) => {

    const validator_result = validationResult(req);

    if (!validator_result.isEmpty()) {
        return res.status(400).send({
            statusCode: 400,
            error: "Invalid request",
            errors: validator_result.array()
        });
    }

    const response = await axios.get<Profile[]>("http://db:8000/profiles/username/" + req.params?.username, axiosConfig);

    if (response.status != 200) {
        return res.status(response.status).send(response.data);
    }

    const profiles = response.data;

    if(profiles.some(profile => profile.username == req.params?.username)) {
        return res.send(false);
    } else {
        return res.send(true);
    }
});

router.get("/email/:email", param("email").isEmail(), async (req, res) => {

    const validator_result = validationResult(req);

    if (!validator_result.isEmpty()) {
        return res.status(400).send({
            statusCode: 400,
            error: "Invalid request",
            errors: validator_result.array()
        });
    }

    const response = await axios.get<Profile[]>("http://db:8000/users/email/" + req.params?.email, axiosConfig);

    if (response.status == 200) {
        return res.send(false);
    } else if(response.status == 404) {
        return res.send(true);
    } else {
        return res.status(response.status).send(response.data);
    }
});

router.post("/",
    body("email").exists().isEmail(),
    body("account_type").exists().isIn(["email", "google"]),
    body("password").if(body("account_type").equals("email")).notEmpty(),
    body("username").exists().isLength({min: 8}),
    async (req, res) => {

        const validator_result = validationResult(req);

        if (!validator_result.isEmpty()) {
            return res.status(400).send({
                statusCode: 400,
                error: "Invalid request",
                errors: validator_result.array()
            });
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
            if (response.status == 200) {

                //Auth object created succefully, creating user's profile
                const profile = {
                    user: response.data._id,
                    username: req.body.username
                };

                const profile_response = await axios.post("http://db:8000/profiles/", profile, axiosConfig);
                if (profile_response.status == 200) {
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

//From now on, the requests are authenticated
router.use(authenticate);

router.put("/id/:id", async (req, res) => {

    if (req.user.id != req.params.id) {
        return res.status(401).send({
            statusCode: 401,
            message: "You are not authorized to perform this action"
        });
    }

    let editObj: Profile = {};

    if (req.body.name !== undefined) {
        editObj.name = req.body.name;
    }

    if (req.body.bio !== undefined) {
        editObj.bio = req.body.bio;
    }

    if (req.body.links !== undefined) {
        editObj.links = req.body.links;
    }

    if (req.body.public !== undefined) {
        editObj.public = req.body.public;
    }

    if (req.body.cryptos !== undefined) {
        editObj.cryptos = req.body.cryptos;
    }

    if (req.body.following !== undefined) {
        editObj.following = req.body.following;
    }

    const response = await axios.put("http://db:8000/profiles/id/" + req.params.id, editObj, axiosConfig);

    if (response.status != 200) {
        return res.status(response.status).send(response.data);
    }

    return res.send(response.data);

});

router.get("/id/:id", async (req, res) => {

    const profile = await axios.get("http://db:8000/profiles/id/" + req.params.id, axiosConfig);

    if (profile.status != 200) {
        return res.status(profile.status).send(profile.data);
    }

    if (profile.data.public == false && req.user.id != req.params.id) {
        return res.send(filterPublicProfiles(profile.data));
    }

    return res.send(profile.data);

});

router.get("/me", async (req, res) => {

    const profile = await axios.get("http://db:8000/profiles/id/" + req.user.id, axiosConfig);

    if (profile.status != 200) {
        return res.status(profile.status).send(profile.data);
    }

    return res.send(profile.data);

});

router.get("/fromUsername/:username",
    param("username").isString(),
    async (req, res) => {

        const validator_result = validationResult(req);

        if (!validator_result.isEmpty()) {
            return res.status(400).send({
                statusCode: 400,
                error: "Invalid request",
                errors: validator_result.array()
            });
        }

        const profiles = await axios.get("http://db:8000/profiles/username/" + req.params?.username, axiosConfig);

        if (profiles.status !== 200) {
            return res.status(profiles.status).send(profiles.data);
        }

        return res.send(profiles.data.map(filterPublicProfiles));
    }
);

router.get("/fromCrypto/:crypto",
    param("crypto").isString(),
    async (req, res) => {

        const validator_result = validationResult(req);

        if (!validator_result.isEmpty()) {
            return res.status(400).send({
                statusCode: 400,
                error: "Invalid request",
                errors: validator_result.array()
            });
        }

        const profiles = await axios.get("http://db:8000/profiles/crypto/" + req.params?.crypto, axiosConfig);

        if (profiles.status !== 200) {
            return res.status(profiles.status).send(profiles.data);
        }

        return res.send(profiles.data.map(filterPublicProfiles));
    }
);

router.get("/id/:id/following", async (req, res) => {

    const profile = await axios.get<Profile>("http://db:8000/profiles/id/" + req.params.id, axiosConfig);

    if (profile.status != 200) {
        return res.status(profile.status).send(profile.data);
    }

    if (profile.data.public == false && req.user.id != req.params.id) {
        return res.status(401).send({
            statusCode: 401,
            message: "You are not authorized to perform this action"
        });
    }

    if (profile.data.following) {

        const profiles = await Promise.all(profile.data.following.map(async (id: string) => {
            const profile = await axios.get<Profile>("http://db:8000/profiles/id/" + id, axiosConfig);
            if (profile.status != 200) {
                return null;
            }
            return profile.data;
        }));

        return res.send(profiles.filter(profile => profile != null).map(filterPublicProfiles));

    } else {
        return res.send([]);
    }

});

router.put("/id/:id/following", body("id").isString(), async (req, res) => {

    const validator_result = validationResult(req);

    if (!validator_result.isEmpty()) {
        return res.status(400).send({
            statusCode: 400,
            error: "Invalid request",
            errors: validator_result.array()
        });
    }

    if (req.user.id != req.params?.id) {
        return res.status(401).send({
            statusCode: 401,
            message: "You are not authorized to perform this action"
        });
    }

    const profile = await axios.get<Profile>("http://db:8000/profiles/id/" + req.params?.id, axiosConfig);

    if (profile.status != 200) {
        return res.status(profile.status).send(profile.data);
    }

    if (req.params?.id == req.body.id) {
        return res.status(400).send({
            statusCode: 400,
            message: "You cannot follow yourself"
        });
    }

    const follow = await axios.get<Profile>("http://db:8000/profiles/id/" + req.body.id, axiosConfig);

    if (follow.status == 404 || !follow.data._id) {
        return res.status(400).send({
            statusCode: 400,
            message: "Profile not found"
        });
    }

    if (follow.status != 200) {
        return res.status(follow.status).send(follow.data);
    }

    const new_following = (profile.data.following ?? []).concat(follow.data._id);

    const response = await axios.put("http://db:8000/profiles/id/" + req.params?.id, {
        following: new_following
    }, axiosConfig);

    if (response.status != 200) {
        return res.status(response.status).send(response.data);
    }

    return res.send(response.data);

});

router.delete("/id/:id/following/:following", async (req, res) => {

    if (req.user.id != req.params.id) {
        return res.status(401).send({
            statusCode: 401,
            message: "You are not authorized to perform this action"
        });
    }

    const profile = await axios.get<Profile>("http://db:8000/profiles/id/" + req.params.id, axiosConfig);

    if (profile.status != 200) {
        return res.status(profile.status).send(profile.data);
    }

    if (profile.data.following && profile.data.following.includes(req.params.following)) {

        const new_following = profile.data.following.filter(id => id != req.params.following);
        const response = await axios.put("http://db:8000/profiles/id/" + req.params.id, {
            following: new_following
        }, axiosConfig);

        if(response.status == 200) {
            return res.sendStatus(200);
        }

        return res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        });

    } else {
        return res.status(400).send({
            statusCode: 400,
            message: "Profile not found"
        });
    }

});

router.get("/id/:id/followers", async (req, res) => {

    const profiles = await axios.get("http://db:8000/profiles/all", axiosConfig);

    if (profiles.status != 200) {
        return res.status(profiles.status).send(profiles.data);
    }

    const filtered_profiles = profiles.data.filter((profile: Profile) => profile.following?.includes(req.params.id));
    return res.send(filtered_profiles.map(filterPublicProfiles));

});

export default router;