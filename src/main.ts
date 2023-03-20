import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ExpressAdapter } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import expressApp from '../old-express-app/src'
import { getHttpsOptions } from './helpers/getHttpsOptions.helper'
import { COOKIE_MAX_AGE } from './config/constants.config'
import session from 'express-session'
import MongoStore from 'connect-mongo'

async function bootstrap() {
	const app = await NestFactory.create(
		AppModule,
		new ExpressAdapter(expressApp),
		{ httpsOptions: process.env.NODE_ENV ? undefined : getHttpsOptions() }
	)

	app.enableCors({
		origin: [
			'http://localhost:4200',
			'https://localhost:4200',
			'https://ltlaitoff.github.io'
		],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		credentials: true
	})

	const config = new DocumentBuilder()
		.setTitle('Counter')
		.setDescription('The Counter API description')
		.setVersion('1.0.0')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)

	const store = MongoStore.create({
		mongoUrl: process.env.MONGODB_URI
	})

	const sessionConfig: session.SessionOptions = {
		proxy: true,
		secret: 'keyboard cat',
		name: 'sessionId',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: COOKIE_MAX_AGE,
			secure:
				process.env.NODE_ENV === undefined ||
				process.env.NODE_ENV === 'production',
			httpOnly:
				process.env.NODE_ENV === undefined ||
				process.env.NODE_ENV === 'production',
			sameSite: 'none'
		},
		store
	}

	app.use(session(sessionConfig))

	await app.listen(process.env.PORT)

	if (!process.env.NODE_ENV) {
		console.log(`App runned: https://localhost:${process.env.PORT}`)
	}
}

bootstrap()
