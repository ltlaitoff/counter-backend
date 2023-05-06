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
import { CategoryGroupService } from './category-group.service'
import { CreateCategoryGroupDto } from './dto/create-category-group.dto'
import { UpdateCategoryGroupDto } from './dto/update-category-group.dto'
import { ReorderCategoryGroupDto } from './dto/reorder-category-group.dto'

@Controller('group')
export class CategoryGroupController {
	constructor(private categoryGroupService: CategoryGroupService) {}

	@Get('all')
	async all(@Session() session: SessionData, @Res() res: Response) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		res
			.status(HttpStatus.OK)
			.json(await this.categoryGroupService.getAll(session.auth.userId))
	}

	@Post('add')
	async add(
		@Session() session: SessionData,
		@Res() res: Response,
		@Body() body: CreateCategoryGroupDto
	) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		res
			.status(HttpStatus.OK)
			.json(await this.categoryGroupService.add(body, session.auth.userId))
	}

	@Put('reorder')
	async reorder(
		@Body() body: ReorderCategoryGroupDto,
		@Session() session: SessionData,
		@Res() res: Response
	) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		const result = await this.categoryGroupService.reorder(
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

	@Put(':id')
	async edit(
		@Session() session: SessionData,
		@Res() res: Response,
		@Param('id') id: string,
		@Body() body: UpdateCategoryGroupDto
	) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		const result = await this.categoryGroupService.edit(
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

	@Delete(':id')
	async delete(
		@Session() session: SessionData,
		@Res() res: Response,
		@Param('id') id: string
	) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		res
			.status(HttpStatus.OK)
			.json(await this.categoryGroupService.delete(id, session.auth.userId))
	}
}
