import {default as express} from "express";
import { default as ProfileModel, Profile } from "../models/profile.model";
import { default as AuthModel } from "../models/user-auth.model";
import { body, validationResult, param } from "express-validator";
import DeviceModel from "../models/devices.model";

const router = express.Router();

router.get("/all", async (req, res) => {
    try {
        const profiles = await ProfileModel.find();
        res.send(profiles);
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
        const profile = await ProfileModel.findById(req.params.id);
        if(profile) {
            res.send(profile);
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

router.get("/username/:username", 
    param("username").isString(),
    async (req, res) => {

        const validator_result = validationResult(req);

        if(!validator_result.isEmpty()) {
            return res.status(400).send({errors: validator_result.array()});
        }

        try {
            const profiles = await ProfileModel.find({
                username: {
                    $regex: req.params?.username,
                    $options: "i"
                }
            });
            res.send(profiles);
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

router.get("/crypto/:crypto", 
    param("crypto").isString(),
    async (req, res) => {

        const validator_result = validationResult(req);

        if(!validator_result.isEmpty()) {
            return res.status(400).send({errors: validator_result.array()});
        }

        try {
            const profiles = await ProfileModel.find({ crypto: req.params?.crypto });
            res.send(profiles);
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

router.post("/",
    body("username").exists(),
    body("user").exists(),
    async (req, res) => {
        
        const validator_result = validationResult(req);

        if(!validator_result.isEmpty()) {
            return res.status(400).send({errors: validator_result.array()});
        }

        try {

            const user = await AuthModel.findById(req.body.user);
            if(!user) {
                return res.status(400).send({
                    statusCode: 400,
                    message: "User id is invalid"
                })
            }

            const profile:Profile = {
                username: req.body.username,
                user: req.body.user,
                cryptos: req.body.crypto || [],
                following: req.body.following || [],
                public: req.body.public || true,
                bio: req.body.bio || "",
                name: req.body.name || "",
                links: req.body.links || []
            };

            const profile_db = await ProfileModel.create(profile);
            res.send(profile_db);
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
    async (req, res) => {

        try {

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

            const profile_db = await ProfileModel.findByIdAndUpdate(req.params.id, {$set: editObj});
            const updated = await ProfileModel.findById(profile_db?._id);
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
        const profile_db = await ProfileModel.findByIdAndDelete(req.params.id);
        if(profile_db) {
            await Promise.all([
                AuthModel.findOneAndDelete({_id: profile_db.user}),
                DeviceModel.deleteMany({user: profile_db._id}),
                ProfileModel.updateMany({following: profile_db._id}, {$pull: {following: profile_db._id}})
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