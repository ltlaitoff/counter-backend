import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty()
	@IsString()
	mode?: 'number' | 'time'

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

	@ApiProperty()
	@IsArray()
	group?: string[]
}
