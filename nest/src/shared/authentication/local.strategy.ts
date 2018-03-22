import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { Component, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Component()
export class LocalStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      async (username, password, next) => await this.verify(username, password, next)
    );
    passport.use(this);

    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      done(null, user);
    });
  }

  public async verify(username, password, done) {
    const isValid = await this.authService.validateUserByLocal({ username, password });
    if (!isValid) {
      return done('Unauthorized', false);
    }
    done(null, { username, password });
  }
}