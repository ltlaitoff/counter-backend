import { ICategory } from 'types'
import { findCategory, createCategory } from '.'

export const findOrCreateCategory = async (data: ICategory) => {
	const findedCategory = await findCategory(data)

	if (findedCategory !== null) {
		return findedCategory
	}

	const createdCategory = await createCategory(data)

	return createdCategory
}
