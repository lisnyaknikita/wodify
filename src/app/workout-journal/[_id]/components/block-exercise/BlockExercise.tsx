'use client'

import { DialogBody, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useUpdateExerciseValues } from '@/shared/hooks/useUpdateExerciseValues'
import { IExercise, IProgressExercise } from '@/shared/types/exercise'
import { useState } from 'react'
import { Id } from '../../../../../../convex/_generated/dataModel'
import classes from './BlockExercise.module.scss'

interface IBlockExerciseProps {
	mode: 'planned' | 'completed'
	data: IExercise | IProgressExercise
	sessionId: Id<'sessions'> | undefined
	index: number
}

export const BlockExercise = ({ mode, data, sessionId, index }: IBlockExerciseProps) => {
	const handleUpdate = useUpdateExerciseValues()

	const formatDifference = (difference: number) => (difference > 0 ? `+${difference}` : difference.toString())

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [inputValue, setInputValue] = useState('')

	const handleSave = async (field: 'weight' | 'sets' | 'reps') => {
		if (!sessionId) return

		const updatedValue = parseInt(inputValue, 10)
		if (isNaN(updatedValue)) return

		try {
			await handleUpdate({
				sessionId,
				mode,
				exerciseIndex: index,
				[field]: updatedValue,
			})
			setIsModalOpen(false)
		} catch (error) {
			console.error('Error saving updated value:', error)
		}
	}

	return (
		<li className={classes.blockExercise}>
			<div className={classes.exerciseName}>{data.exercise}</div>
			<div className={classes.exerciseWeight}>
				{mode === 'completed' && typeof data.weight === 'object' && 'actual' in data.weight ? (
					<>
						<DialogRoot open={isModalOpen} onOpenChange={details => setIsModalOpen(details.open)} placement={'center'}>
							<DialogTrigger asChild>
								<button className={classes.editButton}>
									{data.weight.actual} kg ({formatDifference(data.weight.difference)})
								</button>
							</DialogTrigger>
							<DialogContent className={classes.dialogContent}>
								<DialogHeader style={{ textAlign: 'center' }}>
									<DialogTitle>Edit Weight</DialogTitle>
								</DialogHeader>
								<DialogBody className={classes.dialogBody}>
									<input
										type='number'
										className={classes.inputField}
										placeholder='Enter weight'
										value={inputValue}
										onChange={e => setInputValue(e.target.value)}
										onKeyDown={e => {
											if (e.key === 'Enter') handleSave('weight')
										}}
										autoFocus
									/>
								</DialogBody>
							</DialogContent>
						</DialogRoot>
					</>
				) : (
					<>
						<input
							type='number'
							defaultValue={data.weight as number}
							maxLength={3}
							onBlur={e =>
								handleUpdate({
									sessionId,
									exerciseIndex: index,
									weight: parseInt(e.target.value, 10),
									mode,
								})
							}
						/>
						<span>kg</span>
					</>
				)}
			</div>
			<div className={classes.exerciseSets}>
				{mode === 'completed' && typeof data.sets === 'object' && 'actual' in data.sets ? (
					<>
						{/* TODO: fix modal window open/close and input values */}
						<DialogRoot placement={'center'}>
							<DialogTrigger asChild>
								<button className={classes.editButton}>
									{data.sets.actual} ({formatDifference(data.sets.difference)})
								</button>
							</DialogTrigger>
							<DialogContent className={classes.dialogContent}>
								<DialogHeader style={{ textAlign: 'center' }}>
									<DialogTitle>Edit Sets Count</DialogTitle>
								</DialogHeader>
								<DialogBody className={classes.dialogBody}>
									<input
										type='number'
										className={classes.inputField}
										placeholder='Enter sets count'
										value={inputValue}
										onChange={e => setInputValue(e.target.value)}
										onKeyDown={e => {
											if (e.key === 'Enter') handleSave('sets')
										}}
										autoFocus
									/>
								</DialogBody>
							</DialogContent>
						</DialogRoot>
					</>
				) : (
					<input
						type='number'
						defaultValue={typeof data.sets === 'number' ? data.sets : ''}
						onBlur={e =>
							handleUpdate({
								sessionId,
								exerciseIndex: index,
								sets: parseInt(e.target.value, 10),
								mode,
							})
						}
					/>
				)}
			</div>
			<div className={classes.exerciseReps}>
				{mode === 'completed' && typeof data.reps === 'object' && 'actual' in data.reps ? (
					<>
						<DialogRoot placement={'center'}>
							<DialogTrigger asChild>
								<button className={classes.editButton}>
									{data.reps.actual} ({formatDifference(data.reps.difference)})
								</button>
							</DialogTrigger>
							<DialogContent className={classes.dialogContent}>
								<DialogHeader style={{ textAlign: 'center' }}>
									<DialogTitle>Edit Reps Count</DialogTitle>
								</DialogHeader>
								<DialogBody className={classes.dialogBody}>
									<input
										type='number'
										className={classes.inputField}
										placeholder='Enter reps count'
										value={inputValue}
										onChange={e => setInputValue(e.target.value)}
										onKeyDown={e => {
											if (e.key === 'Enter') handleSave('reps')
										}}
										autoFocus
									/>
								</DialogBody>
							</DialogContent>
						</DialogRoot>
					</>
				) : (
					<input
						type='number'
						defaultValue={typeof data.reps === 'number' ? data.reps : ''}
						onBlur={e =>
							handleUpdate({
								sessionId,
								exerciseIndex: index,
								reps: parseInt(e.target.value, 10),
								mode,
							})
						}
					/>
				)}
			</div>
		</li>
	)
}
