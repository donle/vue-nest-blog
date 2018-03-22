import { Component, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
// import { Inject } from '@nestjs/mongoose';
import { UserSchema } from './user.sechma';
import { UserInterface } from './interfaces/user.interface';
import { Request } from 'express';

@Component()
export class UserService {
  constructor(
    @Inject('UserModelToken') private readonly userModel: Model<UserInterface>
  ) {

  }

  public create (newUser: UserInterface) {
      return this.userModel.create(newUser);
  }

  public async login(user, req: Request) {
    return new Promise(resolve => {
      req.login(user, err => resolve(err));
    });
  }
}