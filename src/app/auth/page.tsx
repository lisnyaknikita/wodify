'use client'

import { FaGoogle } from 'react-icons/fa6'

import { useAuthActions } from '@convex-dev/auth/react'

import classes from './auth-page.module.scss'

export default function AuthPage() {
	const { signIn } = useAuthActions()

	return (
		<div className={classes.wrapper}>
			<div className={classes.inner}>
				<h1 className={classes.title}>Welcome to Wodify!</h1>
				<button onClick={() => void signIn('google')} className={classes.googleButton}>
					<FaGoogle />
					<span>Sign in with Google</span>
				</button>
			</div>
		</div>
	)
}
