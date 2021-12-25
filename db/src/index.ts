import assert from "assert";
import { connect } from "mongoose";
import {default as express} from "express";
import { default as auth } from "./routes/auth";
import { default as devices } from "./routes/devices";
import { default as profiles } from "./routes/profile";
import { default as cors } from "cors";
import { default as morgan } from "morgan";
import { default as swagger } from "swagger-ui-express";
import { default as docs } from "./doc/index";

assert(process.env.MONGO_DB, "Mongo db URL is not configured properly, set it into .env file!");
assert(process.env.DB_API_KEY, "DB_API_KEY not found in .env file!");

connect(process.env.MONGO_DB).then(() => {

    console.log("Succesfully connected to Database!");

    const app = express();
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(cors());

    app.use('/api-docs', swagger.serve, swagger.setup(docs));

    app.use((req, res, next) => {
        if(req.headers['api-key'] !== process.env.DB_API_KEY) {
            return res.status(401).send({
                statusCode: 401,
                message: "Unauthorized"
            });
        } else {
            next();
        }
    });
    
    app.use("/users", auth);
    app.use("/profiles", profiles);
    app.use("/devices", devices);

    app.use((req, res) => {
        return res.status(404).send({
            statusCode: 404,
            message: "API not found."
        });
    });

    app.listen(8000, () => {
        console.log("Server listening at http://0.0.0.0:8000");
    });

}).catch((err) => {
    console.error("Unable to connect to Database, exiting...");
    process.exit(1);
})