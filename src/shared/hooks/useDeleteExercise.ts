import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

export const useDeleteExercise = () => {
	const deleteExercise = useMutation(api.sessions.deleteExercise)

	const handleDelete = async ({ sessionId, exerciseIndex }: { sessionId: Id<'sessions'>; exerciseIndex: number }) => {
		try {
			await deleteExercise({ sessionId, exerciseIndex })
		} catch (error) {
			console.error('Error deleting exercise:', error)
		}
	}

	return handleDelete
}
