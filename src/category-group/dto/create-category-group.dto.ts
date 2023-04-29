import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCategoryGroupDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	color: string

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	order: number
}
