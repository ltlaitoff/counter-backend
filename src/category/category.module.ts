import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Category, CategorySchema } from './category.schema'
import { ColorModule } from 'src/color/color.module'

@Module({
	imports: [
		ColorModule,
		MongooseModule.forFeature([
			{
				name: Category.name,
				schema: CategorySchema
			}
		])
	],
	controllers: [CategoryController],
	providers: [CategoryService],
	exports: [CategoryService]
})
export class CategoryModule {}
