import { Component } from '@nestjs/common';
import { mkdirSync, existsSync } from 'fs';

@Component()
export class AppService {
    constructor() {}

    public initServerFolders() {
        if (!existsSync('public/upload')) mkdirSync('public/upload');
        if (!existsSync('public/articles')) mkdirSync('public/articles');
    }
}