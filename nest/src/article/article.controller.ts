import { Get, Post, Body, Param, Query, Headers, Controller, Res, HttpCode, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ArticleService } from './article.service';

@Controller('api/articles')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService
    ) { }

    @Get('recent')
    public async getRecentPosts() {
        return await this.articleService.getRecentPosts();
    }

    @Post('update')
    public async updatePose(@Body() body) {
        return await this.articleService.updateOnePost(body);
    }

    @Post('create')
    public async createNewPost(@Body() body) {
        return await this.articleService.createOnePost(body);
    }

    @Post('remove')
    public async removeOnePost(@Query() query) {
        await this.articleService.removeOnePost(parseInt(query.id));
    }

    @Get('shortlist')
    public async getListOfPosts(@Body() body) {
        let articles = await this.articleService.getBulkPosts(body.limit, body.skip);
        return articles.map(article => ({
            title: article.title,
            body: article.body.substring(0, body.snapshotOf || 60),
            comments: article.comments.length,
            creationDate: article.creationDate,
            category: article.category,
            subCategory: article.subCategory
        }));
    }
}