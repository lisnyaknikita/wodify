'use client'

import { useState } from 'react'

import { NoteContent } from './components/note-content/NoteContent'
import { NoteList } from './components/note-list/NoteList'

import { Button } from '@/components/ui/button'
import {
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerRoot,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Menu } from 'lucide-react'

import { useIsMobile } from '@/shared/hooks/useIsMobile'

import classes from './notes.module.scss'

export default function NotesPage() {
	const [open, setOpen] = useState(false)

	const isMobile = useIsMobile()
	//TODO: fetch notes list(gpt)
	return (
		<main className={classes.main}>
			<div className={classes.container}>
				<div className={classes.inner}>
					{isMobile ? (
						<>
							<DrawerRoot open={open} onOpenChange={e => setOpen(e.open)} placement={'start'}>
								<DrawerBackdrop />
								<DrawerTrigger asChild>
									<Button className={classes.drawerOpenButton}>
										<Menu />
									</Button>
								</DrawerTrigger>
								<DrawerContent className={classes.drawerInner}>
									<DrawerHeader className={classes.drawerHeader}>
										<DrawerTitle>Notes</DrawerTitle>
									</DrawerHeader>
									<DrawerBody>
										<NoteList />
									</DrawerBody>
									<DrawerCloseTrigger color={'#110b05'} />
								</DrawerContent>
							</DrawerRoot>
						</>
					) : (
						<NoteList />
					)}
					<NoteContent />
				</div>
			</div>
		</main>
	)
}
