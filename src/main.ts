import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ExpressAdapter } from '@nestjs/platform-express'

import expressApp from '../old-express-app/src'
import { getHttpsOptions } from './helpers/getHttpsOptions.helper'

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

	await app.listen(process.env.PORT)

	if (!process.env.NODE_ENV) {
		console.log(`App runned: https://localhost:${process.env.PORT}`)
	}
}

bootstrap()
