import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    contactNumber: { type: String },
    companyName: { type: String },
    type: { type: String, required: true, default: 'user' },
    subType: { type: String, default: 'user' },
    verified: { type: Boolean, required: true, default: false },
    loginTimes: { type: Number, default: 0 },
    creationDate: { type: Date, required: true, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    weatherLocale: { type: Schema.Types.Mixed },
    guide: { type: Boolean, default: false },
    timeZones: [{
        _id: false,
        zone: { type: String }
    }]
});