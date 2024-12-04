'use client'

import { getCurrentWeek } from '@/shared/helpers/getCurrentWeek'
import { useGetSessionsByWeek } from '@/shared/hooks/useGetSessionsByWeek'

import { DayCard } from '../day-card/DayCard'

import { Loader } from 'lucide-react'

import classes from './WeekBoard.module.scss'

export const WeekBoard = () => {
	const currentWeek = getCurrentWeek()
	const startDate = currentWeek[0].date
	const endDate = currentWeek[currentWeek.length - 1].date
	const { data: sessions, isLoading } = useGetSessionsByWeek({ startDate, endDate })

	if (isLoading) {
		return (
			<div className={classes.weekBoard}>
				<Loader className='loader' />
			</div>
		)
	}

	if (!sessions) {
		return (
			<div className={classes.weekBoard}>
				<p>Error</p>
			</div>
		)
	}

	return (
		<div className={classes.weekBoard}>
			<ul className={classes.days}>
				{currentWeek.map(day => (
					<DayCard key={day.date} day={day} sessions={sessions} />
				))}
			</ul>
		</div>
	)
}
