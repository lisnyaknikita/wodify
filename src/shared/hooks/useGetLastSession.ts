import { useQuery } from 'convex/react'

import { api } from '../../../convex/_generated/api'

export const useGetLastSession = () => {
	const data = useQuery(api.sessions.getLastSession)

	const isLoading = data === undefined

	return { data, isLoading }
}
