import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as passport from 'passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [],
  components: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}