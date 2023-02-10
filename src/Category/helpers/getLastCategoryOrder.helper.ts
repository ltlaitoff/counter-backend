import { CategoryModel } from '..'

export const getLastCategoryOrder = async (): Promise<null | number> => {
	// TODO: Change it to servive
	const allCategories = await CategoryModel.find()

	const result = allCategories.reduce(
		(prev, category) => (category.order > prev ? category.order : prev),
		-1
	)

	return result === -1 ? null : result
}
