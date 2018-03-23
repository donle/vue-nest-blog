import { Schema } from 'mongoose';

export const ArticleSchema = new Schema({
    category: String,
    subCategory: String,
    title: String,
    body: String,
    media: [String],
    creationDate: Date,
    comments: [{
        messenger: String,
        body: String,
        date: Date
    }]
});