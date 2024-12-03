import { ISession } from '../types/session'

interface IExerciseProgress {
	exercise: string
	sets: { actual: number; difference: number }
	reps: { actual: number; difference: number }
}

export const calculateProgress = (plan: ISession['plan'], completed: ISession['completed']): IExerciseProgress[] => {
	return completed?.map(completedExercise => {
		const plannedExercise = plan.find(planExercise => planExercise.exercise === completedExercise.exercise)

		const setsDifference = plannedExercise ? completedExercise.sets - plannedExercise.sets : 0
		const repsDifference = plannedExercise ? completedExercise.reps - plannedExercise.reps : 0

		return {
			exercise: completedExercise.exercise,
			sets: {
				actual: completedExercise.sets,
				difference: setsDifference,
			},
			reps: {
				actual: completedExercise.reps,
				difference: repsDifference,
			},
		}
	})
}
