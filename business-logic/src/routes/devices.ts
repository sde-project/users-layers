import axios from "axios";
import express from "express";
import { body, validationResult } from "express-validator";
import { authenticate, axiosConfig } from "../utils/utils";

const router = express.Router();

router.use(authenticate);

router.post("/token", body("token").exists(), async (req, res) => {

    const validator_result = validationResult(req);

    if (!validator_result.isEmpty()) {
        return res.status(400).send({
            statusCode: 400,
            error: "Invalid request",
            errors: validator_result.array()
        });
    }

    const { token } = req.body;

    const tokenInfo = await axios.get("http://db:8000/devices/token/" + token, axiosConfig);

    if (tokenInfo.status == 200) {
        if (tokenInfo.data.user == req.user.id) {
            //token already registered, update last used
            const response = await axios.put("http://db:8000/devices/id/" + tokenInfo.data._id, {
                last_used: new Date()
            }, axiosConfig);

            if (response.status == 200) {
                return res.sendStatus(200);
            }
        } else {
            //token was already registered to another user, removing it
            const response = await axios.delete("http://db:8000/devices/id/" + tokenInfo.data._id, axiosConfig);
            if (response.status != 200) {
                return res.status(response.status).send(response.data);
            }

            //registering new token
            const response2 = await axios.post("http://db:8000/devices", {
                user: req.user.id,
                token: token,
                created: new Date(),
                last_used: new Date()
            }, axiosConfig);

            if (response2.status == 200) {
                return res.sendStatus(200);
            } else {
                return res.status(response2.status).send(response2.data);
            }
        }
    } else if (tokenInfo.status == 404) {
        //new token, just create it
        const response = await axios.post("http://db:8000/devices", {
            user: req.user.id,
            token: token,
            created: new Date(),
            last_used: new Date()
        }, axiosConfig);

        if (response.status == 200) {
            return res.sendStatus(200);
        } else {
            return res.status(response.status).send(response.data);
        }
    } else {
        return res.status(tokenInfo.status).send(tokenInfo.data);
    }

});

export default router;