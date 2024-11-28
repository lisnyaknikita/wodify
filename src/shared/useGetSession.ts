import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

interface IUseGetSessionProps {
	date: string
}

export const useGetSession = ({ date }: IUseGetSessionProps) => {
	const data = useQuery(api.sessions.getSessionByDate, { date })

	const isLoading = data === undefined

	return { data, isLoading }
}
