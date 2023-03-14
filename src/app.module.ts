import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ColorModule } from './color/color.module'
import { MongooseModule } from '@nestjs/mongoose'
import { environmentConfig } from './config/environment.config'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [
				'.env',
				process.env.NODE_ENV ? '.env.local' : '.env.development.local'
			],
			load: [environmentConfig]
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				uri: config.get<string>('database.uri')
			})
		}),
		ColorModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
