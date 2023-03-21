import { Injectable } from '@nestjs/common'
import { SessionData } from 'express-session'
import { UserService } from '../user/user.service'

@Injectable()
export class InitializeService {
	constructor(private userService: UserService) {}

	initialize(session: SessionData) {
		if (!session.authorized || !session.userId) {
			return { authorized: false }
		}

		const userData = this.userService.find({ _id: session.userId })

		return {
			authorized: true,
			...userData
		}
	}
}
