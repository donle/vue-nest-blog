import { Document } from 'mongoose';

interface IUser {
    username: string;
    password: string;
    email: string;
    firstName?: string;
    lastName?: string;
    contactNumber?: string;
    companyName?: string;
    type?: string;
    subType?: string;
    verified?: boolean;
    loginTimes?: number;
    creationDate?: Date;
    modifiedDate?: Date;
    weatherLocale?: any;
    guide?: boolean;
    timeZones?: Array<{
        zone: string
    }>,
    validatePassword?: Function,
    changePassword?: Function,
    manualCreatePassword?: Function
}
export interface UserInterface extends Document, IUser { }