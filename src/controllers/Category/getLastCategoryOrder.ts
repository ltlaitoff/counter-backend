import { Category } from 'models'

export const getLastCategoryOrder = async () => {
	const allCategories = await Category.find()

	const result = allCategories.reduce(
		(prev, category) => (category.order > prev ? category.order : prev),
		-1
	)

	return result === -1 ? null : result
}
