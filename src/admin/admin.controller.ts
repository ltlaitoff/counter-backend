import { Controller, HttpStatus, Post, Res, Headers } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ColorService } from 'src/color/color.service'
import { Response } from 'express'

@Controller('admin')
export class AdminController {
	constructor(
		private colorService: ColorService,
		private configService: ConfigService
	) {}

	@Post('initializeColors')
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
