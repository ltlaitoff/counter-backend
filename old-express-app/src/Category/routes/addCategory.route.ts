import { Request, Response } from 'express'

import {
	getSessionUserId,
	stringValidation,
	unauthorizedError
} from '../../helpers'

import { CategoryModel, CategoryHelpers, CategoryTypes } from '..'

type RecordBody = Omit<CategoryTypes.Category, 'color' | 'user' | 'order'> & {
	color: string
}

const recordBodyValidation = (body: Request['body']): null | RecordBody => {
	const name = body.name
	const comment = body.comment
	const color = body.color

	const resultName = stringValidation(name)
	if (resultName === null) return null

	const resultComment = stringValidation(comment)
	if (resultComment === null) return null

	const resultColor = stringValidation(color)
	if (resultColor === null) return null

	return {
		name: resultName,
		comment: resultComment,
		color: resultColor
	}
}

export const addCategoryRoute = async (req: Request, res: Response) => {
	console.log(req.body)
	const validBodyData = recordBodyValidation(req.body)

	if (validBodyData === null) {
		return res.status(404).json({ message: 'Not valid body' })
	}

	const userId = getSessionUserId(req.session)

	if (userId === null) {
		return unauthorizedError(res)
	}

	const lastOrderId = await CategoryHelpers.getLastCategoryOrder()

	const dataForAdd: Omit<CategoryTypes.Category, 'color'> & {
		color: string
	} = {
		user: userId,
		...validBodyData,
		order: lastOrderId === null ? 0 : lastOrderId + 1
	}

	/* @ts-expect-error OLD */
	CategoryModel.create(dataForAdd, async (error, document) => {
		await document.populate('color')

		res.status(200).json(document)
	})
}
