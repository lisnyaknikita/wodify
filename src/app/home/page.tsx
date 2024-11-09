'use client'

import { useCurrentUser } from '@/features/auth/hooks/use-current-user'

import { useAuthActions } from '@convex-dev/auth/react'

import { Loader } from 'lucide-react'

export default function HomePage() {
	const { signOut } = useAuthActions()

	const { data, isLoading } = useCurrentUser()

	if (isLoading) return <Loader />

	return (
		<div>
			Hello, {data?.name}
			<button onClick={() => void signOut()}>Logout</button>
		</div>
	)
}
