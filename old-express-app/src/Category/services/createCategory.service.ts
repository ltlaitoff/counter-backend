import { CategoryModel, CategoryTypes } from '..'

export const createCategory = (data: CategoryTypes.Category) => {
	return CategoryModel.create(data)
}
