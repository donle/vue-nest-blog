import { Component } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.sechma';
import { UserInterface } from '../interfaces/user.interface';

@Component()
export class UserService {
    constructor (
        @InjectModel(UserSchema) private userModel: Model<UserInterface>
    ) {

    }

    public create (newUser: UserInterface) {
        return this.userModel.create(newUser);
    }
}