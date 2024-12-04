'use client'

import { getCurrentWeek } from '@/shared/helpers/getCurrentWeek'
import { useGetSessionsByWeek } from '@/shared/hooks/useGetSessionsByWeek'

import { format, parseISO } from 'date-fns'

import { Loader } from 'lucide-react'

import classes from './HomeCalendar.module.scss'

export const HomeCalendar = () => {
	const currentWeek = getCurrentWeek()
	const startDate = currentWeek[0].date
	const endDate = currentWeek[currentWeek.length - 1].date
	const { data: sessions, isLoading } = useGetSessionsByWeek({ startDate, endDate })

	const today = format(new Date(), 'yyyy-MM-dd')

	//@ts-expect-error ...
	const sessionsByDate: Record<string, string> = sessions?.reduce((acc, session) => {
		//@ts-expect-error ...
		acc[session.date] = session.title
		return acc
	}, {})

	if (isLoading) {
		return (
			<div className={classes.calendarBoard}>
				<Loader className='loader' />
			</div>
		)
	}

	return (
		<div className={classes.calendarBoard}>
			<ul className={classes.calendarDays}>
				{currentWeek.map(day => (
					<li key={day.date} className={`${classes.calendarDay} ${day.date === today ? classes.currentDay : ''}`}>
						<div className={classes.dayHeader}>
							<div className={classes.date}>{format(parseISO(day.date), 'MMMM, dd')}</div>
							<div className={classes.day}>{day.day}</div>
						</div>
						<div className={classes.trainingSessionName}>{sessionsByDate[day.date] || 'No session'}</div>
					</li>
				))}
			</ul>
		</div>
	)
}
