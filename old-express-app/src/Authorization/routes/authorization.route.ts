import { Response, Request } from 'express'
import * as jose from 'jose'

import { UserHelpers } from '../../User'
import { authorizationError, somethingWentWrongError } from '../../helpers'
import { HttpStatusCode } from '../../types'

import { AuthorizationHelpers } from '..'

export const authorizationRoute = (req: Request, res: Response) => {
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
			const userData = AuthorizationHelpers.getUserDataFromJWTPayload(
				value.payload
			)

			if (userData === null) {
				return somethingWentWrongError(res)
			}

			UserHelpers.findOrCreateUser(userData)
				.then(value => {
					req.session.authorized = true
					req.session.userId = value._id

					console.log(req.session, value._id)
					res.status(HttpStatusCode.OK).json({ authorized: true, ...value })
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
