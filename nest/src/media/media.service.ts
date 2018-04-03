import { Component, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { ArticleSchema } from '../article/article.sechma';
import { ArticleInterface } from '../article/interfaces/article.interface';
import { Model } from 'mongoose';

@Component()
export class MediaService {
    constructor(
        @InjectModel(ArticleSchema) private readonly userModel: Model<ArticleInterface>
    ) { }

    
}