import { Injectable, Session } from '@nestjs/common'
import { Request } from 'express'
import { JwtPayloadUser } from './auth.interface'
import { UserService } from '../user/user.service'
import { SessionData } from 'express-session'
import { AuthDataDto } from './dto/auth-data.dto'

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async signIn(
		body: AuthDataDto,
		@Session() session: SessionData,
		user: JwtPayloadUser,
		req: Request
	): Promise<any> {
		const userDocument = await this.userService.findOrCreate(user)

		session.auth = {
			authorized: true,
			userId: userDocument._id,
			browserName: body.browserName,
			browserVersion: body.browserVersion,
			osName: body.osName,
			osVersion: body.osVersion,
			osVersionName: body.osVersionName,
			userAgent: body.userAgent,
			platformType: body.platformType,
			dateOfCreate: body.dateOfCreate
		}

		return { sessionId: req.sessionID, authorized: true, ...userDocument }
	}
}
