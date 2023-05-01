import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ColorModule } from './color/color.module'
import { MongooseModule } from '@nestjs/mongoose'
import { environmentConfig } from './config/environment.config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { InitializeModule } from './initialize/initialize.module'
import { CategoryModule } from './category/category.module'
import { StatisticModule } from './statistic/statistic.module'
import { CategoryGroupModule } from './category-group/category-group.module'
import { AdminModule } from './admin/admin.module'

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
		ColorModule,
		UserModule,
		AuthModule,
		InitializeModule,
		CategoryModule,
		StatisticModule,
		CategoryGroupModule,
		AdminModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
