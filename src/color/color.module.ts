import { Module } from '@nestjs/common'
import { ColorController } from './color.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Color, ColorSchema } from './color.schema'
import { ColorService } from './color.service'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		ConfigModule,
		MongooseModule.forFeature([
			{
				name: Color.name,
				schema: ColorSchema
			}
		])
	],
	controllers: [ColorController],
	providers: [ColorService],
	exports: [ColorService]
})
export class ColorModule {}
