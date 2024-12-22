import { ISession } from '@/shared/types/session'

import { Loader } from 'lucide-react'

import { format, parseISO } from 'date-fns'

import classes from './LastNote.module.scss'

interface ILastNoteProps {
	lastSession: { data: ISession | null | undefined; isLoading: boolean }
}

export const LastNote = ({ lastSession }: ILastNoteProps) => {
	if (lastSession.isLoading) {
		return (
			<div className={classes.lastNote}>
				<Loader className='loader' />
			</div>
		)
	}

	if (!lastSession.data) {
		return <div className={classes.lastNote}>No note available</div>
	}
	return (
		<div className={classes.lastNote}>
			<h3 className={classes.noteTitle}>
				Note from {`${lastSession.data.title}(${format(parseISO(lastSession.data.date), 'MMMM, dd')})`}
			</h3>
			{/* <p className={classes.noteText}>{lastSession.data.note.content}</p> */}
		</div>
	)
}
