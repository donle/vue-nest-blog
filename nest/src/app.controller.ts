import { Get, Controller, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  @Get()
  render() { };

  @Get('/robots.txt')
  robotFile(@Res() res: Response) {
    res.sendFile(path.resolve(process.cwd(), 'robots.txt'));
  }
}
