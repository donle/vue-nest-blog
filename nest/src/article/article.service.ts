import { Component, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleSchema } from './article.sechma';
import { ArticleInterface } from './interfaces/article.interface';
import { Request } from 'express';

@Component()
export class ArticleService {
  constructor(
    @InjectModel(ArticleSchema) private readonly userModel: Model<ArticleInterface>
  ) { }

  public async getRecentPosts() {
    return await this.userModel.find({}, [
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
    return await this.userModel.find({})
      .skip(skip)
      .limit(10)
      .sort({ creationDate: -1 })
      .exec();
  }

  public async getOnePost(id: number) {
    return await this.userModel.findOne({ articleId: id }).exec();
  }

  public async removeOnePost(id: number) {
    return await this.userModel.remove({ articleId: id }).exec();
  }

  public async updateOnePost(updates: ArticleInterface) {
    return this.userModel.update({ articleId: updates.articleId }, { $set: updates }).exec();
  }

  public async createOnePost(newPosts: ArticleInterface) {
    const article = new this.userModel(newPosts);
    return await article.save();
  }
}