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
  validatePassword?: (password: string) => boolean,
  changePassword?: (password: string) => void,
  manualCreatePassword?: (password: string) => string
}
export interface UserInterface extends Document, IUser { }