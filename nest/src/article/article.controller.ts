import { Get, Post, Body, Param, Query, Headers, Controller, Res, HttpCode, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ArticleService } from './article.service';
import { IArticle, ArticleInterface } from './interfaces/article.interface';
import * as fs from 'fs';

@Controller('api/articles')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService
    ) { }

    @Get('category/list')
    public async getArticleCategoryList(@Query() query) {
        const categories = await this.articleService.getListOfArticleCategories(query.type);
        let result = [];
        for (let category of categories) {
            let numOfArticles = await this.articleService.getNumOfArticles(query.type, category.name);
            result.push({
                name: category.name,
                private: category.private,
                total: numOfArticles
            });
        }
        return result;
    }

    @Post('category/new')
    public async createNewArticleCategory(@Body() body) {
        return await this.articleService.createNewCategory(body);
    }

    @Get('recent')
    public async getRecentPosts() {
        return await this.articleService.getRecentPosts();
    }

    @Post('update')
    public async updatePose(@Body() body: ArticleInterface) {
        if (body.media.length > 0) {
            let newMedia = [];
            for (let img of body.media) {
                if (img.includes('resources/s/')) {
                    newMedia.push(img);
                    continue;
                }

                let filename: any = img.split(/(\\|\/)/);
                filename = filename[filename.length - 1] ;
                const newPath = `resources/s/${body.articleId}/${filename}`;
                fs.renameSync(`public/${img}`, `public/${newPath}`);
                body.body = body.body.replace(img, newPath);
                newMedia.push(`public/${newPath}`);
            }
            body.media = newMedia;
        }
        await this.articleService.updateOnePost(body);
    }

    @Post('create')
    public async createNewPost(@Body() body: { title: string, html: string, imgs: string[], private: boolean, category: string, subCategory: string }) {
        const now = new Date();
        let newPost: IArticle = {
            articleId: Math.round(now.getTime()),
            title: body.title,
            body: '',
            media: [],
            private: body.private,
            creationDate: now,
            category: body.category,
            subCategory: body.subCategory,
            comments: [],
        }

        if (body.imgs.length > 0) {
            fs.mkdirSync('public/resources/s/' + newPost.articleId);
            for (let img of body.imgs) {
                let filename: any = img.split(/(\\|\/)/);
                filename = filename[filename.length - 1] ;
                const newPath = `resources/s/${newPost.articleId}/${filename}`;
                fs.renameSync(`public/${img}`, `public/${newPath}`);
                body.html = body.html.replace(img, newPath);
                newPost.media.push(`public/${newPath}`);
            }
        }
        newPost.body = body.html;

        await this.articleService.createOnePost(newPost as ArticleInterface);
        return { articleId: newPost.articleId };
    }

    @Post('remove')
    public async removeOnePost(@Body() body) {
        await this.articleService.removeOnePost(parseInt(body.articleId));
        fs.unlinkSync(`public/resources/s/${body.articleId}`);
    }

    @Get('shortlist')
    public async getListOfPosts(@Query() query: { limit: number, skip: number, snapshotOf: number }) {
        let articles = await this.articleService.getBulkPosts(query.limit, query.skip);
        return articles.map(article => ({
            title: article.title,
            body: article.body.substring(0, query.snapshotOf || 60),
            comments: article.comments.length,
            creationDate: article.creationDate,
            category: article.category,
            subCategory: article.subCategory
        }));
    }

    @Get('list')
    public async getListOfArticles(@Query() query: { type: string, category: string }) {
        return await this.articleService.getListOfArticlesByType(query.type, query.category);
    }

    @Get('byid')
    public async getArticleById(@Query() query: { articleId: string | number }) {
        return await this.articleService.getArticleById(query.articleId);
    }

    @Post('comment')
    public async uploadCommentByArticleId(@Body() body: {
        articleId: string | number,
        comment: {
            username: string,
            comment: string
        }
    }) {
        const article = await this.articleService.getArticleById(body.articleId);
        article.comments.push({
            messenger: body.comment.username,
            body: body.comment.comment,
            date: new Date()
        });

        await this.articleService.updateOnePost(article);
        return article;
    }
}