import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

export const useGetNoteById = (noteId: Id<'notes'> | string | string[]) => {
	//@ts-expect-error ...
	const data = useQuery(api.notes.getNoteById, { noteId })
	const isLoading = data === undefined

	return { data, isLoading }
}
