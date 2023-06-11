import {
	Controller,
	UseGuards,
	Req,
	Res,
	HttpStatus,
	Post,
	BadRequestException,
	Session,
	Body
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'

import { JwtPayloadUser } from './auth.interface'
import { JwtAuthGuard } from './guard/jwt-auth.guard'
import { SessionData } from 'express-session'
import { AuthDataDto } from './dto/auth-data.dto'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'

// TODO: Create AuthorizedGuard

@Controller('authorization')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiTags('Authorization')
	@ApiBody({ type: [AuthDataDto] })
	@Post()
	@UseGuards(JwtAuthGuard)
	async auth(
		@Req() req: Request,
		@Body() body: AuthDataDto,
		@Session() session: SessionData,
		@Res() res: Response
	) {
		if (!req.user) {
			return new BadRequestException('No authorization header with jwt-token')
		}

		const userDocument = await this.authService.signIn(
			body,
			session,
			req.user as JwtPayloadUser,
			req
		)

		res.status(HttpStatus.OK).json(userDocument)
	}

	@ApiTags('Authorization')
	@ApiResponse({ status: 200, description: 'ok' })
	@ApiResponse({
		status: 200,
		description: 'Logout successful'
	})
	@Post('logout')
	async logout(@Req() req: Request, @Res() res: Response) {
		req.session.destroy(err => {
			console.log('destroy user session error:', err)
		})

		res.status(HttpStatus.OK).json({ status: 'ok' })
	}
}
