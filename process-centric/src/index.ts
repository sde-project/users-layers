import assert from "assert";
import * as dotenv from "dotenv";

dotenv.config();

import {default as express} from "express";
import { default as cors } from "cors";
import { default as morgan } from "morgan";
import { default as swagger } from "swagger-ui-express";
import { default as docs } from "./doc/index";
import { default as routes } from "./routes/routes";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use('/api-docs', swagger.serve, swagger.setup(docs));

app.use("/", routes);

app.use((req, res) => {
    return res.status(404).send({
        statusCode: 404,
        message: "API not found."
    });
});

app.listen(8000, () => {
    console.log("Server listening at http://0.0.0.0:8000");
});