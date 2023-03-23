import { Controller, Get, Headers, HttpStatus, Post, Res } from '@nestjs/common'
import { ColorService } from './color.service'
import { Color } from './color.schema'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'

@Controller('color')
export class ColorController {
	constructor(
		private colorService: ColorService,
		private configService: ConfigService
	) {}

	@Get('all')
	async getColors(): Promise<Color[]> {
		return this.colorService.getAll()
	}

	@Post('initialize')
	async initializeDefaultColors(
		@Headers('authorization') authorization: undefined | string,
		@Res() res: Response
	) {
		console.log(authorization)

		if (!authorization) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'UNAUTHORIZED' })
			return
		}

		const INITIALIZE_LOGIN = this.configService.get<string>('INITIALIZE_LOGIN')
		const INITIALIZE_PASSWORD = this.configService.get<string>(
			'INITIALIZE_PASSWORD'
		)

		console.log(`${INITIALIZE_LOGIN}:${INITIALIZE_PASSWORD}`)

		if (authorization !== `${INITIALIZE_LOGIN}:${INITIALIZE_PASSWORD}`) {
			res
				.status(HttpStatus.UNAUTHORIZED)
				.json({ message: 'The login or password is incorrect' })
			return
		}

		return res
			.status(HttpStatus.OK)
			.json(await this.colorService.initializeDefaultColors())
	}
}
