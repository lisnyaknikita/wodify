import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export const useGetLastNote = () => {
	const data = useQuery(api.notes.getLastNote)
	const isLoading = data === undefined

	return { data, isLoading }
}
