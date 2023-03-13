import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ExpressAdapter } from '@nestjs/platform-express'

import expressApp from '../old-express-app/src'

async function bootstrap() {
	const app = await NestFactory.create(
		AppModule,
		new ExpressAdapter(expressApp),
		{
			cors: {
				origin: [
					'http://localhost:4200',
					'https://localhost:4200',
					'https://ltlaitoff.github.io'
				],
				credentials: true
			}
		}
	)

	await app.listen(3000)
}

bootstrap()
