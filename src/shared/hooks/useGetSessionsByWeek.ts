import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

interface IUseGetSessionsByWeekProps {
	startDate: string
	endDate: string
}

export const useGetSessionsByWeek = ({ startDate, endDate }: IUseGetSessionsByWeekProps) => {
	const data = useQuery(api.sessions.getSessionsByWeek, { startDate, endDate })

	const isLoading = data === undefined

	return { data, isLoading }
}
