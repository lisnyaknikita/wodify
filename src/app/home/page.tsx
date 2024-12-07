'use client'

import { useGetSession } from '@/shared/hooks/useGetSession'

import { HomeCalendar } from './components/home-calendar/HomeCalendar'
import { LastNote } from './components/last-note/LastNote'
import { LastTrainingSession } from './components/last-training-session/LastTrainingSession'

import classes from './home-page.module.scss'

export default function HomePage() {
	const session = useGetSession({ date: '2024-11-30' })

	return (
		<main className={classes.main}>
			<div className={classes.container}>
				<HomeCalendar />
				<section className={classes.footerSection}>
					<LastTrainingSession lastSession={session} />
					<LastNote lastSession={session} />
				</section>
			</div>
		</main>
	)
}
