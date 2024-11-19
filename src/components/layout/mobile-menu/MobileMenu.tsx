import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from '@/components/ui/popover'

import { Menu } from 'lucide-react'

import Link from 'next/link'

import classes from './MobileMenu.module.scss'

export const MobileMenu = () => {
	return (
		<PopoverRoot>
			<PopoverTrigger display={{ base: 'block', md: 'none' }}>
				<Menu />
			</PopoverTrigger>
			<PopoverContent style={{ borderRadius: 20, width: 200 }}>
				<PopoverBody style={{ borderRadius: 20 }} className={classes.burgerBody}>
					<ul className={classes.navigationListMobile}>
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
				</PopoverBody>
			</PopoverContent>
		</PopoverRoot>
	)
}