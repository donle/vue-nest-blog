import { Get, Post, Body, Param, Query, Headers, Controller, Res, HttpCode } from '@nestjs/common';
import { Response } from 'express';

@Controller('/')
export class AppController {
  @HttpCode(204)
  @Get()
  root(@Res() res: Response): void {
    const renderOptions = {
      metadata: {
        viewport: `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui`,
        'apple-mobile-web-app-capable': 'yes',
        robots: 'noarchive',
        description: 'MyPortal is here to help efficiently and effectively manage your business travel',
        keywords: 'myportal,traveledge,myportal login'
      },
      title: 'MyPortal Login - TravelEdge',
      styles: [],
      scripts: [],
      noscript: 'Please enable Javascript in your browser settings to view the page.'
    };

    res.send(renderOptions);
  }
}
