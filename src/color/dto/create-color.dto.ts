import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ColorsNames } from '../color.interface'

export class CreateColorDto {
	@IsString()
	@IsNotEmpty()
	readonly name: ColorsNames

	@IsString()
	@IsNotEmpty()
	readonly colorHEX: string

	@IsNumber()
	@IsNotEmpty()
	readonly order: number
}
