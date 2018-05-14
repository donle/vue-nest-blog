import { Module, MiddlewaresConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.sechma';
import { CacheMiddleware } from '../shared/middlewares/cache.middleware';
import * as passport from 'passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [UserController],
  components: [UserService],
  exports: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer
    .apply(CacheMiddleware).with(0).forRoutes(
      { path: '/api/user/session', method: RequestMethod.GET }
    ).apply(passport.authenticate('local')).forRoutes(
      { path: '/api/user/login', method: RequestMethod.POST }
    );
  }
}