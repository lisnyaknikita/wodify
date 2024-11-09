import { Provider } from '@/components/ui/provider'

import Image from 'next/image'
import Link from 'next/link'

import { MobileMenu } from './components/mobile-menu/MobileMenu'
import { NavigationList } from './components/navigation-list/NavigationList'
import { Profile } from './components/profile/Profile'

import classes from './home-page.module.scss'

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Provider>
			<div className={classes.wrapper}>
				<div className={classes.header}>
					<Link href={'/'}>
						<Image className={classes.logo} src={'/logo.svg'} alt='logo' width={75} height={69} />
					</Link>
					<MobileMenu />
					<NavigationList />
					<Profile />
				</div>
				{children}
			</div>
		</Provider>
	)
}
