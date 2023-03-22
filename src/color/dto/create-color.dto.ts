import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ColorsNames } from '../color.interface'

export class CreateColorDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly name: ColorsNames

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	readonly colorHEX: string

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	readonly order: number
}
