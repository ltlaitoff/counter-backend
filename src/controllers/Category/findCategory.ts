import { Category, ICategory } from 'models'

export const findCategory = async (data: ICategory) => {
	return await Category.findOne(data)
}
