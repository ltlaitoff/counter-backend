export type JwtPayloadBasicUser = {
	iss: string
	nbf: number
	aud: string
	sub: string
	email: string
	email_verified: boolean
	azp: string
	name: string
	picture: string
	given_name: string
	family_name: string
	iat: number
	exp: number
	jti: string
}

/* 
	TODO: Add 'sub' to database and JwtPayloadUser
*/

export type JwtPayloadUser = Pick<
	JwtPayloadBasicUser,
	'email' | 'email_verified' | 'name' | 'family_name' | 'given_name' | 'picture'
>
