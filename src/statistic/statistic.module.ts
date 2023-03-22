import { Module } from '@nestjs/common'
import { StatisticController } from './statistic.controller'
import { StatisticService } from './statistic.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Statistic, StatisticSchema } from './statistic.schema'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Statistic.name,
				schema: StatisticSchema
			}
		])
	],
	controllers: [StatisticController],
	providers: [StatisticService]
})
export class StatisticModule {}
