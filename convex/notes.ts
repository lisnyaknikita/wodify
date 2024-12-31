import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { auth } from './auth'

export const getNoteBySessionId = query({
	args: { sessionId: v.id('sessions') },
	handler: async (ctx, { sessionId }) => {
		const userId = await auth.getUserId(ctx)

		if (!userId) {
			throw new Error('User is not authenticated')
		}

		const note = await ctx.db
			.query('notes')
			.withIndex('by_session_id', q => q.eq('sessionId', sessionId))
			.unique()

		if (!note) {
			return null
		}

		if (note.userId !== userId) {
			throw new Error('Unauthorized access')
		}

		return note
	},
})

export const getNoteById = query({
	args: { noteId: v.id('notes') },
	handler: async (ctx, { noteId }) => {
		const userId = await auth.getUserId(ctx)

		if (!userId) {
			throw new Error('User is not authenticated')
		}

		const note = await ctx.db.get(noteId)

		if (!note || note.userId !== userId) {
			throw new Error('Unauthorized access or note not found')
		}

		return note
	},
})

export const getLastNotes = query({
	handler: async ctx => {
		const userId = await auth.getUserId(ctx)

		if (!userId) {
			throw new Error('User is not authenticated')
		}

		const notes = await ctx.db
			.query('notes')
			.withIndex('by_user_id', q => q.eq('userId', userId))
			.order('desc')
			.take(10)

		return notes
	},
})

export const getLastNote = query({
	handler: async ctx => {
		const userId = await auth.getUserId(ctx)

		if (!userId) {
			return null
		}

		const lastNote = await ctx.db
			.query('notes')
			.withIndex('by_user_id', q => q.eq('userId', userId))
			.order('desc')
			.first()

		return lastNote || null
	},
})

export const updateNote = mutation({
	args: {
		noteId: v.id('notes'),
		content: v.string(),
	},
	handler: async (ctx, { noteId, content }) => {
		const note = await ctx.db.get(noteId)

		if (!note) {
			throw new Error('Note not found')
		}

		await ctx.db.patch(noteId, { content })
	},
})
