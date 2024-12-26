import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export const useGetCompletedExercisesByMonth = (startDate: string, endDate: string) => {
	const data = useQuery(api.sessions.getCompletedExercisesByMonth, { startDate, endDate })?.sort((a, b) =>
		a.exercise.localeCompare(b.exercise)
	)
	const isLoading = data === undefined

	return { data, isLoading }
}
