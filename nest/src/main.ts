declare const module: any;

import { NestFactory } from '@nestjs/core';
import { INestApplication, LoggerService } from '@nestjs/common';
import { ApplicationModule } from './app.module';

import * as fs from 'fs';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import * as compression from 'compression';
import * as connectMongo from 'connect-mongo';
import * as ejs from 'ejs';
import * as express from 'express';
import { connection as MongoConnect } from 'mongoose';
import * as connectHistoryApiFallback from 'connect-history-api-fallback';
import { CfgLoader, ServerEnvironment, ConfigInterface } from '../config/loader';

class Application {
	private app: INestApplication;
	private staticFiles: express.RequestHandler;
	private config: ConfigInterface;
	private port: number = 3000;

	constructor(
		private env = ServerEnvironment.DEV,
		private ssl = false,
		private log = logger('dev'),
		private cookieCommunicator = cookieParser(),
		private h5history = connectHistoryApiFallback({
			verbose: true,
			index: '/'
		}),
		private compressor = compression({
			level: 9
		})
	) {
		this.config = new CfgLoader(env, ssl).load();
		this.port = this.config.Port || this.port;
		this.staticFiles = express.static('public', {
			maxAge: this.config.Cache.MaxAge
		});
		this.bootstrap().then(() => {
			this.app
				.use(this.log)
				.use(this.cookieCommunicator)
				.use(this.compressor)
				.use(this.h5history)
				.use(this.staticFiles);

			this.setViewEngine('ejs');
			this.setConnectSession();
			this.passport();
		}).then(() => this.start(this.port)).then(() => {
			if (module.hot) {
				module.hot.accept();
				module.hot.dispose(() => this.app.close());
			}
		});
	}

	private async bootstrap() {
		this.app = await NestFactory.create(ApplicationModule, {
			bodyParser: true,
			cors: true,
			httpsOptions: this.config.SSL
		});
	}

	private setViewEngine(view: string) {
		this.app.set('views', 'public');
		this.app.set('view engine', view);
		this.app.engine('html', ejs.renderFile);
	}

	private setConnectSession() {
		const MongoStore = connectMongo(session);

		this.app.use(session({
			secret: this.config.Session.Secret,
			resave: true,
			saveUninitialized: false,
			cookie: { maxAge: this.config.Session.MaxAge, httpOnly: false },
			store: new MongoStore({
				mongooseConnection: MongoConnect
			})
		}));
	}

	private passport() {
		this.app.use(passport.initialize());
		this.app.use(passport.session());
	}

	public async start(port?: number) {
		await this.app.listen(port);
	}
}

new Application();
// new Application(ServerEnvironment.PROD, true);
