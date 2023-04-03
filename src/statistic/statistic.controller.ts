import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Res,
	Session
} from '@nestjs/common'
import { Response } from 'express'
import { SessionData } from 'express-session'
import { CreateStatisticDto } from './dto/create-statistic.dto'
import { UpdateStatisticDto } from './dto/update-statistic.dto'
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

	@Put(':id')
	async put(
		@Param('id') id: string,
		@Body() body: UpdateStatisticDto,
		@Session() session: SessionData,
		@Res() res: Response
	) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		const result = await this.statisticService.edit(
			id,
			body,
			session.auth.userId
		)

		if (result === null) {
			return res
				.status(HttpStatus.BAD_REQUEST)
				.json({ message: 'Something gonna wrong' })
		}

		res.status(HttpStatus.OK).json(result)
	}
}
