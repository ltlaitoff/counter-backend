import * as jose from 'jose'

export function getFieldFromPayload<T>(
	payload: jose.JWTPayload,
	key: string
): T | null {
	if (payload[key]) return payload[key] as T

	return null
}
