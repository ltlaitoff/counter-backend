import * as jose from 'jose'

import { IUser } from '../../models'

function getFieldFromPayload<T>(
	payload: jose.JWTPayload,
	key: string
): T | null {
	if (payload[key]) return payload[key] as T

	return null
}

export const getUserDataFromJWTPayload = (
	payload: jose.JWTPayload
): IUser | null => {
	const name = getFieldFromPayload<string>(payload, 'name')
	const picture = getFieldFromPayload<string>(payload, 'picture')
	const email = getFieldFromPayload<string>(payload, 'email')
	const email_verified = getFieldFromPayload<boolean>(payload, 'email_verified')
	const given_name = getFieldFromPayload<string>(payload, 'given_name')
	const family_name = getFieldFromPayload<string>(payload, 'family_name')

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
