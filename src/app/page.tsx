'use client'

import { useCurrentUser } from '@/features/auth/hooks/use-current-user'

import { Loader } from 'lucide-react'

import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

export default function Home() {
	const router = useRouter()

	const { data, isLoading } = useCurrentUser()

	useEffect(() => {
		if (!isLoading) {
			if (data) {
				router.replace('/home')
			} else {
				router.replace('/auth')
			}
		}
	}, [data, isLoading, router])

	return isLoading ? <Loader className='loader' /> : null
}
