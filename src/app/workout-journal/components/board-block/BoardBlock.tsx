import { BlockExercise } from '../block-exercise/BlockExercise'

import classes from './BoardBlock.module.scss'

interface IBoardBlockProps {
	mode: 'planned' | 'completed'
}

export const BoardBlock = ({ mode }: IBoardBlockProps) => {
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
					<BlockExercise />
					<BlockExercise />
					{/* TODO: pass mode to  BlockExercise*/}
				</ul>
			</div>
			{mode === 'planned' && <button className={classes.addExercise}>Add exercise</button>}
		</div>
	)
}
