import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CacheMiddleware } from './middlewares/cache.middleware';
import { AuthModule } from './shared/authentication/auth.module';
import * as passport from 'passport';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer
    .apply(CacheMiddleware).with(0).forRoutes(
      { path: '/api/user/session', method: RequestMethod.GET }
    ).apply(passport.authenticate('local')).forRoutes(
      { path: '/api/user/login', method: RequestMethod.POST }
    );
  }
}
