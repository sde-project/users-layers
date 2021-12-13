import * as mongoose from "mongoose";

export interface UserAuth {
    _id?: string,
    email: string,
    account_type: "email"|"google",
    password?: string,
    salt?: string,
}

const UserAuthSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    account_type: {
        type: String,
        required: true,
        enum: ["email", "google"]
    },
    password: String,
    salt: String,
});

const UserAuthModel = mongoose.model<UserAuth>("UserAuth", UserAuthSchema);

export default UserAuthModel;