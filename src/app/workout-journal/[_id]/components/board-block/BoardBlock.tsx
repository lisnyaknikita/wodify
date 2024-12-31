import { DialogBody, DialogContent, DialogHeader, DialogRoot, DialogTitle } from '@/components/ui/dialog'

import { useAddExercise } from '@/shared/hooks/useAddExercise'
import { IExercise, IProgressExercise } from '@/shared/types/exercise'

import { Loader } from 'lucide-react'

import { useState } from 'react'

import { Id } from '../../../../../../convex/_generated/dataModel'

import { BlockExercise } from '../block-exercise/BlockExercise'

import classes from './BoardBlock.module.scss'

interface IBoardBlockProps {
	mode: 'planned' | 'completed'
	exercises: IExercise[] | IProgressExercise[] | undefined
	sessionId: Id<'sessions'> | undefined
}

export const BoardBlock = ({ mode, exercises, sessionId }: IBoardBlockProps) => {
	const addExercise = useAddExercise()

	const [exerciseName, setExerciseName] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleAddExercise = async () => {
		if (!exerciseName.trim()) return

		setIsLoading(true)

		try {
			const newExercise = {
				sessionId,
				exercise: exerciseName,
				sets: 0,
				reps: 0,
				weight: 0,
			}
			await addExercise(newExercise)
			setExerciseName('')
			setIsModalOpen(false)
		} catch (error) {
			console.error('Failed to add exercise:', error)
		} finally {
			setIsLoading(false)
		}
	}

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
				{isLoading ? (
					<Loader />
				) : (
					<ul className={classes.blockExercises}>
						{!exercises && <Loader />}
						{exercises?.map((item, index) => (
							<BlockExercise key={index} mode={mode} data={item} sessionId={sessionId} index={index} />
						))}
					</ul>
				)}
			</div>
			{mode === 'planned' && (
				<>
					<button className={classes.addExercise} onClick={() => setIsModalOpen(true)}>
						Add Exercise
					</button>

					<DialogRoot open={isModalOpen} onOpenChange={details => setIsModalOpen(details.open)} placement={'center'}>
						<DialogContent className={classes.dialogContent}>
							<DialogHeader style={{ textAlign: 'center' }}>
								<DialogTitle>Add New Exercise</DialogTitle>
							</DialogHeader>
							<DialogBody className={classes.dialogBody}>
								<input
									type='text'
									placeholder='Exercise name'
									value={exerciseName}
									onChange={e => setExerciseName(e.target.value)}
									onKeyDown={e => {
										if (e.key === 'Enter' && exerciseName.trim()) {
											handleAddExercise()
										}
									}}
									className={classes.inputField}
									autoFocus
								/>
							</DialogBody>
						</DialogContent>
					</DialogRoot>
				</>
			)}
		</div>
	)
}
