import { Get, Controller, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';

@Controller()
export class AppController {
  @Get()
  render() { };

  @Get('/robots.txt')
  robotFile(@Res() res: Response) {
    res.send(fs.readFileSync('./robots.txt', 'utf-8'));
  }
}
