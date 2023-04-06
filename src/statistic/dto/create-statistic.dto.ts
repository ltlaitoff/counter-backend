import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateStatisticDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	date: string

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
