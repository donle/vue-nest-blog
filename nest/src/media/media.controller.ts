import { Get, Post, Body, Param, Controller, Res, Req, UploadedFile, UseInterceptors, FileInterceptor, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';

import { Request, Response } from 'express';
import { ImageInterceptor } from '../shared/files/file.interceptor';
import { MediaService } from './media.service';

@Controller('api/media/image')
export class MediaController {
    constructor(
        private mediaService: MediaService
    ) {}
    @Post('article/upload')
    @UseInterceptors(ImageInterceptor)
    public async uploadArticleMedia (@UploadedFile() file: Express.Multer.File) {
        return { url: file.path.replace('public\\', '') };
    }
    
    @Post('article/remove')
    public async removeArticleMedia (@Body() body, @Res() res: Response) {
        const exception_files = [];
        for (let url of body.urls) {
            if(await this.mediaService.removeMediaFile(url)) {
                exception_files.push(url);
            }
        }

        if (!!exception_files.length) {
            res.status(HttpStatus.PARTIAL_CONTENT);
            return exception_files;
        } else return null;
    }
}