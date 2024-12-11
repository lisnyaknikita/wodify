import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns'

export interface IWeekDay {
	date: string
	day: string
}

export const getCurrentWeek = (): IWeekDay[] => {
	const start = startOfWeek(new Date(), { weekStartsOn: 1 })
	const end = endOfWeek(new Date(), { weekStartsOn: 1 })

	return eachDayOfInterval({ start, end }).map(date => ({
		date: format(date, 'yyyy-MM-dd'),
		day: format(date, 'EEEE'),
	}))
}
