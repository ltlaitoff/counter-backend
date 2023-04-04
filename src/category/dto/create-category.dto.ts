import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty()
	@IsString()
	comment?: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	color: string

	@ApiProperty()
	@IsString()
	dimension?: string
}
