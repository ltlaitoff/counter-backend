import { ColorModel, ColorTypes } from '..'
import { ColorUtils } from 'Color'

export const findColors = async (
	data?: ColorTypes.Color,
	options: ColorTypes.FindColorOptions = { withoutCreating: true }
) => {
	ColorUtils.serviceDebugMessage(
		'find',
		'all',
		data !== undefined ? JSON.stringify(data) : '',
		JSON.stringify(options)
	)

	const dataForSearch: ColorTypes.Color | Record<string, never> =
		data !== undefined ? data : {}

	const projection = `-__v ${
		options.withoutCreating ? '-createdAt -updatedAt' : ''
	}`

	return await ColorModel.find(dataForSearch, projection).lean()
}
