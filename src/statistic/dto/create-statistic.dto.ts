import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class CreateStatisticDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	date: number

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	count: number

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	comment: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	category: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	summ: number
}
