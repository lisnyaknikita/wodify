import classes from './HomeCalendar.module.scss'

export const HomeCalendar = () => {
	return (
		<div className={classes.calendarBoard}>
			<ul className={classes.calendarDays}>
				<li className={classes.calendarDay}>
					<div className={classes.dayHeader}>
						<div className={classes.date}>November, 06</div>
						<div className={classes.day}>Wednesday</div>
					</div>
					<div className={classes.trainingSessionName}>Legs & Chest</div>
				</li>
				<li className={classes.calendarDay}>
					<div className={classes.dayHeader}>
						<div className={classes.date}>November, 06</div>
						<div className={classes.day}>Wednesday</div>
					</div>
					<div className={classes.trainingSessionName}>Legs</div>
				</li>
				<li className={classes.calendarDay}>
					<div className={classes.dayHeader}>
						<div className={classes.date}>November, 06</div>
						<div className={classes.day}>Wednesday</div>
					</div>
					<div className={classes.trainingSessionName}>Legs</div>
				</li>
				<li className={classes.calendarDay}>
					<div className={classes.dayHeader}>
						<div className={classes.date}>November, 06</div>
						<div className={classes.day}>Wednesday</div>
					</div>
					<div className={classes.trainingSessionName}>Legs</div>
				</li>
				<li className={classes.calendarDay}>
					<div className={classes.dayHeader}>
						<div className={classes.date}>November, 06</div>
						<div className={classes.day}>Wednesday</div>
					</div>
					<div className={classes.trainingSessionName}>Legs</div>
				</li>
				<li className={classes.calendarDay}>
					<div className={classes.dayHeader}>
						<div className={classes.date}>November, 06</div>
						<div className={classes.day}>Wednesday</div>
					</div>
					<div className={classes.trainingSessionName}>Legs</div>
				</li>
				<li className={classes.calendarDay}>
					<div className={classes.dayHeader}>
						<div className={classes.date}>November, 06</div>
						<div className={classes.day}>Wednesday</div>
					</div>
					<div className={classes.trainingSessionName}>Legs</div>
				</li>
			</ul>
		</div>
	)
}
