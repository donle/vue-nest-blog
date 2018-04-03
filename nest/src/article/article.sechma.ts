import { Schema } from 'mongoose';

export const ArticleSchema = new Schema({
    articleId: Number,
    category: String,
    subCategory: String,
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