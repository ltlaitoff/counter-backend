import { Category } from 'models'
import { ICategory } from 'types'

export const createCategory = (data: ICategory) => {
	return Category.create(data)
}
