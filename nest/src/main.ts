import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from './app.module';

import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as serveStatic from 'serve-static';
import * as passport from 'passport';
import * as compression from 'compression';
import * as connectMongo from 'connect-mongo';
import * as path from 'path';
import * as ejs from 'ejs';
import { connection as MongoConnect } from 'mongoose';
import * as mPromise from 'bluebird';

import { DefaultConfig } from '../config/config.default';

class Application {
	private app: INestApplication;

	constructor(
		private port = 3000,
		private log = logger('dev'),
		// private icon = favicon(path.join(__dirname, 'public/assets/favicon.ico')),
		private httpRequestParser = [bodyParser.json(), bodyParser.urlencoded({ extended: false })],
		private cookieCommunicator = cookieParser(),
		private compressor = compression({
			level: 9
		}),
		private staticFiles = serveStatic(__dirname + 'public', {
			maxAge: DefaultConfig.Cache.MaxAge
		})
	) {
		this.bootstrap().then(() => {
			this.setViewEngine('ejs');
			this.app
				// .use(this.icon)
				.use(this.log)
				.use(this.httpRequestParser)
				.use(this.cookieCommunicator)
				.use(this.compressor)
				.use(this.staticFiles);

			// this.setConnectSession();
		}).then(() => {
			this.start(this.port);
		});
	}

	private async bootstrap() {
		this.app = await NestFactory.create(ApplicationModule);
	}

	private setViewEngine(view: string) {
		this.app.set('views', '../dist');
		this.app.set('view engine', view);
		this.app.engine('html', ejs.renderFile);
	}

	private setConnectSession() {
		const MongoStore = connectMongo(session);

		this.app.use(session({
			secret: DefaultConfig.Session.Secret,
			resave: true,
			saveUninitialized: false,
			cookie: { maxAge: DefaultConfig.Session.MaxAge, httpOnly: false },
			store: new MongoStore({
				mongooseConnection: MongoConnect
			})
		}));

		this.app.use(passport.initialize());
		this.app.use(passport.session());
	}

	public async start(port?: number) {
		await this.app.listen(port || DefaultConfig.Port);
	}
}

new Application();
