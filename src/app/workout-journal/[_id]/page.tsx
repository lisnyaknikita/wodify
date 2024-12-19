'use client'

import Link from 'next/link'

import { BoardBlock } from './components/board-block/BoardBlock'

import { calculateProgress } from '@/shared/helpers/calculateProgress'
import { useGetSessionById } from '@/shared/hooks/useGetSessionById'
import { Loader } from 'lucide-react'
import { useParams } from 'next/navigation'
import classes from './workout-journal.module.scss'

export default function WorkoutJournalPage() {
	const { _id } = useParams()

	const { data: session, isLoading } = useGetSessionById({ sessionId: _id })

	if (isLoading || !session) {
		return <Loader className='loader' />
	}

	const progress = calculateProgress(session?.plan || [], session?.completed || [])

	return (
		<main className={classes.main}>
			<div className={classes.container}>
				<div className={classes.journalBoard}>
					<BoardBlock mode='planned' exercises={session?.plan} sessionId={session?._id} />
					<BoardBlock mode='completed' exercises={progress} sessionId={session?._id} />
					<Link className={classes.noteLink} href={'/note/1'}>
						Note
					</Link>
				</div>
			</div>
		</main>
	)
}
