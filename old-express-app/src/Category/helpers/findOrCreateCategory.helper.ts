import { CategoryTypes } from '..'
import { CategoryServices } from '..'

export const findOrCreateCategory = async (data: CategoryTypes.Category) => {
	const findedCategory = await CategoryServices.findCategory(data)

	if (findedCategory !== null) {
		return findedCategory
	}

	const createdCategory = await CategoryServices.createCategory(data)

	return createdCategory
}
