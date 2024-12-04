import Link from 'next/link'

import { IWeekDay } from '@/shared/helpers/getCurrentWeek'
import { ISession } from '@/shared/types/session'

import { calculatePlanSummary } from '@/shared/helpers/calculatePlanSummary'

import { format, parseISO } from 'date-fns'

import classes from './DayCard.module.scss'

interface IDayCardProps {
	day: IWeekDay
	sessions: ISession[]
}

export const DayCard = ({ day, sessions }: IDayCardProps) => {
	const today = format(new Date(), 'yyyy-MM-dd')

	const sessionsByDate: Record<string, string> = sessions?.reduce((acc, session) => {
		//@ts-expect-error ...
		acc[session.date] = session.title
		return acc
	}, {})

	const sessionForDay = sessions.find(session => session.date === day.date)

	const planSummary = sessionForDay
		? calculatePlanSummary(sessionForDay.plan)
		: { totalExercises: 0, totalSets: 0, totalReps: 0 }

	return (
		<li className={`${classes.day} ${day.date === today ? classes.currentDay : ''}`}>
			<div className={classes.date}>
				{format(parseISO(day.date), 'MMMM, dd')} <br /> {day.day}
			</div>
			<h3 className={classes.name}>{sessionsByDate[day.date] || 'No session'}</h3>
			<div className={classes.plan}>
				<h6 className={classes.planLabel}>Plan:</h6>
				<span className={classes.planRow}>{planSummary.totalExercises} exercises</span>
				<span className={classes.planRow}>{planSummary.totalSets} sets</span>
				<span className={classes.planRow}>{planSummary.totalReps} repetitions</span>
			</div>
			<Link className={classes.noteLink} href={'/note'}>
				Note
			</Link>
		</li>
	)
}
