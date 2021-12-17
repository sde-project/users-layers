import assert from "assert";
import * as dotenv from "dotenv";

dotenv.config();
assert(process.env.DB_API_KEY, "DB_API_KEY not found in .env file!");
assert(process.env.BUSINESS_LOGIC_API_KEY, "BUSINESS_LOGIC_API_KEY not found in .env file!");

import {default as express} from "express";
import { default as cors } from "cors";
import { default as morgan } from "morgan";
import { default as swagger } from "swagger-ui-express";
import { default as docs } from "./doc/index";
import { default as users } from "./routes/users";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use('/api-docs', swagger.serve, swagger.setup(docs));

app.use((req, res, next) => {
    if(req.headers.authorization !== process.env.BUSINESS_LOGIC_API_KEY) {
        return res.status(401).send({
            statusCode: 401,
            message: "Unauthorized"
        });
    } else {
        next();
    }
});

app.use("/users", users);

app.use((req, res) => {
    return res.status(404).send({
        statusCode: 404,
        message: "API not found."
    });
});

app.listen(8000, () => {
    console.log("Server listening at http://0.0.0.0:8000");
});