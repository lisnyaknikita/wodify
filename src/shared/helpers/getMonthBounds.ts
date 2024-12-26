import { endOfMonth, format, startOfMonth } from 'date-fns'

export const getMonthBounds = (date: Date = new Date()) => {
	const startDate = startOfMonth(date)
	const endDate = endOfMonth(date)

	return {
		startDate: format(startDate, 'yyyy-MM-dd'),
		endDate: format(endDate, 'yyyy-MM-dd'),
	}
}
