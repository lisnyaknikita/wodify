import { getMonthBounds } from '@/shared/helpers/getMonthBounds'
import { ProgressAccordion } from './components/progress-accordion/ProgressAccordion'

import classes from './progress-page.module.scss'

export default function ProgressPage() {
	const { startDate, endDate } = getMonthBounds()

	return (
		<main className={classes.main}>
			<div className={classes.container}>
				<ProgressAccordion startDate={startDate} endDate={endDate} />
			</div>
		</main>
	)
}
