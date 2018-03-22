import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true, default: 'user' },
  loginTimes: { type: Number, default: 0 },
  creationDate: { type: Date, required: true, default: Date.now },
  modifiedDate: { type: Date, default: Date.now }
});