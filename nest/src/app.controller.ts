import { Get, Post, Body, Param, Query, Headers, Controller, Res, HttpCode, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  render() { };
}
