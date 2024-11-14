import Link from 'next/link'

import classes from './DayCard.module.scss'

export const DayCard = () => {
	return (
		<li className={classes.day}>
			<div className={classes.date}>
				November, 06 <br /> Wednesday
			</div>
			<h3 className={classes.name}>Legs</h3>
			<div className={classes.plan}>
				<h6 className={classes.planLabel}>Plan:</h6>
				<span className={classes.planRow}>4 exercises</span>
				<span className={classes.planRow}>12 sets</span>
				<span className={classes.planRow}>144 repetitions</span>
			</div>
			<Link className={classes.noteLink} href={'/note'}>
				Note
			</Link>
		</li>
	)
}
