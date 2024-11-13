import classes from './LastTrainingSession.module.scss'

export const LastTrainingSession = () => {
	return (
		<div className={classes.lastTrainingSessionBoard}>
			<div className={classes.boardHeader}>
				<div className={classes.headerColExercise}>Exercise</div>
				<div className={classes.headerColSets}>Sets</div>
				<div className={classes.headerColReps}>Repetitions</div>
			</div>
			<ul className={classes.boardExercises}>
				<li className={classes.boardExercise}>
					<div className={classes.exerciseName}>Squats</div>
					<div className={classes.exerciseSets}>3</div>
					<div className={classes.exerciseReps}>14(+2)</div>
				</li>
				<li className={classes.boardExercise}>
					<div className={classes.exerciseName}>Squats</div>
					<div className={classes.exerciseSets}>3</div>
					<div className={classes.exerciseReps}>14(+2)</div>
				</li>
				<li className={classes.boardExercise}>
					<div className={classes.exerciseName}>Squats</div>
					<div className={classes.exerciseSets}>3</div>
					<div className={classes.exerciseReps}>14(+2)</div>
				</li>
				<li className={classes.boardExercise}>
					<div className={classes.exerciseName}>Squats</div>
					<div className={classes.exerciseSets}>3</div>
					<div className={classes.exerciseReps}>14(+2)</div>
				</li>
				<li className={classes.boardExercise}>
					<div className={classes.exerciseName}>Squats</div>
					<div className={classes.exerciseSets}>3</div>
					<div className={classes.exerciseReps}>14(+2)</div>
				</li>
			</ul>
		</div>
	)
}
