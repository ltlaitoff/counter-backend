import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { SessionData } from 'express-session'
import { Model } from 'mongoose'
import { ISessions } from './session.interface'
import { Sessions } from './session.schema'

@Injectable()
export class SessionService {
	constructor(
		@InjectModel(Sessions.name) private sessionModel: Model<ISessions>
	) {}

	async getSessions(session: SessionData) {
		if (!session.auth || !session.auth.userId) return {}

		const userId = session.auth.userId

		const allSessionsData = await this.sessionModel.find()

		const sessionDataRaw = allSessionsData.map(itemDocument => {
			const item: any = itemDocument.toJSON()

			return {
				_id: item._id,
				expires: item.expires,
				...JSON.parse(item.session)
			}
		})

		const filteredByUser = sessionDataRaw.filter(item => {
			if (!item.auth) return false

			return item.auth.userId === userId
		})

		console.log(filteredByUser)

		return filteredByUser.map(this.transformUserSessionDataForOutput)
	}

	async deleteSession(id: string) {
		return await this.sessionModel.findByIdAndDelete(id)
	}

	private transformUserSessionDataForOutput(data: any) {
		return {
			_id: data._id,
			expires: data.expires,
			cookie: {
				expires: data.cookie.expires
			},
			authorized: data.auth.authorized,
			userId: data.auth.userId,
			browserName: data.auth.browserName,
			browserVersion: data.auth.browserVersion,
			osName: data.auth.osName,
			platformType: data.auth.platformType,
			osVersion: data.auth.osVersion,
			osVersionName: data.auth.osVersionName,
			userAgent: data.auth.userAgent,
			dateOfCreate: data.auth.dateOfCreate
		}
	}
}
