import { Component, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleSchema } from '../article/article.sechma';
import { ArticleInterface } from '../article/interfaces/article.interface';
import { Model } from 'mongoose';
import * as fs from 'fs';

@Component()
export class MediaService {
    constructor(
        @InjectModel(ArticleSchema) private readonly userModel: Model<ArticleInterface>
    ) { }

    public async removeMediaFile(filepath: string): Promise<NodeJS.ErrnoException> {
        return new Promise<NodeJS.ErrnoException>(resolve => {
            fs.unlink('.\\public\\' + filepath, err => resolve(err));
        });
    }
}