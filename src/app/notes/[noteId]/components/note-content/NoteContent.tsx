import { useGetNoteById } from '@/shared/hooks/useGetNoteById'
import { format, parseISO } from 'date-fns'
import { Loader } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { useUpdateNote } from '@/shared/hooks/useUpdateNote'
import classes from './NoteContent.module.scss'

export const NoteContent = () => {
	const { noteId } = useParams()
	const { data, isLoading } = useGetNoteById(noteId)

	const updateNote = useUpdateNote()

	const [editMode, setEditMode] = useState(false)
	const [noteContent, setNoteContent] = useState('')
	const [isSaving, setIsSaving] = useState(false)

	if (isLoading) {
		return (
			<div className={classes.noteContent}>
				<Loader className='loader' />
			</div>
		)
	}

	const handleSave = async () => {
		if (!noteId || !noteContent.trim()) return

		setIsSaving(true)
		try {
			await updateNote({
				noteId,
				content: noteContent.trim(),
			})
			setEditMode(false)
		} catch (error) {
			console.error('Failed to update note:', error)
		} finally {
			setIsSaving(false)
		}
	}

	const handleCancel = () => {
		setNoteContent(data?.content || '')
		setEditMode(false)
	}

	if (isLoading) {
		return (
			<div className={classes.noteContent}>
				<Loader className='loader' />
			</div>
		)
	}

	if (!data) {
		return (
			<div className={classes.noteContent} style={{ color: 'red' }}>
				Something went wrong
			</div>
		)
	}

	return (
		<div className={classes.noteContent}>
			<h3 className={classes.noteTitle}>
				{data?.title}({format(parseISO(data?.date), 'MMMM, dd')})
			</h3>
			{editMode ? (
				<div className={classes.editMode}>
					<textarea
						className={classes.noteTextArea}
						value={noteContent}
						onChange={e => setNoteContent(e.target.value)}
						onKeyDown={e => {
							if (e.key === 'Escape') handleCancel()
						}}
						autoFocus
					/>
					<div className={classes.actions}>
						<button className={classes.saveButton} onClick={handleSave} disabled={isSaving}>
							{isSaving ? 'Saving...' : 'Save'}
						</button>
						<button className={classes.cancelButton} onClick={handleCancel} disabled={isSaving}>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<p
					className={classes.noteText}
					onClick={() => {
						setEditMode(true)
						setNoteContent(data.content)
					}}
					style={{ whiteSpace: 'pre-wrap' }}
				>
					{data.content || 'Click to add content...'}
				</p>
			)}
		</div>
	)
}
