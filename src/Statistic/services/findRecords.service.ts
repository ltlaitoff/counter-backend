import { StatisticModel, StatisticTypes } from '..'

export const findRecords = async (
	data: StatisticTypes.FindRecord = {},
	options: StatisticTypes.FindOptions = { withoutCreating: true }
) => {
	const projection = `-__v ${
		options.withoutCreating ? '-createdAt -updatedAt' : ''
	}`

	return await StatisticModel.find(data, projection).populate({
		path: 'category',
		populate: { path: 'color' }
	})
}
