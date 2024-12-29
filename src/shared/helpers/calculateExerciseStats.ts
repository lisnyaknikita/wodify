import { IExercise } from '../types/exercise'

interface ExerciseStats {
	exercise: string
	totalSessions: number
	totalSets: number
	totalReps: number
	weightChange: number
	setsChange: number
	repsChange: number
}

export const calculateExerciseStats = (exercises: IExercise[]): ExerciseStats[] => {
	const grouped = exercises.reduce(
		(acc, ex) => {
			if (!acc[ex.exercise]) {
				acc[ex.exercise] = []
			}
			acc[ex.exercise].push(ex)
			return acc
		},
		{} as Record<string, IExercise[]>
	)

	return Object.keys(grouped).map(exerciseName => {
		const exerciseData = grouped[exerciseName]
		const firstSession = exerciseData[0]
		const lastSession = exerciseData[exerciseData.length - 1]

		const totalSets = exerciseData.reduce((sum, ex) => sum + ex.sets, 0)
		const totalReps = exerciseData.reduce((sum, ex) => sum + ex.sets * ex.reps, 0)

		return {
			exercise: exerciseName,
			totalSessions: exerciseData.length,
			weightChange: lastSession.weight - firstSession.weight,
			setsChange: lastSession.sets - firstSession.sets,
			repsChange: lastSession.reps - firstSession.reps,
			totalSets,
			totalReps,
		}
	})
}
