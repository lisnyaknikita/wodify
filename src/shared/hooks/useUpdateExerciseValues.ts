import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

export const useUpdateExerciseValues = () => {
	const updateExerciseValues = useMutation(api.sessions.updateExerciseValues)

	const handleUpdate = async ({
		sessionId,
		exerciseIndex,
		mode,
		weight,
		sets,
		reps,
	}: {
		sessionId: Id<'sessions'>
		exerciseIndex: number
		mode: 'planned' | 'completed'
		weight?: number
		sets?: number
		reps?: number
	}) => {
		try {
			await updateExerciseValues({ sessionId, exerciseIndex, mode, weight, sets, reps })
		} catch (error) {
			console.error('Error updating exercise values:', error)
		}
	}

	return handleUpdate
}
