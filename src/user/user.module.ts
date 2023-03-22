import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './user.schema'
import { CategoryModule } from '../category/category.module'

@Module({
	imports: [
		CategoryModule,
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema
			}
		])
	],
	controllers: [],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
