import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export const useAddExercise = () => {
	const addExercise = useMutation(api.sessions.addExercise)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return async ({ sessionId, exercise, sets, reps, weight }: any) => {
		await addExercise({ sessionId, exercise, sets, reps, weight })
	}
}
