import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleService } from './article.service';
import { ArticleSchema, ArticleCategorySchema } from './article.sechma';
import { ArticleController } from './article.controller';
import { CacheMiddleware } from '../shared/middlewares/cache.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Article', schema: ArticleSchema },
      { name: 'ArticleCategory', schema: ArticleCategorySchema }
    ])
  ],
  controllers: [ArticleController],
  components: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer
    .apply(CacheMiddleware).with(0).forRoutes(
      { path: '/api/articles/category/list', method: RequestMethod.GET }
    );
  }
}