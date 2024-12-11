import Link from 'next/link'

import { IWeekDay } from '@/shared/helpers/getCurrentWeek'
import { ISession } from '@/shared/types/session'

import { calculatePlanSummary } from '@/shared/helpers/calculatePlanSummary'

import { format, parseISO } from 'date-fns'

import { DialogBody, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { api } from '../../../../../convex/_generated/api'

import classes from './DayCard.module.scss'

interface IDayCardProps {
	day: IWeekDay
	sessions: ISession[]
}

export const DayCard = ({ day, sessions }: IDayCardProps) => {
	const [_isPopoverOpen, setPopoverOpen] = useState(false)
	const [sessionTitle, setSessionTitle] = useState('')

	const router = useRouter()
	const createSession = useMutation(api.sessions.createSession)

	const today = format(new Date(), 'yyyy-MM-dd')

	const sessionsByDate: Record<string, string> = sessions?.reduce((acc, session) => {
		//@ts-expect-error ...
		acc[session.date] = session.title
		return acc
	}, {})

	const sessionForDay = sessions.find(session => session.date === day.date)

	const planSummary = sessionForDay ? calculatePlanSummary(sessionForDay.plan) : null

	const handleCreateSession = async () => {
		if (!sessionTitle.trim()) return
		const sessionId = await createSession({ date: day.date, title: sessionTitle.trim() })
		setPopoverOpen(false)
		setSessionTitle('')
		router.push(`/workout-journal/${sessionId}`)
	}

	return (
		<li className={`${classes.day} ${day.date === today ? classes.currentDay : ''}`}>
			<div className={classes.date}>
				{format(parseISO(day.date), 'MMMM, dd')} <br /> {day.day}
			</div>
			{sessionForDay ? (
				<Link href={`/workout-journal/${sessionForDay?._id}`} className={classes.name}>
					{sessionsByDate[day.date]}
				</Link>
			) : (
				<h6 className={classes.name}>No session</h6>
			)}

			{planSummary ? (
				<>
					<div className={classes.plan}>
						<h6 className={classes.planLabel}>Plan:</h6>
						<span className={classes.planRow}>{planSummary.totalExercises} exercises</span>
						<span className={classes.planRow}>{planSummary.totalSets} sets</span>
						<span className={classes.planRow}>{planSummary.totalReps} repetitions</span>
					</div>
					<Link className={classes.noteLink} href={'/note'}>
						Note
					</Link>
				</>
			) : (
				<DialogRoot placement={'center'}>
					<DialogTrigger asChild>
						<button className={classes.noteLink}>Create</button>
					</DialogTrigger>
					<DialogContent className={classes.dialogContent}>
						<DialogHeader>
							<DialogTitle>Name your training session</DialogTitle>
						</DialogHeader>
						<DialogBody className={classes.dialogBody}>
							<input
								type='text'
								className={classes.sessionInput}
								placeholder='Enter session title'
								value={sessionTitle}
								onChange={e => setSessionTitle(e.target.value)}
								onKeyDown={e => {
									if (e.key === 'Enter') handleCreateSession()
								}}
								autoFocus
							/>
						</DialogBody>
					</DialogContent>
				</DialogRoot>
			)}
		</li>
	)
}
