import { CategoryModel, CategoryTypes } from '..'

export const findCategory = async (data: CategoryTypes.Category) => {
	return await CategoryModel.findOne(data)
}
