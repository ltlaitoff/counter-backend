import {
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Res,
	Session
} from '@nestjs/common'
import { Response } from 'express'
import { SessionData } from 'express-session'
import { SessionService } from './session.service'

@Controller('session')
export class SessionController {
	constructor(private sessionService: SessionService) {}

	@Get()
	async get(@Session() session: SessionData, @Res() res: Response) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		res
			.status(HttpStatus.OK)
			.json(await this.sessionService.getSessions(session))
	}

	@Delete(':id')
	async delete(
		@Param('id') id: string,
		@Session() session: SessionData,
		@Res() res: Response
	) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		res.status(HttpStatus.OK).json(await this.sessionService.deleteSession(id))
	}
}
