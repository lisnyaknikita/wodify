import { WeekBoard } from './components/week-board/WeekBoard'

import classes from './weekly-page.module.scss'

export default function Page() {
	return (
		<main className={classes.main}>
			<div className={classes.container}>
				<WeekBoard />
			</div>
		</main>
	)
}
