import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleService } from './article.service';
import { ArticleSchema } from './article.sechma';
import { ArticleController } from './article.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Article', schema: ArticleSchema }
    ])
  ],
  controllers: [ArticleController],
  components: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule { }