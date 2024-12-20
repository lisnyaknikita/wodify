import { authTables } from '@convex-dev/auth/server'
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

const schema = defineSchema({
	...authTables,
	sessions: defineTable({
		title: v.string(),
		userId: v.id('users'),
		date: v.string(),
		plan: v.array(
			v.object({
				exercise: v.string(),
				sets: v.number(),
				reps: v.number(),
				weight: v.number(),
			})
		),
		completed: v.array(
			v.object({
				exercise: v.string(),
				sets: v.number(),
				reps: v.number(),
				weight: v.number(),
			})
		),
	})
		.index('by_date', ['date'])
		.index('by_user_id', ['userId'])
		.index('by_user_id_date', ['userId', 'date']),
	notes: defineTable({
		content: v.string(),
		title: v.string(),
		date: v.string(),
		userId: v.id('users'),
		sessionId: v.id('sessions'),
	})
		.index('by_user_id_date', ['userId', 'date'])
		.index('by_user_id', ['userId'])
		.index('by_session_id', ['sessionId']),
})

export default schema
