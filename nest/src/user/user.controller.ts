import { Get, Post, Body, Param, Query, Headers, Controller, Res, HttpCode, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor (
    private userSerivce: UserService
  ) {}
  
  @Get('session')
  public session(@Req() req: Request) {
    if (req.user) return { message: 'ok' };
    else return { message: 'false' };
  }

  @Post('login')
  public async login(@Body() body, @Req() req: Request) {
    let err = await this.userSerivce.login(body, req);
    if (err) {
      throw new HttpException(err, HttpStatus.EXPECTATION_FAILED);
    } else {
      return body;
    }
  }

  @Get('logout')
  public async logout(@Res() res: Response, @Req() req: Request) {
    await this.userSerivce.logout(req);
    res.redirect('/');
  }

  @Post('update')
  public async update(@Body() body) {
    await this.userSerivce.update(body);
  }
}
