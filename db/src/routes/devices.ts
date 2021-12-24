import {default as express} from "express";
import { default as DeviceModel, Device } from "../models/devices.model";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/all", async (req, res) => {
    try {
        const devices = await DeviceModel.find();
        res.send(devices);
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
        const device = await DeviceModel.findById(req.params.id);
        if(device) {
            res.send(device);
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

router.get("/user/:user", async (req, res) => {
    try {
        const devices = await DeviceModel.find({user: req.params.user});
        if(devices) {
            res.send(devices);
        } else {
            res.send([]);
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

router.get("/token/:token", async (req, res) => {
    try {
        const device = await DeviceModel.findOne({token: req.params.token});
        if(device) {
            res.send(device);
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
    body("user").exists(),
    body("token").exists(),
    body("created").exists(),
    body("last_used").exists(),
    async (req, res) => {
        
        const validator_result = validationResult(req);

        if(!validator_result.isEmpty()) {
            return res.status(400).send({
                statusCode: 400,
                error: "Invalid request",
                errors: validator_result.array()
            });
        }

        try {

            const device:Device = {
                user: req.body.user,
                token: req.body.token,
                created: req.body.created,
                last_used: req.body.last_used
            };

            const device_db = await DeviceModel.create(device);
            res.send(device_db);
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

        let update:Device = {};

        if(req.body.user) {
            update.user = req.body.user;
        }

        if(req.body.token) {
            update.token = req.body.token;
        }

        if(req.body.created) {
            update.created = req.body.created;
        }

        if(req.body.last_used) {
            update.last_used = req.body.last_used;
        }

        try {
            const device_db = await DeviceModel.findByIdAndUpdate(req.params.id, {$set: update});

            const updated = await DeviceModel.findById(device_db?._id);
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
        const device_db = await DeviceModel.findByIdAndDelete(req.params.id);
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