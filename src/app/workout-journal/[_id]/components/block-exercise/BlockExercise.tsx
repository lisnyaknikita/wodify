'use client'

import { DialogBody, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useDeleteExercise } from '@/shared/hooks/useDeleteExercise'
import { useUpdateExerciseValues } from '@/shared/hooks/useUpdateExerciseValues'
import { IExercise, IProgressExercise } from '@/shared/types/exercise'

import { X } from 'lucide-react'

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
	const handleDelete = useDeleteExercise()

	const formatDifference = (difference: number) => (difference > 0 ? `+${difference}` : difference.toString())

	const [isWeightModalOpen, setWeightModalOpen] = useState(false)
	const [isSetsModalOpen, setSetsModalOpen] = useState(false)
	const [isRepsModalOpen, setRepsModalOpen] = useState(false)
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

	const [inputValue, setInputValue] = useState('')

	const handleDeleteConfirm = async () => {
		if (!sessionId) {
			console.error('Session ID is undefined')
			return
		}

		try {
			await handleDelete({ sessionId, exerciseIndex: index })
			setDeleteModalOpen(false)
		} catch (error) {
			console.error('Error deleting exercise:', error)
		}
	}

	const handleCloseModal = () => {
		setInputValue('')
		setWeightModalOpen(false)
		setSetsModalOpen(false)
		setRepsModalOpen(false)
		setDeleteModalOpen(false)
	}

	const handleOpenModal = (field: 'weight' | 'sets' | 'reps') => {
		if (field === 'weight') setWeightModalOpen(true)
		if (field === 'sets') setSetsModalOpen(true)
		if (field === 'reps') setRepsModalOpen(true)
	}

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
			handleCloseModal()
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
						<DialogRoot
							open={isWeightModalOpen}
							onOpenChange={details => setWeightModalOpen(details.open)}
							placement={'center'}
						>
							<DialogTrigger asChild>
								<button onClick={() => handleOpenModal('weight')} className={classes.editButton}>
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
										defaultValue={data.weight.actual}
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
							onBlur={e => {
								if (!sessionId) {
									console.error('Session ID is undefined')
									return
								}

								handleUpdate({
									sessionId,
									exerciseIndex: index,
									weight: parseInt(e.target.value, 10),
									mode,
								})
							}}
						/>
						<span>kg</span>
					</>
				)}
			</div>
			<div className={classes.exerciseSets}>
				{mode === 'completed' && typeof data.sets === 'object' && 'actual' in data.sets ? (
					<>
						<DialogRoot
							open={isSetsModalOpen}
							onOpenChange={details => setSetsModalOpen(details.open)}
							placement={'center'}
						>
							<DialogTrigger asChild>
								<button onClick={() => handleOpenModal('sets')} className={classes.editButton}>
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
										defaultValue={data.sets.actual}
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
						onBlur={e => {
							if (!sessionId) {
								console.error('Session ID is undefined')
								return
							}

							handleUpdate({
								sessionId,
								exerciseIndex: index,
								sets: parseInt(e.target.value, 10),
								mode,
							})
						}}
					/>
				)}
			</div>
			<div className={classes.exerciseReps}>
				{mode === 'completed' && typeof data.reps === 'object' && 'actual' in data.reps ? (
					<>
						<DialogRoot
							open={isRepsModalOpen}
							onOpenChange={details => setRepsModalOpen(details.open)}
							placement={'center'}
						>
							<DialogTrigger asChild>
								<button onClick={() => handleOpenModal('reps')} className={classes.editButton}>
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
										defaultValue={data.reps.actual}
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
						onBlur={e => {
							if (!sessionId) {
								console.error('Session ID is undefined')
								return
							}

							handleUpdate({
								sessionId,
								exerciseIndex: index,
								reps: parseInt(e.target.value, 10),
								mode,
							})
						}}
					/>
				)}
			</div>
			{mode === 'planned' && (
				<>
					<button className={classes.exerciseDelete} onClick={() => setDeleteModalOpen(true)}>
						<X size={20} />
					</button>
					<DialogRoot
						open={isDeleteModalOpen}
						onOpenChange={details => setDeleteModalOpen(details.open)}
						placement={'center'}
					>
						<DialogContent className={classes.dialogContent}>
							<DialogHeader style={{ textAlign: 'center' }}>
								<DialogTitle>Delete Exercise</DialogTitle>
							</DialogHeader>
							<DialogBody
								className={classes.dialogBody}
								style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
							>
								<h6 className={classes.deleteTitle}>Are you sure you want to delete this exercise?</h6>
								<div className={classes.deleteButtons}>
									<button className={classes.cancelButton} onClick={handleCloseModal}>
										No
									</button>
									<button className={classes.confirmButton} onClick={handleDeleteConfirm}>
										Yes
									</button>
								</div>
							</DialogBody>
						</DialogContent>
					</DialogRoot>
				</>
			)}
		</li>
	)
}
