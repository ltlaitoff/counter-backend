import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { ColorModule } from './color/color.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.env', '.env.development.local']
		}),
		ColorModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
