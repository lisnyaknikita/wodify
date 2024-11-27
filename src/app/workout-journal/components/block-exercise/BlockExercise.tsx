import classes from './BlockExercise.module.scss'

// interface IBlockExerciseProps {
// 	mode: 'planned' | 'completed'
// }

export const BlockExercise = () => {
	return (
		<li className={classes.blockExercise}>
			<div className={classes.exerciseName}>Squats</div>
			<div className={classes.exerciseWeight}>
				<input type='text' defaultValue={80} maxLength={3} />
				<span>kg</span>
			</div>
			<div className={classes.exerciseSets}>
				<input type='number' defaultValue={3} />
			</div>
			<div className={classes.exerciseReps}>
				<input type='number' defaultValue={12} />
			</div>
		</li>
	)
}
