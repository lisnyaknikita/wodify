import { ISession } from '@/shared/types/session'

import { Loader } from 'lucide-react'

import { calculateProgress } from '@/shared/helpers/calculateProgress'

import classes from './LastTrainingSession.module.scss'

interface ILastTrainingSessionProps {
	lastSession: { data: ISession | null | undefined; isLoading: boolean }
}

export const LastTrainingSession = ({ lastSession }: ILastTrainingSessionProps) => {
	if (lastSession.isLoading) {
		return (
			<div className={classes.lastTrainingSessionBoard}>
				<Loader className='loader' />
			</div>
		)
	}

	if (!lastSession.data) {
		return <div className={classes.lastTrainingSessionBoard}>No session data available</div>
	}

	const progress = calculateProgress(lastSession!.data!.plan, lastSession!.data!.completed)

	return (
		<div className={classes.lastTrainingSessionBoard}>
			<div className={classes.boardHeader}>
				<div className={classes.headerColExercise}>Exercise</div>
				<div className={classes.headerColSets}>Sets</div>
				<div className={classes.headerColReps}>Repetitions</div>
			</div>
			<ul className={classes.boardExercises}>
				{progress?.map(({ exercise, sets, reps }) => (
					<li className={classes.boardExercise} key={exercise}>
						<div className={classes.exerciseName}>{exercise}</div>
						<div className={classes.exerciseSets}>
							{sets.actual} ({sets.difference >= 0 ? `+${sets.difference}` : sets.difference})
						</div>
						<div className={classes.exerciseReps}>
							{reps.actual} ({reps.difference >= 0 ? `+${reps.difference}` : reps.difference})
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
