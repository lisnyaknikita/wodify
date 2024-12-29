export const calculatePlanSummary = (plan: { exercise: string; sets: number; reps: number }[]) => {
	const totalExercises = plan.length
	const totalSets = plan.reduce((sum, item) => sum + item.sets, 0)
	const totalReps = plan.reduce((sum, item) => sum + item.sets * item.reps, 0)

	return { totalExercises, totalSets, totalReps }
}
