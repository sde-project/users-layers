import * as mongoose from "mongoose";

export interface Profile {
    _id?: string,
    user?: string,
    username?: string,
    name?: string,
    bio?: string,
    links?: Array<{
        website?: string,
        text?: string,
    }>,
    cryptos?: Array<string>,
    following?: Array<string>,
    public?: boolean,
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
    name: String,
    bio: String,
    links: [{
        website: String,
        text: String
    }],
    cryptos: [String],
    following: [mongoose.Schema.Types.ObjectId],
    public: {
        type: Boolean,
        default: true
    }
});

const ProfileModel = mongoose.model<Profile>("Profile", ProfileSchema);

export default ProfileModel;