'use client'

import { useGetSession } from '@/shared/useGetSession'
import { HomeCalendar } from './components/home-calendar/HomeCalendar'
import { LastNote } from './components/last-note/LastNote'
import { LastTrainingSession } from './components/last-training-session/LastTrainingSession'

import classes from './home-page.module.scss'

export default function HomePage() {
	const session = useGetSession({ date: '2024-11-30' })

	console.log(session)

	return (
		<main className={classes.main}>
			<div className={classes.container}>
				<HomeCalendar />
				<section className={classes.footerSection}>
					<LastTrainingSession />
					<LastNote />
				</section>
			</div>
		</main>
	)
}
