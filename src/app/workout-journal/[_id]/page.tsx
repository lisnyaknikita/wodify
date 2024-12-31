'use client'

import Link from 'next/link'

import { BoardBlock } from './components/board-block/BoardBlock'

import { calculateProgress } from '@/shared/helpers/calculateProgress'
import { useGetNoteBySessionId } from '@/shared/hooks/useGetNoteBySessionId'
import { useGetSessionById } from '@/shared/hooks/useGetSessionById'

import { Loader } from 'lucide-react'

import { useParams } from 'next/navigation'

import classes from './workout-journal.module.scss'

export default function WorkoutJournalPage() {
	const { _id } = useParams()

	const { data: session, isLoading: isSessionLoading } = useGetSessionById({ sessionId: _id })
	const { data: note, isLoading: isNoteLoading } = useGetNoteBySessionId({ sessionId: _id })

	if (isSessionLoading || isNoteLoading || !session || !note) {
		return <Loader className='loader' />
	}

	const progress = calculateProgress(session?.plan || [], session?.completed || [])

	return (
		<main className={classes.main}>
			<div className={classes.container}>
				<div className={classes.journalBoard}>
					<BoardBlock mode='planned' exercises={session?.plan} sessionId={session?._id} />
					<BoardBlock mode='completed' exercises={progress} sessionId={session?._id} />
					<Link className={classes.noteLink} href={`/notes/${note._id}`}>
						Note
					</Link>
				</div>
			</div>
		</main>
	)
}
