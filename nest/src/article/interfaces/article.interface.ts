import { Document } from 'mongoose';

export interface IArticle {
    articleId: number;
    category: string;
    subCategory: string;
    private?: boolean;
    title: string;
    body: string;
    media?: Array<string>;
    creationDate?: Date;
    modifiedDate?: Date;
    comments?: Array<{
        messenger: string;
        body: string;
        date: Date;
    }>;
}

export interface IArticleCategory {
    type: string;
    category: Array<{
        name: string,
        private: boolean
    }>;
}
export interface ArticleInterface extends Document, IArticle { }
export interface IArticleCategoryInterface extends Document, IArticleCategory { }