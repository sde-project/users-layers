import {default as express} from "express";
import { UserAuth, default as UserAuthModel } from "../models/user-auth.model";
import { default as ProfileModel } from "../models/profile.model";
import { default as DeviceModel } from "../models/devices.model";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/all", async (req, res) => {
    try {
        const users = await UserAuthModel.find();
        res.send(users);
    } catch(e) {
        console.error(e);
        res.status(500).send({
            statusCode: 500,
            message: "There was an error communicating with the db",
            exception: e
        });
    }
});

router.get("/id/:id", async (req, res) => {
    try {
        const user = await UserAuthModel.findById(req.params.id);
        if(user) {
            res.send(user);
        } else {
            res.status(404).send({
                statusCode: 404,
                message: "Not found"
            });
        }
    } catch(e) {
        console.error(e);
        res.status(500).send({
            statusCode: 500,
            message: "There was an error communicating with the db",
            exception: e
        });
    }
});

router.get("/email/:email", async (req, res) => {
    try {
        const user = await UserAuthModel.findOne({email: req.params.email});
        if(user) {
            res.send(user);
        } else {
            res.status(404).send({
                statusCode: 404,
                message: "Not found"
            });
        }
    } catch(e) {
        console.error(e);
        res.status(500).send({
            statusCode: 500,
            message: "There was an error communicating with the db",
            exception: e
        });
    }
});

router.post("/",
    body("email").exists().isEmail(),
    body("account_type").exists().isIn(["email", "google"]),
    body("password").if(body("account_type").equals("email")).notEmpty(),
    body("salt").if(body("account_type").equals("email")).notEmpty(),
    async (req, res) => {
        
        const validator_result = validationResult(req);

        if(!validator_result.isEmpty()) {
            return res.status(400).send({errors: validator_result.array()});
        }

        try {

            const user:UserAuth = {
                email: req.body.email,
                account_type: req.body.account_type,
                password: req.body.password,
                salt: req.body.salt
            };

            const user_db = await UserAuthModel.create(user);
            res.send(user_db);
        } catch(e) {
            console.error(e);
            res.status(500).send({
                statusCode: 500,
                message: "There was an error communicating with the db",
                exception: e
            });
        }

    }
);

router.put("/id/:id", 
    body("password").exists(),
    body("salt").exists(),
    async (req, res) => {

        const validator_result = validationResult(req);

        if(!validator_result.isEmpty()) {
            return res.status(400).send({errors: validator_result.array()});
        }

        try {
            const user_db = await UserAuthModel.findByIdAndUpdate(req.params?.id, {$set: {
                password: req.body.password,
                salt: req.body.salt
            }});

            const updated = await UserAuthModel.findById(user_db?._id);
            res.send(updated);
        } catch(e) {
            console.error(e);
            res.status(500).send({
                statusCode: 500,
                message: "There was an error communicating with the db",
                exception: e
            });
        }

    }
);

router.delete("/id/:id", async (req, res) => {
    try {
        const user_db = await UserAuthModel.findByIdAndDelete(req.params.id);
        if(user_db) {
            await Promise.all([
                ProfileModel.findOneAndDelete({user: user_db._id}),
                DeviceModel.deleteMany({user: user_db._id})
            ]);
        }

        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.status(500).send({
            statusCode: 500,
            message: "There was an error communicating with the db",
            exception: e
        });
    }
});

export default router;