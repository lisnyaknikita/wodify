'use client'

import { HomeCalendar } from './components/home-calendar/HomeCalendar'
import { LastNote } from './components/last-note/LastNote'
import { LastTrainingSession } from './components/last-training-session/LastTrainingSession'

import { useGetLastSession } from '@/shared/hooks/useGetLastSession'

import classes from './home-page.module.scss'

export default function HomePage() {
	const lastSession = useGetLastSession()

	return (
		<main className={classes.main}>
			<div className={classes.container}>
				<HomeCalendar />
				<section className={classes.footerSection}>
					<LastTrainingSession lastSession={lastSession} />
					<LastNote lastSession={lastSession} />
				</section>
			</div>
		</main>
	)
}
