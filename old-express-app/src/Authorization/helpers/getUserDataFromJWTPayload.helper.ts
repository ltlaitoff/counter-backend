import * as jose from 'jose'

import { UserTypes } from '../../User'
import { AuthorizationHelpers } from '..'

export const getUserDataFromJWTPayload = (
	payload: jose.JWTPayload
): UserTypes.User | null => {
	const name = AuthorizationHelpers.getFieldFromPayload<string>(payload, 'name')
	const picture = AuthorizationHelpers.getFieldFromPayload<string>(
		payload,
		'picture'
	)
	const email = AuthorizationHelpers.getFieldFromPayload<string>(
		payload,
		'email'
	)
	const email_verified = AuthorizationHelpers.getFieldFromPayload<boolean>(
		payload,
		'email_verified'
	)
	const given_name = AuthorizationHelpers.getFieldFromPayload<string>(
		payload,
		'given_name'
	)
	const family_name = AuthorizationHelpers.getFieldFromPayload<string>(
		payload,
		'family_name'
	)

	if (
		name === null ||
		picture === null ||
		email === null ||
		email_verified === null ||
		given_name === null ||
		family_name === null
	)
		return null

	return {
		name,
		picture,
		email,
		email_verified,
		given_name,
		family_name
	}
}
