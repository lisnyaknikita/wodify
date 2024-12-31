'use client'
import Link from 'next/link'

import { useGetLastNotes } from '@/shared/hooks/useGetLastNotes'
import { usePathname } from 'next/navigation'

import classes from './NavigationList.module.scss'

export const NavigationList = () => {
	const { data } = useGetLastNotes()
	const pathName = usePathname()

	return (
		<ul className={classes.navigationList}>
			<li className={classes.navigationItem}>
				<Link className={`${classes.navigationLink} ${pathName.includes('/home') ? 'active' : ''}`} href={'/home'}>
					Home
				</Link>
			</li>
			<li className={classes.navigationItem}>
				<Link className={`${classes.navigationLink} ${pathName.includes('/week') ? 'active' : ''}`} href={'/week'}>
					Weekly plan
				</Link>
			</li>
			{data && data[0]?._id ? (
				<li className={classes.navigationItem}>
					<Link
						className={`${classes.navigationLink} ${pathName.includes('/note') ? 'active' : ''}`}
						href={`/notes/${data[0]._id}`}
					>
						Notes
					</Link>
				</li>
			) : null}
			<li className={classes.navigationItem}>
				<Link
					className={`${classes.navigationLink} ${pathName.includes('/progress') ? 'active' : ''}`}
					href={'/progress'}
				>
					Progress
				</Link>
			</li>
		</ul>
	)
}
