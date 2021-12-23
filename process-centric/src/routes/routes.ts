import { default as express } from "express";
import { body, validationResult, param } from "express-validator";
import { AxiosRequestConfig, default as axios } from "axios";
import assert from "assert";
import { Profile } from "../models/profile.model";
import { getAxiosConfig } from "../utils/utils";

const router = express.Router();

assert(process.env.BUSINESS_LOGIC_API_KEY, "BUSINESS_LOGIC_API_KEY not found in .env file!");

const axiosConfig: AxiosRequestConfig<any> = {
    headers: {
        "api-key": process.env.BUSINESS_LOGIC_API_KEY
    },
    validateStatus: (_) => {
        return true;
    }
}

router.post("/users/login", async (req, res) => {
    const response = await axios.post("http://business-logic:8000" + req.path, req.body, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/username/:username", async (req, res) => {
    const response = await axios.get("http://business-logic:8000" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/email/:email", async (req, res) => {
    const response = await axios.get("http://business-logic:8000" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.post("/users/", async (req, res) => {
    const response = await axios.post("http://business-logic:8000" + req.path, req.body, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.put("/users/id/:id", async (req, res) => {
    const response = await axios.put("http://business-logic:8000" + req.path, req.body, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/id/:id", async (req, res) => {
    const response = await axios.get("http://business-logic:8000" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/me", async (req, res) => {
    const response = await axios.get("http://business-logic:8000" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/fromUsername/:username", async (req, res) => {
    const response = await axios.get("http://business-logic:8000" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/fromCrypto/:crypto", async (req, res) => {
    const response = await axios.get("http://business-logic:8000" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/id/:id/following", async (req, res) => {
    const response = await axios.get("http://business-logic:8000" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.put("/users/id/:id/following", async (req, res) => {
    const response = await axios.put("http://business-logic:8000" + req.path, req.body, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.delete("/users/id/:id/following/:following", async (req, res) => {
    const response = await axios.delete("http://business-logic:8000" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/id/:id/followers", async (req, res) => {
    const response = await axios.get("http://business-logic:8000" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

export default router;