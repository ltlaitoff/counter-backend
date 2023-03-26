import {
	Controller,
	UseGuards,
	Req,
	Res,
	HttpStatus,
	Post,
	BadRequestException,
	Session
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'

import { JwtPayloadUser } from './auth.interface'
import { JwtAuthGuard } from './guard/jwt-auth.guard'
import { SessionData } from 'express-session'

// TODO: Create AuthorizedGuard

@Controller('authorization')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	async auth(
		@Req() req: Request,
		@Session() session: SessionData,
		@Res() res: Response
	) {
		if (!req.user) {
			return new BadRequestException('No authorization header with jwt-token')
		}

		const userDocument = await this.authService.signIn(
			session,
			req.user as JwtPayloadUser
		)

		res.status(HttpStatus.OK).json(userDocument)
	}

	@Post('logout')
	async logout(@Req() req: Request, @Res() res: Response) {
		req.session.destroy(err => {
			console.log('destroy user session error:', err)
		})

		res.status(HttpStatus.OK).json({ status: 'ok' })
	}
}
