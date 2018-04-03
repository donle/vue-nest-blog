import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from '../../user/user.sechma';
import { UserInterface } from '../../user/interfaces/user.interface';
import { Model } from 'mongoose';

@Component()
export class AuthService {
  constructor (
    @InjectModel(UserSchema) private readonly userModel: Model<UserInterface>
  ) {}
  async createJwtToken(data) {
    const expiresIn = 60 * 60, secretOrKey = 'secret';
    const token = jwt.sign(data, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUserByLocal({ username, password }): Promise<boolean> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) return false;
    return user.validatePassword(password);
  }

  async validateUserByJwt(signedUser): Promise<boolean> {
    //@@TODO: verify token
    return true;
  }
}