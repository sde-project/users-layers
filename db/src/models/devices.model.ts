import * as mongoose from "mongoose";

export interface Device {
    _id?: string,
    user: string,
    device_id: string
}

const DeviceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserAuth',
        required: true
    },
    device_id: {
        type: String,
        required: true,
        unique: true
    }
});

const DeviceModel = mongoose.model<Device>("Device", DeviceSchema);

export default DeviceModel;