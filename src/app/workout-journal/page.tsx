import Link from 'next/link'
import { BoardBlock } from './components/board-block/BoardBlock'
import classes from './workout-journal.module.scss'

export default function WorkoutJournalPage() {
	return (
		<main className={classes.main}>
			<div className={classes.container}>
				<div className={classes.journalBoard}>
					<BoardBlock mode='planned' />
					<BoardBlock mode='completed' />
					<Link className={classes.noteLink} href={'/note/1'}>
						Note
					</Link>
				</div>
			</div>
		</main>
	)
}
