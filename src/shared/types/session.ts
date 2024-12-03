import { Id } from '../../../convex/_generated/dataModel'

export interface ISession {
	_id: Id<'sessions'>
	_creationTime: number
	date: string
	title: string
	userId: Id<'users'>
	plan: {
		exercise: string
		sets: number
		reps: number
		weight: number
	}[]
	completed: {
		exercise: string
		sets: number
		reps: number
		weight: number
	}[]
	note: {
		id: string
		content: string
	}
}
