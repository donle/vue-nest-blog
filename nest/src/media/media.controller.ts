import { Get, Post, Body, Param, Controller, Res, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';

import { Request, Response } from 'express';
import { ImageInterceptor } from '../shared/files/file.interceptor';

@Controller('api/media')
export class MediaController {
    @Post('image')
    @UseInterceptors(ImageInterceptor)
    public async uploadArticleMedia (@UploadedFiles() files: Express.Multer.File[]) {
    }
}