import { ColorModel, ColorTypes } from '..'
import { ColorUtils } from 'Color'

export const findColor = async (
	data: ColorTypes.Color,
	options: ColorTypes.FindColorOptions = { withoutCreating: true }
) => {
	ColorUtils.serviceDebugMessage(
		'find',
		JSON.stringify(data),
		JSON.stringify(options)
	)

	const projection = `-__v ${
		options.withoutCreating ? '-createdAt -updatedAt' : ''
	}`

	return await ColorModel.findOne(data, projection).lean()
}
