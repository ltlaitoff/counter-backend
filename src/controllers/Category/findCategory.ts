import { Category } from 'models'
import { Category as CategoryType } from 'types'

export const findCategory = async (data: CategoryType) => {
	return await Category.findOne(data)
}
