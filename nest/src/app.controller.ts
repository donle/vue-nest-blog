import { Get, Controller, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly _appService: AppService
  ) {
    this._appService.initServerFolders();
  }

  @Get()
  render() { };

  @Get('/robots.txt')
  robotFile(@Res() res: Response) {
    res.sendFile(path.resolve(process.cwd(), 'robots.txt'));
  }
}
