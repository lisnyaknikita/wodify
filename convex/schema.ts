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
		note: v.object({
			id: v.string(),
			content: v.string(),
		}),
	})
		.index('by_date', ['date'])
		.index('by_user_id', ['userId'])
		.index('by_user_id_date', ['userId', 'date']),
})

export default schema
