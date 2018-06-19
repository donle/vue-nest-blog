import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './shared/authentication/auth.module';

import { CfgLoader, ServerEnvironment } from '../config/loader'
import { MediaModule } from './media/media.module';
import { AppService } from './app.service';

@Module({
  imports: [
    UserModule,
    ArticleModule, 
    AuthModule,
    MediaModule,
    MongooseModule.forRoot(new CfgLoader(ServerEnvironment.DEV).load().DB.Url)
  ],
  controllers: [AppController],
  components: [AppService]
})
export class ApplicationModule {
}
