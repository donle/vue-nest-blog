import { Document } from 'mongoose';

interface IArticle {
    articleId: number;
    category: string;
    subCategory: string;
    private?: boolean;
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

interface IArticleCategoryList {
    type: string;
    category: Array<{
        name: string,
        private: boolean
    }>;
}
export interface ArticleInterface extends Document, IArticle { }
export interface IArticleCategoryListInterface extends Document, IArticleCategoryList { }