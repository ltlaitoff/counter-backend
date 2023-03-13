import { StatisticModel, StatisticTypes } from '..'

export const deleteRecord: any = (data: StatisticTypes.DeleteRecord) => {
	return StatisticModel.deleteOne(data)
}
