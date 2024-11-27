import Link from 'next/link'
import classes from './NoteList.module.scss'

export const NoteList = () => {
	return (
		<ul className={classes.noteList}>
			<li className={classes.noteItem}>
				<Link href={'/notes/1'} className={classes.noteLink}>
					Legs(November, 06)
				</Link>
			</li>
			<li className={classes.noteItem}>
				<Link href={'/notes/1'} className={classes.noteLink}>
					Legs(November, 06)
				</Link>
			</li>
			<li className={classes.noteItem}>
				<Link href={'/notes/1'} className={classes.noteLink}>
					Legs(November, 06)
				</Link>
			</li>
			<li className={classes.noteItem}>
				<Link href={'/notes/1'} className={classes.noteLink}>
					Legs(November, 06)
				</Link>
			</li>
		</ul>
	)
}
