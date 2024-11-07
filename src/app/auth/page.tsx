import type { Metadata } from 'next'

import { FaGoogle } from 'react-icons/fa6'

import classes from './auth-page.module.scss'

export const metadata: Metadata = {
	title: 'Wodify | Sign in',
	description: 'Sign in by Google account',
}

export default function AuthPage() {
	return (
		<div className={classes.wrapper}>
			<div className={classes.inner}>
				<h1 className={classes.title}>Welcome to Wodify!</h1>
				<button className={classes.googleButton}>
					<FaGoogle />
					<span>Sign in with Google</span>
				</button>
			</div>
		</div>
	)
}
