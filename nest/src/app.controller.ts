import { Get, Post, Body, Param, Query, Headers, Controller, Res, HttpCode, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';

@Controller('/')
export class AppController {
  @HttpCode(204)
  @Get('/session')
  session(@Req() req: Request): Object {
    if (req.user) return { message: 'ok' };
    else return { message: 'false' };
  }
}
