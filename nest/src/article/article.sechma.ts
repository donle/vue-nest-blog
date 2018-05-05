import { Schema } from 'mongoose';

export const ArticleSchema = new Schema({
    articleId: Number,
    category: String,
    subCategory: String,
    private: { type: Boolean, default: false },
    title: String,
    body: String,
    media: [String],
    creationDate: Date,
    comments: [{
        _id: false,
        messenger: String,
        body: String,
        date: Date
    }]
});

export const ArticleCategorySchema = new Schema({
    type: String,
    category: [{
        name: String,
        private: Boolean
    }]
});