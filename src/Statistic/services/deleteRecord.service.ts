import { StatisticModel, StatisticTypes } from '..'

export const deleteRecord = (data: StatisticTypes.DeleteRecord) => {
	return StatisticModel.deleteOne(data)
}
