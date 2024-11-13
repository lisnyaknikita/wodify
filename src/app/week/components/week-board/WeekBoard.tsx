import { DayCard } from '../day-card/DayCard'

import classes from './WeekBoard.module.scss'

export const WeekBoard = () => {
	return (
		<div className={classes.weekBoard}>
			<ul className={classes.days}>
				<DayCard />
				<DayCard />
				<DayCard />
				<DayCard />
				<DayCard />
				<DayCard />
				<DayCard />
			</ul>
		</div>
	)
}
