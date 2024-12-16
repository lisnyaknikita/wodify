'use client'

import Link from 'next/link'

import { BoardBlock } from './components/board-block/BoardBlock'

import { calculateProgress } from '@/shared/helpers/calculateProgress'
import { useGetSession } from '@/shared/hooks/useGetSession'
import { format } from 'date-fns'
import classes from './workout-journal.module.scss'

export default function WorkoutJournalPage() {
	const today = format(new Date(), 'yyyy-MM-dd')

	const todaySession = useGetSession({ date: today })

	const progress = calculateProgress(todaySession.data?.plan || [], todaySession.data?.completed || [])

	return (
		<main className={classes.main}>
			<div className={classes.container}>
				<div className={classes.journalBoard}>
					<BoardBlock mode='planned' exercises={todaySession.data?.plan} sessionId={todaySession.data?._id} />
					<BoardBlock mode='completed' exercises={progress} sessionId={todaySession.data?._id} />
					<Link className={classes.noteLink} href={'/note/1'}>
						Note
					</Link>
				</div>
			</div>
		</main>
	)
}
