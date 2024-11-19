import classes from './BlockExercise.module.scss'

// interface IBlockExerciseProps {
// 	mode: 'planned' | 'completed'
// }

export const BlockExercise = () => {
	return (
		<li className={classes.blockExercise}>
			<div className={classes.exerciseName}>Squats(80kg)</div>
			<div className={classes.exerciseSets}>3</div>
			<div className={classes.exerciseReps}>14</div>
		</li>
	)
}
