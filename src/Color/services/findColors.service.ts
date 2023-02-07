import { ColorModel, ColorTypes } from '..'

export const findColors = async (
	data?: ColorTypes.Color,
	options: ColorTypes.FindColorOptions = { withoutCreating: true }
) => {
	const dataForSearch: ColorTypes.Color | Record<string, never> =
		data !== undefined ? data : {}

	const projection = `-__v ${
		options.withoutCreating ? '-createdAt -updatedAt' : ''
	}`

	return await ColorModel.find(dataForSearch, projection)
}
