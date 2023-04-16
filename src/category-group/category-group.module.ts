import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CategoryGroupService } from './category-group.service'
import { CategoryGroupController } from './category-group.controller'
import { Group, GroupSchema } from './category-group.schema'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Group.name,
				schema: GroupSchema
			}
		])
	],
	providers: [CategoryGroupService],
	controllers: [CategoryGroupController],
	exports: [CategoryGroupService]
})
export class CategoryGroupModule {}
