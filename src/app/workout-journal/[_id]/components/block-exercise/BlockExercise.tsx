import { IExercise, IProgressExercise } from '@/shared/types/exercise'
import classes from './BlockExercise.module.scss'

interface IBlockExerciseProps {
	mode: 'planned' | 'completed'
	data: IExercise | IProgressExercise
}

export const BlockExercise = ({ mode, data }: IBlockExerciseProps) => {
	const formatDifference = (difference: number) => (difference > 0 ? `+${difference}` : difference.toString())

	//TODO: try to make a modal window in completed block for setting numbers

	return (
		<li className={classes.blockExercise}>
			<div className={classes.exerciseName}>{data.exercise}</div>
			<div className={classes.exerciseWeight}>
				{mode === 'completed' && typeof data.weight === 'object' && 'actual' in data.weight ? (
					<>
						<input type='text' defaultValue={data.weight.actual} maxLength={3} />
						<span>kg</span>
						<span>({formatDifference(data.weight.difference)})</span>
					</>
				) : (
					<>
						<input type='text' defaultValue={typeof data.weight === 'number' ? data.weight : ''} maxLength={3} />
						<span>kg</span>
					</>
				)}
			</div>
			<div className={classes.exerciseSets}>
				{mode === 'completed' && typeof data.sets === 'object' && 'actual' in data.sets ? (
					<>
						<input type='number' defaultValue={data.sets.actual} />
						<span>({formatDifference(data.sets.difference)})</span>
					</>
				) : (
					<input type='number' defaultValue={typeof data.sets === 'number' ? data.sets : ''} />
				)}
			</div>
			<div className={classes.exerciseReps}>
				{mode === 'completed' && typeof data.reps === 'object' && 'actual' in data.reps ? (
					<>
						<input type='number' defaultValue={data.reps.actual} />
						<span>({formatDifference(data.reps.difference)})</span>
					</>
				) : (
					<input type='number' defaultValue={typeof data.reps === 'number' ? data.reps : ''} />
				)}
			</div>
		</li>
	)
}
