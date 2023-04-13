import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class ReorderCategoryDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	categoryId: string

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	previousIndex: number

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	currentIndex: number
}
