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

import { CategoryService } from './category.service'
import { SessionData } from 'express-session'
import { Response } from 'express'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ReorderCategoryDto } from './dto/reorder-category.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('category')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@ApiTags('Categories')
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({
		status: 200,
		description: 'Get all user categories'
	})
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

	@ApiTags('Categories')
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 200, description: 'Get all user categories' })
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

	@ApiTags('Categories')
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 200, description: 'Category has beed deleted' })
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

	@ApiTags('Categories')
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 200, description: 'Categories has beed reorder' })
	@Put('reorder')
	async reorder(
		@Body() body: ReorderCategoryDto,
		@Session() session: SessionData,
		@Res() res: Response
	) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		const result = await this.categoryService.reorder(body, session.auth.userId)

		if (result === null) {
			return res
				.status(HttpStatus.BAD_REQUEST)
				.json({ message: 'Something gonna wrong' })
		}

		res.status(HttpStatus.OK).json(result)
	}

	@ApiTags('Categories')
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 200, description: 'Category has beed changes' })
	@Put(':id')
	async put(
		@Param('id') id: string,
		@Body() body: UpdateCategoryDto,
		@Session() session: SessionData,
		@Res() res: Response
	) {
		if (session.auth === undefined || !session.auth.authorized) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
			return
		}

		const result = await this.categoryService.edit(
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
