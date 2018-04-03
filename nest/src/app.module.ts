import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as passport from 'passport';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CacheMiddleware } from './middlewares/cache.middleware';
import { AuthModule } from './shared/authentication/auth.module';
import { UserSchema } from './user/user.sechma';

import { CfgLoader, ServerEnvironment } from '../config/loader'
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    UserModule,
    ArticleModule, 
    AuthModule,
    MediaModule,
    MongooseModule.forRoot(new CfgLoader(ServerEnvironment.DEV).load().DB.Url)
  ],
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
