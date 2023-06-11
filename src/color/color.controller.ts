import { Controller, Get } from '@nestjs/common'
import { ColorService } from './color.service'
import { Color } from './color.schema'
import { ApiTags } from '@nestjs/swagger'

@Controller('color')
export class ColorController {
	constructor(private colorService: ColorService) {}

	@ApiTags('Color')
	@Get('all')
	async getColors(): Promise<Color[]> {
		return this.colorService.getAll()
	}
}
