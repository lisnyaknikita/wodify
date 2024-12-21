'use client'
import Link from 'next/link'

import { useGetLastNotes } from '@/shared/hooks/useGetLastNotes'
import classes from './NavigationList.module.scss'

export const NavigationList = () => {
	const { data } = useGetLastNotes()

	return (
		<ul className={classes.navigationList}>
			<li className={classes.navigationItem}>
				<Link className={classes.navigationLink} href={'/home'}>
					Home
				</Link>
			</li>
			<li className={classes.navigationItem}>
				<Link className={classes.navigationLink} href={'/week'}>
					Weekly plan
				</Link>
			</li>
			<li className={classes.navigationItem}>
				<Link className={classes.navigationLink} href={`/notes/${data[0]._id}`}>
					Notes
				</Link>
			</li>
			<li className={classes.navigationItem}>
				<Link className={classes.navigationLink} href={'/progress'}>
					Progress
				</Link>
			</li>
		</ul>
	)
}
