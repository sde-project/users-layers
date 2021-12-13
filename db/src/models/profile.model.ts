import * as mongoose from "mongoose";

export interface Profile {
    _id?: string,
    user: string,
    username: string,
    name?: string,
    //others...
}

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserAuth',
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: String
});

const ProfileModel = mongoose.model<Profile>("Profile", ProfileSchema);

export default ProfileModel;