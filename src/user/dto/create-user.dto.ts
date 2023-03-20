import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	picture: string

	@ApiProperty()
	@IsEmail()
	@IsNotEmpty()
	email: string

	@ApiProperty()
	@IsBoolean()
	@IsNotEmpty()
	email_verified: boolean

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	given_name: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	family_name: string
}
