import { Component } from '@nestjs/common';
import { mkdirSync, existsSync } from 'fs';

@Component()
export class AppService {
    constructor() {}

    public initServerFolders() {
        if (!existsSync('public/resources')) mkdirSync('public/resources');
        if (!existsSync('public/resources/upload')) mkdirSync('public/resources/upload');
        if (!existsSync('public/resources/s')) mkdirSync('public/resources/s');
    }
}