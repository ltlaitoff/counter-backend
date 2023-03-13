import { Module } from '@nestjs/common'
import { ColorController } from './color.controller'

@Module({
	controllers: [ColorController]
})
export class ColorModule {}
