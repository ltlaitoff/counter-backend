import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Res,
	Session
} from '@nestjs/common'
import { Response } from 'express'
import { SessionData } from 'express-session'
import { CreateStatisticDto } from './dto/create-statistic.dto'
import { StatisticService } from './statistic.service'

/*
statisticRouter.get('/all', StatisticRoutes.getAllRecords)
statisticRouter.get('/:recordId', StatisticRoutes.getByRecordId)
statisticRouter.post('/add', StatisticRoutes.addRecord)
statisticRouter.delete('/:id', StatisticRoutes.deleteRecord)
*/

@Controller('statistic')
export class StatisticController {
	constructor(private statisticService: StatisticService) {}

	@Get('all')
	async getAll(@Session() session: SessionData, @Res() res: Response) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		res
			.status(HttpStatus.OK)
			.json(await this.statisticService.getAll(session.auth.userId))
	}

	@Get(':id')
	async getById(
		@Param('id') id: string,
		@Session() session: SessionData,
		@Res() res: Response
	) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		res
			.status(HttpStatus.OK)
			.json(await this.statisticService.getById(id, session.auth.userId))
	}

	@Post('add')
	async add(
		@Body() body: CreateStatisticDto,
		@Session() session: SessionData,
		@Res() res: Response
	) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		res
			.status(HttpStatus.OK)
			.json(await this.statisticService.add(body, session.auth.userId))
	}

	@Delete(':id')
	async delete(
		@Param('id') id: string,
		@Session() session: SessionData,
		@Res() res: Response
	) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		res
			.status(HttpStatus.OK)
			.json(await this.statisticService.delete(id, session.auth.userId))
	}
}
