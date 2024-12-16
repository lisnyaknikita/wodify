export interface IExercise {
	exercise: string
	reps: number
	sets: number
	weight: number
}

export interface IProgressExercise {
	exercise: string
	reps: { actual: number; difference: number }
	sets: { actual: number; difference: number }
	weight: { actual: number; difference: number }
}
