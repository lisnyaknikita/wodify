import { Provider } from '@/components/ui/provider'

import Image from 'next/image'
import Link from 'next/link'

import { MobileMenu } from '../../components/layout/mobile-menu/MobileMenu'
import { NavigationList } from '../../components/layout/navigation-list/NavigationList'
import { Profile } from '../../components/layout/profile/Profile'

import classes from './weekly-page.module.scss'

export default function WeeklyLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Provider>
			<div className={classes.wrapper}>
				<header className={classes.header}>
					<Link href={'/'}>
						<Image className={classes.logo} src={'/logo.svg'} alt='logo' width={75} height={69} />
					</Link>
					<MobileMenu />
					<NavigationList />
					<Profile />
				</header>
				{children}
			</div>
		</Provider>
	)
}
