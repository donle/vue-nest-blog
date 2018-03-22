import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';

@Component()
export class AuthService {
  async createJwtToken(data) {
    const expiresIn = 60 * 60, secretOrKey = 'secret';
    const token = jwt.sign(data, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUserByLocal({ username, password }): Promise<boolean> {
    //@@TODO: verify username & password
    return true;
  }

  async validateUserByJwt(signedUser): Promise<boolean> {
    //@@TODO: verify token
    return true;
  }
}