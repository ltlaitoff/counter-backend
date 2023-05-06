import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CategoryModule } from 'src/category/category.module'
import { ColorModule } from 'src/color/color.module'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'

@Module({
	imports: [ConfigModule, ColorModule, CategoryModule],
	controllers: [AdminController],
	providers: [AdminService]
})
export class AdminModule {}
