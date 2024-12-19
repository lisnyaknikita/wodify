import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGetSessionExercises = (sessionId: any) => {
	return useQuery(api.sessions.getSessionExercises, { sessionId })
}
