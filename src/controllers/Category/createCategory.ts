import { Category } from 'models'
import { Category as CategoryType } from 'types'

export const createCategory = (data: CategoryType) => {
	return Category.create(data)
}
