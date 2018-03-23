import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as passport from 'passport';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CacheMiddleware } from './middlewares/cache.middleware';
import { AuthModule } from './shared/authentication/auth.module';
import { UserSchema } from './user/user.sechma';

@Module({
  imports: [
    UserModule,
    ArticleModule, 
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27018/dev')
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
