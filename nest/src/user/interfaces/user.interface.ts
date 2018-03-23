import { Document } from 'mongoose';

interface IUser {
  username: string;
  password: string;
  type?: string;
  loginTimes?: number;
  creationDate?: Date;
  modifiedDate?: Date;
  hobbies?: Array<string>;
  birth?: Date;
  location?: string;
  posterUrl?: string; 
  validatePassword?: Function,
  changePassword?: Function,
  manualCreatePassword?: Function
}
export interface UserInterface extends Document, IUser { }