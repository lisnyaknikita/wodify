'use client'

import { Avatar } from '@/components/ui/avatar'
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from '@/components/ui/popover'

import { useCurrentUser } from '@/features/auth/hooks/use-current-user'
import { useAuthActions } from '@convex-dev/auth/react'

import { Loader } from 'lucide-react'

import { useRouter } from 'next/navigation'
import classes from './Profile.module.scss'

export const Profile = () => {
	const { signOut } = useAuthActions()

	const { data, isLoading } = useCurrentUser()

	const router = useRouter()

	const handleLogout = async () => {
		await signOut()
		router.replace('/auth')
		window.location.href = '/auth'
	}

	if (isLoading) return <Loader />

	return (
		data && (
			<div className={classes.profile}>
				<PopoverRoot>
					<PopoverTrigger>
						<Avatar size={'xl'} src={data.image} />
					</PopoverTrigger>
					<PopoverContent style={{ borderRadius: 20 }} width={240}>
						<PopoverBody style={{ borderRadius: 20 }} className={classes.profileBody}>
							<Avatar src={data.image} size={'2xl'} style={{ marginBottom: 10 }} />
							<div className={classes.name}>{data.name}</div>
							<div className={classes.email}>
								<span>Email</span>
								<a href={`mailto:${data.email}`}>{data.email}</a>
							</div>
							<button onClick={handleLogout} className={classes.logoutButton}>
								Logout
							</button>
						</PopoverBody>
					</PopoverContent>
				</PopoverRoot>
			</div>
		)
	)
}
