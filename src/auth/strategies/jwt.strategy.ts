import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { passportJwtSecret } from 'jwks-rsa'
import { JwtPayloadBasicUser, JwtPayloadUser } from '../auth.interface'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private configService: ConfigService) {
		super({
			secretOrKeyProvider: passportJwtSecret({
				cache: true,
				rateLimit: true,
				jwksRequestsPerMinute: 5,
				jwksUri: configService.get<string>('GOOGLE_JWK_PUBLIC_KEYS') || ''
			}),
			jwtFromRequest: ExtractJwt.fromHeader('authorization'),
			algorithms: ['RS256'],
			ignoreExpiration: false
		})
	}

	async validate(payload: JwtPayloadBasicUser): Promise<JwtPayloadUser> {
		return {
			email: payload.email,
			email_verified: payload.email_verified,
			name: payload.name,
			picture: payload.picture,
			given_name: payload.given_name,
			family_name: payload.family_name
		}
	}
}
