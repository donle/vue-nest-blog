import { Component, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleSchema, ArticleCategorySchema } from './article.sechma';
import { ArticleInterface, IArticleCategoryListInterface } from './interfaces/article.interface';
import { Request } from 'express';

enum ARTICLE_TYPE {
  BLOG = 'blog',
  TRAVEL = 'travel'
}

@Component()
export class ArticleService {
  constructor(
    @InjectModel(ArticleSchema) private readonly articleModel: Model<ArticleInterface>,
    @InjectModel(ArticleCategorySchema) private readonly articleCategoryListModel: Model<IArticleCategoryListInterface>
  ) { }

  public async getRecentPosts() {
    return await this.articleModel.find({}, [
      'title',
      'creationDate',
      'category',
      'subCategory',
      'articleId'
    ], {
        limit: 6,
        sort: {
          date: -1
        }
      }).exec();
  }

  public async getBulkPosts(limit: number, skip: number = 0) {
    return await this.articleModel.find({})
      .skip(skip)
      .limit(10)
      .sort({ creationDate: -1 })
      .exec();
  }

  public async getOnePost(id: number) {
    return await this.articleModel.findOne({ articleId: id }).exec();
  }

  public async removeOnePost(id: number) {
    return await this.articleModel.remove({ articleId: id }).exec();
  }

  public async updateOnePost(updates: ArticleInterface) {
    return this.articleModel.update({ articleId: updates.articleId }, { $set: updates }).exec();
  }

  public async createOnePost(newPosts: ArticleInterface) {
    const article = new this.articleModel(newPosts);
    return await article.save();
  }

  public async getListOfArticleCategories (type: ARTICLE_TYPE) {
    return await this.articleCategoryListModel.findOne({ type }, { category: true }).exec();
  }

  public async countArticlesUnderCondition (condition: any) {
    return await this.articleModel.count(condition).exec();
  }

  public async createNewCategory (data: {
    type: ARTICLE_TYPE, 
    new_category: string,
    private: boolean
  }) {
    let document = await this.articleCategoryListModel.findOne({ type: data.type }).exec();
    document.category.push({ name: data.new_category, private: data.private });
    return await document.save();
  }
}