import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleService } from './article.service';
import { ArticleSchema, ArticleCategorySchema } from './article.sechma';
import { ArticleController } from './article.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Article', schema: ArticleSchema },
      { name: 'ArticleCategoryList', schema: ArticleCategorySchema }
    ])
  ],
  controllers: [ArticleController],
  components: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule { }