import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export const useGetLastNotes = () => {
	const data = useQuery(api.notes.getLastNotes)
	const isLoading = data === undefined

	return { data, isLoading }
}
