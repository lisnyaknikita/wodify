'use client'

import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from '@/components/ui/accordion'

import { calculateExerciseStats } from '@/shared/helpers/calculateExerciseStats'
import { useGetCompletedExercisesByMonth } from '@/shared/hooks/useGetCompletedExercisesByMonth'

import { Loader } from 'lucide-react'

import classes from './ProgressAccordion.module.scss'

export const ProgressAccordion = ({ startDate, endDate }: { startDate: string; endDate: string }) => {
	const { data, isLoading } = useGetCompletedExercisesByMonth(startDate, endDate)

	if (isLoading) {
		return <Loader className='loader' />
	}

	if (!data || data.length === 0) {
		return <p>No data found for this period</p>
	}

	const exerciseGroups = calculateExerciseStats(data)

	return (
		<AccordionRoot className={classes.rootAccordion} multiple variant={'enclosed'}>
			{exerciseGroups.map(stats => (
				<AccordionItem className={classes.accordionItem} key={stats.exercise} value={stats.exercise}>
					<AccordionItemTrigger className={classes.accordionTrigger}>{stats.exercise}</AccordionItemTrigger>
					<AccordionItemContent className={classes.accordionContent}>
						<table className={classes.statsTable}>
							<thead>
								<tr>
									<th className={classes.metric}>Metric</th>
									<th className={classes.value}>Value</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className={classes.metricValue}>Total sessions</td>
									<td className={classes.valueValue}>{stats.totalSessions}</td>
								</tr>
								<tr>
									<td className={classes.metricValue}>Total sets</td>
									<td className={classes.valueValue}>{stats.totalSets}</td>
								</tr>
								<tr>
									<td className={classes.metricValue}>Total reps</td>
									<td className={classes.valueValue}>{stats.totalReps}</td>
								</tr>
								<tr
									className={
										stats.weightChange > 0
											? classes.positiveChange
											: stats.weightChange === 0
												? classes.retention
												: classes.negativeChange
									}
								>
									<td className={classes.metricValue}>Weight change</td>
									<td className={classes.valueValue}>
										{`${stats.weightChange > 0 ? '+' : ''} ${stats.weightChange}`} kg
									</td>
								</tr>
								<tr
									className={
										stats.setsChange > 0
											? classes.positiveChange
											: stats.setsChange === 0
												? classes.retention
												: classes.negativeChange
									}
								>
									<td className={classes.metricValue}>Sets change</td>
									<td className={classes.valueValue}>{`${stats.setsChange > 0 ? '+' : ''} ${stats.setsChange}`}</td>
								</tr>
								<tr
									className={
										stats.repsChange > 0
											? classes.positiveChange
											: stats.repsChange === 0
												? classes.retention
												: classes.negativeChange
									}
								>
									<td className={classes.metricValue}>Reps change</td>
									<td className={classes.valueValue}>{`${stats.repsChange > 0 ? '+' : ''} ${stats.repsChange}`}</td>
								</tr>
							</tbody>
						</table>
					</AccordionItemContent>
				</AccordionItem>
			))}
		</AccordionRoot>
	)
}
