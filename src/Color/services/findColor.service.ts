import { ColorModel, ColorTypes } from '..'

export const findColor = async (
	data: ColorTypes.Color,
	options: ColorTypes.FindColorOptions = { withoutCreating: true }
) => {
	const projection = `-__v ${
		options.withoutCreating ? '-createdAt -updatedAt' : ''
	}`

	return await ColorModel.findOne(data, projection)
}
