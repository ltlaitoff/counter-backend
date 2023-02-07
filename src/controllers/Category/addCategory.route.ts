import { Request, Response } from 'express'

import { getSessionUserId, stringValidation } from 'helpers'
import { unauthorizedError } from 'helpers'

import { Category } from 'models'
import { Category as CategoryType } from 'types'
import {} from '../../helpers/validators/string'
import { getLastCategoryOrder } from './getLastCategoryOrder'

type RecordBody = Omit<CategoryType, 'color' | 'user' | 'order'> & {
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

	const lastOrderId = await getLastCategoryOrder()

	const dataForAdd: Omit<CategoryType, 'color'> & {
		color: string
	} = {
		user: userId,
		...validBodyData,
		order: lastOrderId === null ? 0 : lastOrderId + 1
	}

	Category.create(dataForAdd, (error, document) => {
		res.status(200).json(document)
	})
}
