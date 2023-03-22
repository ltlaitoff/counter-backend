import { Controller, Get, HttpStatus, Res, Session } from '@nestjs/common'
import { Response } from 'express'
import { SessionData } from 'express-session'
import { InitializeService } from './initialize.service'

@Controller('initialize')
export class InitializeController {
	constructor(private initializeService: InitializeService) {}

	@Get()
	async initialize(@Session() session: SessionData, @Res() res: Response) {
		res
			.status(HttpStatus.OK)
			.json(await this.initializeService.initialize(session))
	}
}
