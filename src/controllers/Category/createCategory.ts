import { Category, ICategory } from 'models'

export const createCategory = (data: ICategory) => {
	return Category.create(data)
}
