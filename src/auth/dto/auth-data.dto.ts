import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AuthDataDto {
	@IsNotEmpty()
	@IsString()
	browserName: string

	@IsNotEmpty()
	@IsString()
	browserVersion: string

	@IsNotEmpty()
	@IsString()
	osName: string

	@IsNotEmpty()
	@IsString()
	osVersion: string

	@IsNotEmpty()
	@IsString()
	osVersionName: string

	@IsNotEmpty()
	@IsString()
	userAgent: string

	@IsNotEmpty()
	@IsString()
	platformType: string

	@IsNotEmpty()
	@IsNumber()
	dateOfCreate: number
}
