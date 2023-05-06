import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class ReorderCategoryGroupDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	categoryGroupId: string

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	previousIndex: number

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	currentIndex: number
}
