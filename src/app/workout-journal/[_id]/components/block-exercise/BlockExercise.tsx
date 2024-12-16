'use client'

import { DialogBody, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { IExercise, IProgressExercise } from '@/shared/types/exercise'
import { useState } from 'react'
import classes from './BlockExercise.module.scss'

interface IBlockExerciseProps {
	mode: 'planned' | 'completed'
	data: IExercise | IProgressExercise
}

export const BlockExercise = ({ mode, data }: IBlockExerciseProps) => {
	const formatDifference = (difference: number) => (difference > 0 ? `+${difference}` : difference.toString())

	const [isModalOpen, setModalOpen] = useState(false)
	const [inputValue, setInputValue] = useState('')

	const handleSaveValue = () => {
		setModalOpen(false)
	}

	return (
		<li className={classes.blockExercise}>
			<div className={classes.exerciseName}>{data.exercise}</div>
			<div className={classes.exerciseWeight}>
				{mode === 'completed' && typeof data.weight === 'object' && 'actual' in data.weight ? (
					<>
						<DialogRoot placement={'center'}>
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
											if (e.key === 'Enter') handleSaveValue()
										}}
										autoFocus
									/>
								</DialogBody>
							</DialogContent>
						</DialogRoot>
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
											if (e.key === 'Enter') handleSaveValue()
										}}
										autoFocus
									/>
								</DialogBody>
							</DialogContent>
						</DialogRoot>
					</>
				) : (
					<input type='number' defaultValue={typeof data.sets === 'number' ? data.sets : ''} />
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
											if (e.key === 'Enter') handleSaveValue()
										}}
										autoFocus
									/>
								</DialogBody>
							</DialogContent>
						</DialogRoot>
					</>
				) : (
					<input type='number' defaultValue={typeof data.reps === 'number' ? data.reps : ''} />
				)}
			</div>
		</li>
	)
}
