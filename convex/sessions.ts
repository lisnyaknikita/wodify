import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { auth } from './auth'

export const getSessionByDate = query({
	args: { date: v.string() },
	handler: async (ctx, args) => {
		const userId = await auth.getUserId(ctx)

		if (!userId) {
			return null
		}

		const session = await ctx.db
			.query('sessions')
			.withIndex('by_user_id_date', q => q.eq('userId', userId).eq('date', args.date))
			.unique()

		return session || null
	},
})

export const getSessionById = query({
	args: { sessionId: v.id('sessions') },
	handler: async (ctx, args) => {
		const userId = await auth.getUserId(ctx)
		if (!userId) {
			return null
		}

		const session = await ctx.db.get(args.sessionId)

		if (session?.userId !== userId) {
			throw new Error('Unauthorized access')
		}

		return session
	},
})

export const getSessionsByWeek = query({
	args: { startDate: v.string(), endDate: v.string() },
	handler: async (ctx, args) => {
		const userId = await auth.getUserId(ctx)

		if (!userId) {
			return []
		}

		const sessions = await ctx.db
			.query('sessions')
			.withIndex('by_user_id_date', q => q.eq('userId', userId).gte('date', args.startDate).lte('date', args.endDate))
			.collect()

		return sessions
	},
})

export const getLastSession = query({
	handler: async ctx => {
		const userId = await auth.getUserId(ctx)

		if (!userId) {
			return null
		}

		const today = new Date().toISOString().split('T')[0]

		const lastSession = await ctx.db
			.query('sessions')
			.withIndex('by_user_id_date', q => q.eq('userId', userId).lt('date', today))
			.order('desc')
			.first()

		return lastSession || null
	},
})

export const getSessionExercises = query({
	args: { sessionId: v.id('sessions') },
	handler: async (ctx, { sessionId }) => {
		const session = await ctx.db.get(sessionId)

		if (!session) {
			throw new Error('Session not found')
		}

		return {
			plan: session.plan || [],
			completed: session.completed || [],
		}
	},
})

export const createSession = mutation({
	args: { date: v.string(), title: v.string() },
	handler: async (ctx, args) => {
		const userId = await auth.getUserId(ctx)

		if (!userId) {
			throw new Error('User is not authenticated')
		}

		const sessionId = await ctx.db.insert('sessions', {
			date: args.date,
			title: args.title,
			userId: userId,
			plan: [],
			completed: [],
			note: { id: '', content: '' },
		})

		return sessionId
	},
})

export const addExercise = mutation({
	args: {
		sessionId: v.id('sessions'),
		exercise: v.string(),
		sets: v.number(),
		reps: v.number(),
		weight: v.number(),
	},
	handler: async (ctx, { sessionId, exercise, sets, reps, weight }) => {
		const session = await ctx.db.get(sessionId)
		if (!session) {
			throw new Error('Session not found')
		}

		const newExercise = { exercise, sets, reps, weight }

		const updatedPlanned = [...(session.plan || []), newExercise]
		const updatedCompleted = [...(session.completed || []), newExercise]

		await ctx.db.patch(sessionId, { plan: updatedPlanned, completed: updatedCompleted })

		return { success: true }
	},
})

export const updateExerciseValues = mutation({
	args: {
		sessionId: v.id('sessions'),
		exerciseIndex: v.number(),
		mode: v.string(),
		weight: v.optional(v.number()),
		sets: v.optional(v.number()),
		reps: v.optional(v.number()),
	},
	handler: async (ctx, { sessionId, exerciseIndex, mode, weight, sets, reps }) => {
		const session = await ctx.db.get(sessionId)
		if (!session) {
			throw new Error('Session not found')
		}

		const updatedPlan = [...(session.plan || [])]
		const updatedCompleted = [...(session.completed || [])]

		if (mode === 'planned') {
			if (updatedPlan[exerciseIndex]) {
				if (weight !== undefined) updatedPlan[exerciseIndex].weight = weight
				if (sets !== undefined) updatedPlan[exerciseIndex].sets = sets
				if (reps !== undefined) updatedPlan[exerciseIndex].reps = reps
			}

			if (updatedCompleted[exerciseIndex]) {
				const completedExercise = updatedCompleted[exerciseIndex]

				if (
					completedExercise.weight === updatedPlan[exerciseIndex].weight &&
					completedExercise.sets === updatedPlan[exerciseIndex].sets &&
					completedExercise.reps === updatedPlan[exerciseIndex].reps
				) {
					updatedCompleted[exerciseIndex] = { ...updatedPlan[exerciseIndex] }
				}
			}
		} else if (mode === 'completed') {
			if (updatedCompleted[exerciseIndex]) {
				if (weight !== undefined) updatedCompleted[exerciseIndex].weight = weight
				if (sets !== undefined) updatedCompleted[exerciseIndex].sets = sets
				if (reps !== undefined) updatedCompleted[exerciseIndex].reps = reps
			}
		}

		await ctx.db.patch(sessionId, { plan: updatedPlan, completed: updatedCompleted })

		return { success: true }
	},
})

export const deleteExercise = mutation({
	args: {
		sessionId: v.id('sessions'),
		exerciseIndex: v.number(),
	},
	handler: async (ctx, { sessionId, exerciseIndex }) => {
		const session = await ctx.db.get(sessionId)

		if (!session) {
			throw new Error('Session not found')
		}

		const updatedPlan = session.plan.filter((_, index) => index !== exerciseIndex)

		const updatedCompleted = session.completed.filter((_, index) => index !== exerciseIndex)

		await ctx.db.patch(sessionId, { plan: updatedPlan, completed: updatedCompleted })

		return { success: true }
	},
})
