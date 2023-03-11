import { Statistic } from './Statistic.types'

export type CreateRecord = Omit<Statistic, 'category'> & {
	category: string
}

export type FindRecord = Partial<
	Omit<Statistic, 'category' | '_id'> & {
		_id: string
		category: string
	}
>

export type DeleteRecord = Required<
	Pick<Statistic, 'user'> & {
		_id: string
	}
>
