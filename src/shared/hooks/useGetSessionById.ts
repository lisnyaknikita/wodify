import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

interface UseGetSessionByIdProps {
	sessionId: Id<'sessions'>
}

export const useGetSessionById = ({ sessionId }: UseGetSessionByIdProps) => {
	const data = useQuery(api.sessions.getSessionById, { sessionId })
	const isLoading = data === undefined

	return { data, isLoading }
}
