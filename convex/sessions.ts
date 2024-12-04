import { v } from 'convex/values'
import { query } from './_generated/server'
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
