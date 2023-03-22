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

import { CategoryService } from './category.service'
import { SessionData } from 'express-session'
import { Response } from 'express'
import { CreateCategoryDto } from './dto/create-category.dto'

/*
Routes:

'/add', addCategory, post
'/:id', deleteCategory, delete
*/

@Controller('category')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Get('all')
	async getAll(@Session() session: SessionData, @Res() res: Response) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		res
			.status(HttpStatus.OK)
			.json(await this.categoryService.getAll(session.auth.userId))
	}

	@Post('add')
	async addNew(
		@Session() session: SessionData,
		@Res() res: Response,
		@Body() body: CreateCategoryDto
	) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		res
			.status(HttpStatus.OK)
			.json(await this.categoryService.add(body, session.auth.userId))
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
			.json(await this.categoryService.delete(id, session.auth.userId))
	}
}
