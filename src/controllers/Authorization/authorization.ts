import { Response, Request } from 'express'
import * as jose from 'jose'

import { findOrCreateUser } from '../../controllers/User/findOrCreateUser'
import { authorizationError, somethingWentWrongError } from '../../services'
import { getUserDataFromJWTPayload } from './getUserDataFromJWTPayload.helper'

export const authorization = (req: Request, res: Response) => {
	const authorization = req.get('authorization')
	if (!authorization) return authorizationError(res)

	let jwkGoogleKeys = null

	try {
		jwkGoogleKeys = jose.createRemoteJWKSet(
			new URL(process.env.GOOGLE_JWK_PUBLIC_KEYS)
		)
	} catch (error) {
		return somethingWentWrongError(res)
	}

	jose
		.jwtVerify(authorization, jwkGoogleKeys)
		.then(value => {
			const userData = getUserDataFromJWTPayload(value.payload)

			if (userData === null) {
				return somethingWentWrongError(res)
			}

			findOrCreateUser(userData)
				.then(value => {
					req.session.authorized = true
					req.session.userId = value._id

					console.log(req.session, value._id)
					res.status(200).json(value)
				})
				.catch((error: Error) => {
					console.log('ERROR', error.name)
					return somethingWentWrongError(res)
				})
		})
		.catch((error: Error) => {
			console.error('ERROR: ', error.name)
			return somethingWentWrongError(res)
		})
}
