import { Controller, Get } from '@nestjs/common'

@Controller('color')
export class ColorController {
	@Get()
	getColors(): string {
		return process.env.MONGODB_URI
	}
}
