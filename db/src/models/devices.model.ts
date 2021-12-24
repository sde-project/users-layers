import * as mongoose from "mongoose";

export interface Device {
    _id?: string,
    user?: string,
    token?: string,
    created?: Date,
    last_used?: Date,
}

const DeviceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Profile',
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    created: {
        type: Date,
        required: true
    },
    last_used: {
        type: Date,
        required: true
    }
});

const DeviceModel = mongoose.model<Device>("Device", DeviceSchema);

export default DeviceModel;