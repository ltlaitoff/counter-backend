import { Category } from 'models'
import { ICategory } from 'types'

export const findCategory = async (data: ICategory) => {
	return await Category.findOne(data)
}
