import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { UserModule } from '../user/user.module'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [ConfigModule, PassportModule, JwtModule, UserModule],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
