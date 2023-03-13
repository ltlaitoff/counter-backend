import { StatisticModel, StatisticTypes } from '..'

export const createRecord = (data: StatisticTypes.CreateRecord) => {
	return StatisticModel.create(data)
}
