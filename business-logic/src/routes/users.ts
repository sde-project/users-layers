import { default as express } from "express";
import { body, validationResult } from "express-validator";
import { AxiosRequestConfig, default as axios } from "axios";
import { default as bcrypt } from "bcrypt";
import assert from "assert";

const router = express.Router();

assert(process.env.DB_API_KEY, "DB_API_KEY not found in .env file!");

const axiosConfig:AxiosRequestConfig<any> = {
    headers: {
        "Authorization": process.env.DB_API_KEY
    },
    validateStatus: (_) => {
        return true;
    }
}

// router.get("/all", async (req, res) => {
//     try {
//         const users = await UserAuthModel.find();
//         res.send(users);
//     } catch(e) {
//         console.error(e);
//         res.status(500).send({
//             statusCode: 500,
//             message: "There was an error communicating with the db",
//             exception: e
//         });
//     }
// });

// router.get("/id/:id", async (req, res) => {
//     try {
//         const user = await UserAuthModel.findById(req.params.id);
//         if(user) {
//             res.send(user);
//         } else {
//             res.status(404).send({
//                 statusCode: 404,
//                 message: "Not found"
//             });
//         }
//     } catch(e) {
//         console.error(e);
//         res.status(500).send({
//             statusCode: 500,
//             message: "There was an error communicating with the db",
//             exception: e
//         });
//     }
// });

// router.get("/email/:email", async (req, res) => {
//     try {
//         const user = await UserAuthModel.findOne({email: req.params.email});
//         if(user) {
//             res.send(user);
//         } else {
//             res.status(404).send({
//                 statusCode: 404,
//                 message: "Not found"
//             });
//         }
//     } catch(e) {
//         console.error(e);
//         res.status(500).send({
//             statusCode: 500,
//             message: "There was an error communicating with the db",
//             exception: e
//         });
//     }
// });

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

// router.put("/id/:id", 
//     body("password").exists(),
//     body("salt").exists(),
//     async (req, res) => {

//         const validator_result = validationResult(req);

//         if(!validator_result.isEmpty()) {
//             return res.status(400).send({errors: validator_result.array()});
//         }

//         try {
//             const user_db = await UserAuthModel.findByIdAndUpdate(req.params?.id, {$set: {
//                 password: req.body.password,
//                 salt: req.body.salt
//             }});

//             const updated = await UserAuthModel.findById(user_db?._id);
//             res.send(updated);
//         } catch(e) {
//             console.error(e);
//             res.status(500).send({
//                 statusCode: 500,
//                 message: "There was an error communicating with the db",
//                 exception: e
//             });
//         }

//     }
// );

// router.delete("/id/:id", async (req, res) => {
//     try {
//         const user_db = await UserAuthModel.findByIdAndDelete(req.params.id);
//         if(user_db) {
//             await Promise.all([
//                 ProfileModel.findOneAndDelete({user: user_db._id}),
//                 DeviceModel.deleteMany({user: user_db._id})
//             ]);
//         }

//         res.sendStatus(200);
//     } catch (e) {
//         console.error(e);
//         res.status(500).send({
//             statusCode: 500,
//             message: "There was an error communicating with the db",
//             exception: e
//         });
//     }
// });

export default router;