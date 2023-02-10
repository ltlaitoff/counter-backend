import { StatisticModel, StatisticTypes } from '..'

export const findRecord = async (
	data: StatisticTypes.FindRecord = {},
	options: StatisticTypes.FindOptions = { withoutCreating: true }
) => {
	const projection = `-__v ${
		options.withoutCreating ? '-createdAt -updatedAt' : ''
	}`

	return await StatisticModel.findOne(data, projection).populate({
		path: 'category',
		populate: { path: 'color' }
	})
}
