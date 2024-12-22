import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

export const useGetNoteBySessionId = ({ sessionId }: { sessionId: Id<'sessions'> }) => {
	const data = useQuery(api.notes.getNoteBySessionId, { sessionId })
	const isLoading = data === undefined

	return { data, isLoading }
}
