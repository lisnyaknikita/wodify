import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

export const useUpdateNote = () => {
	const updateNote = useMutation(api.notes.updateNote)

	return async ({ noteId, content }: { noteId: Id<'notes'>; content: string }) => {
		try {
			await updateNote({ noteId, content })
		} catch (error) {
			console.error('Error updating note:', error)
			throw error
		}
	}
}
