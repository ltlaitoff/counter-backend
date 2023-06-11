import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { getHttpsOptions } from './helpers/getHttpsOptions.helper'
import { COOKIE_MAX_AGE } from './config/constants.config'
import session from 'express-session'
import MongoStore from 'connect-mongo'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		httpsOptions: process.env.NODE_ENV ? undefined : getHttpsOptions()
	})

	app.enableCors({
		origin: [
			'http://localhost:4200',
			'https://localhost:4200',
			'https://ltlaitoff.github.io',
			'https://counter-git-dev-ltlaitoff.vercel.app',
			'https://counter-ltlaitoff.vercel.app'
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
	SwaggerModule.setup('api', app, document, {
		customSiteTitle: 'Backend Generator',
		customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
		customJs: [
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js'
		],
		customCssUrl: [
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css'
		]
	})

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
