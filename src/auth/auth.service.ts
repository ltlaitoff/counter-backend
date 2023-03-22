import { Injectable, Req, Session } from '@nestjs/common'
import { JwtPayloadUser } from './auth.interface'
import { UserService } from '../user/user.service'
import { SessionData } from 'express-session'

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async signIn(
		@Session() session: SessionData,
		user: JwtPayloadUser
	): Promise<any> {
		const userDocument = await this.userService.findOrCreate(user)

		session.auth = {
			authorized: true,
			userId: userDocument._id
		}

		return { authorized: true, ...userDocument }
	}
}
