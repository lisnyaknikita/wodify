import Link from 'next/link'

import classes from './NavigationList.module.scss'

export const NavigationList = () => {
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
				<Link className={classes.navigationLink} href={'/notes'}>
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
