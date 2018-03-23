import { Component, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema } from './user.sechma';
import { UserInterface } from './interfaces/user.interface';
import { Response, Request } from 'express';

@Component()
export class UserService {
  constructor(
    @InjectModel(UserSchema) private readonly userModel: Model<UserInterface>
  ) { }

  public async create(newUser: UserInterface): Promise<UserInterface> {
    let user = new this.userModel(newUser);
    return await user.save();
  }

  public async update(updates): Promise<UserInterface> {
    return await this.userModel.update({ type: 'admin' }, { $set: updates }).exec();
  }

  public async login(user, req: Request) {
    return new Promise(resolve => {
      req.login(user, err => resolve(err));
    });
  }

  public async logout(req: Request) {
    return new Promise(resolve => {
      req.session.destroy(() => {
        req.logout();
        req.user = undefined;
        resolve();
      });
    });
  }

  public async getBasicInfo(username) {
    let user = await this.userModel.findOne({ username }).exec();
    return {
      birth: user.birth,
      hobbies: user.hobbies,
      location: user.location
    }
  }
}