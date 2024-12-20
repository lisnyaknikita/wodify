import { useGetNoteById } from '@/shared/hooks/useGetNoteById'
import { format, parseISO } from 'date-fns'
import { Loader } from 'lucide-react'
import { useParams } from 'next/navigation'
import classes from './NoteContent.module.scss'

export const NoteContent = () => {
	const { noteId } = useParams()
	const { data, isLoading } = useGetNoteById(noteId)

	if (isLoading) {
		return (
			<div className={classes.noteContent}>
				<Loader className='loader' />
			</div>
		)
	}

	if (!data) {
		return (
			<div className={classes.noteContent} style={{ color: 'red' }}>
				Something went wrong
			</div>
		)
	}

	return (
		<div className={classes.noteContent}>
			<h3 className={classes.noteTitle}>
				{data?.title}({format(parseISO(data?.date), 'MMMM, dd')})
			</h3>
			<p className={classes.noteText}>{data?.content}</p>
		</div>
	)
}
