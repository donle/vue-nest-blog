import { Schema } from 'mongoose';
import { createHash } from 'crypto';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true, default: 'admin' },
  loginTimes: { type: Number, default: 0 },
  creationDate: { type: Date, required: true, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  hobbies: [String],
  birth: Date,
  location: String,
  posterUrl: String
});

UserSchema.methods.validatePassword = function (password): boolean {
  return this.password === createHash('sha256').update(password + this.creationDate.getTime().toString(), 'utf8').digest('base64');
};

UserSchema.methods.changePassword = function (password): void {
  this.password = createHash('sha256').update(password + this.creationDate.getTime().toString(), 'utf8').digest('base64');
}

UserSchema.methods.manualCreatePassword = function (password): string {
  return createHash('sha256').update(password + this.creationDate.getTime().toString(), 'utf8').digest('base64');
}

export { UserSchema };