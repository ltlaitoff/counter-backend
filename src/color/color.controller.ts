import { Controller, Get } from '@nestjs/common'
import { ColorService } from './color.service'
import { Color } from './color.schema'

@Controller('new/color')
export class ColorController {
	constructor(private colorService: ColorService) {}

	@Get('all')
	async getColors(): Promise<Color[]> {
		return this.colorService.getAll()
	}
}
