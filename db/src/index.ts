import assert from "assert";
import * as dotenv from "dotenv";
import { connect } from "mongoose";
import {default as express} from "express";
import { default as auth } from "./routes/auth";

dotenv.config();
assert(process.env.MONGO_DB, "Mongo db URL is not configured properly, set it into .env file!")
connect(process.env.MONGO_DB).then(() => {

    console.log("Succesfully connected to Database!");

    const app = express();
    app.use(express.json());
    
    app.use("/users", auth);
    app.use((req, res) => {
        return res.status(404).send({error: "API not found."});
    })

    app.listen(8000, () => {
        console.log("Server listening at http://0.0.0.0:8000");
    });

}).catch((err) => {
    console.error("Unable to connect to Database, exiting...");
    process.exit(1);
})