import { IExercise, IProgressExercise } from '@/shared/types/exercise'
import { BlockExercise } from '../block-exercise/BlockExercise'
import classes from './BoardBlock.module.scss'

interface IBoardBlockProps {
	mode: 'planned' | 'completed'
	exercises: IExercise[] | IProgressExercise[] | undefined
}

export const BoardBlock = ({ mode, exercises }: IBoardBlockProps) => {
	return (
		<div className={classes.boardBlock}>
			<h2 className={classes.blockTitle}>{`${mode === 'planned' ? 'Planned' : 'Completed'}`}</h2>
			<div className={classes.blockTable}>
				<div className={classes.blockHeader}>
					<div className={classes.headerColExercise}>Exercise</div>
					<div className={classes.headerColWeight}>Weight</div>
					<div className={classes.headerColSets}>Sets</div>
					<div className={classes.headerColReps}>Repetitions</div>
				</div>
				<ul className={classes.blockExercises}>
					{mode === 'planned' &&
						exercises?.map((item, index) => <BlockExercise key={index} mode='planned' data={item} />)}
					{mode === 'completed' &&
						exercises?.map((item, index) => <BlockExercise key={index} mode='completed' data={item} />)}
				</ul>
			</div>
			{mode === 'planned' && <button className={classes.addExercise}>Add exercise</button>}
		</div>
	)
}
