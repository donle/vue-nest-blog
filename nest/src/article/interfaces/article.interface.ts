import { Document } from 'mongoose';

interface IArticle {
    articleId: number;
    category: string;
    subCategory: string;
    title: string;
    body: string;
    media: Array<string>;
    creationDate: Date;
    comments: Array<{
        messenger: string;
        body: string;
        date: Date;
    }>;
}
export interface ArticleInterface extends Document, IArticle { }