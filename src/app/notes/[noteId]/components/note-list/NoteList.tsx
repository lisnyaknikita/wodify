import Link from 'next/link'

import { useGetLastNotes } from '@/shared/hooks/useGetLastNotes'

import { format, parseISO } from 'date-fns'
import { Loader } from 'lucide-react'
import { useParams } from 'next/navigation'

import classes from './NoteList.module.scss'

export const NoteList = () => {
	const { data, isLoading } = useGetLastNotes()

	const params = useParams()

	if (isLoading) {
		return (
			<ul className={classes.noteList}>
				<Loader className='loader' />
			</ul>
		)
	}

	return (
		<ul className={classes.noteList}>
			{data?.map(item => (
				<li className={`${classes.noteItem} ${params.noteId === item._id ? 'active' : ''}`} key={item._id}>
					<Link href={`/notes/${item._id}`} className={classes.noteLink}>
						{item.title}({format(parseISO(item.date), 'MMMM, dd')})
					</Link>
				</li>
			))}
		</ul>
	)
}
