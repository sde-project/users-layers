import { default as express } from "express";
import { body, validationResult, param } from "express-validator";
import { AxiosRequestConfig, default as axios } from "axios";
import assert from "assert";
import { Profile } from "../models/profile.model";
import { getAxiosConfig } from "../utils/utils";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();

assert(process.env.BUSINESS_LOGIC_API_KEY, "BUSINESS_LOGIC_API_KEY not found in environment!");
assert(process.env.BUSINESS_LOGIC_URL, "BUSINESS_LOGIC_URL not found in environment!");
assert(process.env.GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_ID not found in environment!");
assert(process.env.GOOGLE_REDIRECT_URI, "GOOGLE_CLIENT_SECRET not found in environment!");


const axiosConfig: AxiosRequestConfig<any> = {
    headers: {
        "api-key": process.env.BUSINESS_LOGIC_API_KEY
    },
    validateStatus: (_) => {
        return true;
    }
}

router.get("/users/google/oauth", async (req, res) => {

    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        req.query.redirect_uri?.toString()
    );

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"]
    });

    res.send({
        url: authUrl
    });
});

router.get("/users/google/callback", async (req, res) => {

    if (req.query.code && typeof (req.query.code) === "string") {

        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            req.query.redirect_uri?.toString()
        );

        try {
            const credentials = await oAuth2Client.getToken(req.query.code);
            const { tokens } = credentials;
            oAuth2Client.setCredentials(tokens);

            const url = "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses";

            try {
                const response = await oAuth2Client.request<any>({ url });

                const email = response.data.emailAddresses[0].value;
                const name = response.data.names[0].displayName;

                const exists = await axios.get(process.env.BUSINESS_LOGIC_URL + "/users/email/" + email, axiosConfig);

                if (exists.status != 200) {
                    return res.status(500).send({
                        statusCode: 500,
                        message: "Error while checking if user exists."
                    });
                }

                if (exists.data === false) {
                    //perform user login

                    const response = await axios.post(process.env.BUSINESS_LOGIC_URL + "/users/oauth", {
                        email: email
                    }, axiosConfig);

                    if (response.status != 200) {
                        return res.status(response.status).send(response.data);
                    }

                    return res.send(response.data);
                } else {
                    //create user

                    //check if username is available
                    let username = name.replace(/\s/g, "_");

                    const username_exists = await axios.get(process.env.BUSINESS_LOGIC_URL + "/users/username/" + username, axiosConfig);

                    if (username_exists.status != 200) {
                        return res.status(500).send({
                            statusCode: 500,
                            message: "Error while checking if username exists."
                        });
                    }

                    if (username_exists.data === false) {
                        username += "_" + Math.floor(Math.random() * 100);
                    }

                    const created = await axios.post(process.env.BUSINESS_LOGIC_URL + "/users", {
                        email: email,
                        account_type: "google",
                        username: username
                    }, axiosConfig);

                    if (created.status != 200) {
                        return res.status(500).send({
                            statusCode: 500,
                            message: "Error while creating user."
                        });
                    }

                    //perform user login
                    const token = await axios.post(process.env.BUSINESS_LOGIC_URL + "/users/oauth", {
                        email: email
                    }, axiosConfig);

                    if (token.status != 200) {
                        return res.status(token.status).send(token.data);
                    }

                    return res.send(token.data);
                }
            } catch (err) {
                return res.status(500).send({
                    statusCode: 500,
                    message: "Error while getting user profile.",
                    exception: err
                });
            }
        } catch (err) {
            return res.status(500).send({
                statusCode: 500,
                message: "Error while getting authentication token.",
                exception: err
            });
        }

    } else {
        res.status(400).send({
            statusCode: 400,
            message: "Missing code in request."
        });
    }

    return res.send("Hello");
});

router.post("/users/register", async (req, res) => {
    const data = { ...req.body };
    data.account_type = "email";
    
    const response = await axios.post(process.env.BUSINESS_LOGIC_URL + "/users", data, getAxiosConfig(axiosConfig, req));
    
    if(response.status !== 200) {
        return res.status(response.status).send(response.data);
    }

    const response2 = await axios.post(process.env.BUSINESS_LOGIC_URL + "/users/login", {
        email: data.email,
        password: data.password,
    }, getAxiosConfig(axiosConfig, req));

    if(response2.status !== 200) {
        return res.status(response2.status).send(response2.data);
    }

    return res.send(response2.data);
});

router.post("/users/devices/token", async (req, res) => {
    const response = await axios.post(process.env.BUSINESS_LOGIC_URL + "/devices/token", req.body, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.post("/users/login", async (req, res) => {
    const response = await axios.post(process.env.BUSINESS_LOGIC_URL + "" + req.path, req.body, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/username/:username", async (req, res) => {
    const response = await axios.get(process.env.BUSINESS_LOGIC_URL + "" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/email/:email", async (req, res) => {
    const response = await axios.get(process.env.BUSINESS_LOGIC_URL + "" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.put("/users/id/:id", async (req, res) => {
    const response = await axios.put(process.env.BUSINESS_LOGIC_URL + "" + req.path, req.body, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/id/:id", async (req, res) => {
    const response = await axios.get(process.env.BUSINESS_LOGIC_URL + "" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/me", async (req, res) => {
    const response = await axios.get(process.env.BUSINESS_LOGIC_URL + "" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/fromUsername/:username", async (req, res) => {
    const response = await axios.get(process.env.BUSINESS_LOGIC_URL + "" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/fromCrypto/:crypto", async (req, res) => {
    const response = await axios.get(process.env.BUSINESS_LOGIC_URL + "" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/id/:id/following", async (req, res) => {
    const response = await axios.get(process.env.BUSINESS_LOGIC_URL + "" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.put("/users/id/:id/following", async (req, res) => {
    const response = await axios.put(process.env.BUSINESS_LOGIC_URL + "" + req.path, req.body, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.delete("/users/id/:id/following/:following", async (req, res) => {
    const response = await axios.delete(process.env.BUSINESS_LOGIC_URL + "" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

router.get("/users/id/:id/followers", async (req, res) => {
    const response = await axios.get(process.env.BUSINESS_LOGIC_URL + "" + req.path, getAxiosConfig(axiosConfig, req));
    return res.status(response.status).send(response.data);
});

export default router;