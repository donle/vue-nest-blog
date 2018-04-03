import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from '../article/article.sechma';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Article', schema: ArticleSchema }
        ])
    ],
    controllers: [MediaController],
    components: [MediaService],
    exports: [MediaService]
})
export class MediaModule { }