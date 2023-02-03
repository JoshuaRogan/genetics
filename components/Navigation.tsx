import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import NavigationBar from '../styles/navigation/NavigationBar';
import NavigationList from '../styles/navigation/NavigationList';
import { useRouter } from 'next/router';

const NavigationItems = styled.div`
	display: ${(props) => (props.isOpen ? 'block' : 'none')};
	background-color: ${(props) => props.theme.colors.background};

	@media ${(props) => props.theme._mq.TABLET} {
		display: flex;
		width: 100%;
		justify-content: space-between;
		background-color: transparent;
	}
`;

const MenuIconBar = styled.span`
	display: block;
	width: 100%;
	height: 2px;
	background-color: #fff;
`;

export default function Navigation() {
	const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
	const router = useRouter();

	const onMenuNavigationClicked = () => {
		setMobileNavOpen(!mobileNavOpen);
	};

	return (
		<NavigationBar>
			<NavigationBar.Container>
				<NavigationBar.Header>
					<Link href={'/'}>
						<Image src="/images/logo.png" width={60} height={25} alt="Logo from the Population Genetics Simulator" />
					</Link>
					<NavigationBar.HeaderButton
						type="button"
						data-toggle="collapse"
						onClick={onMenuNavigationClicked}
						aria-label="Toggles navigation menu on mobile"
					>
						<MenuIconBar />
						<MenuIconBar />
						<MenuIconBar />
					</NavigationBar.HeaderButton>
				</NavigationBar.Header>
				<NavigationItems isOpen={mobileNavOpen}>
					<NavigationList>
						<NavigationList.Item isActive={router.pathname === '/individual'}>
							<Link href={'/individual'}>Individual Simulations</Link>
						</NavigationList.Item>
						<NavigationList.Item isActive={router.pathname === '/replicated'}>
							<Link href={'/replicated'}>Replicated Simulations</Link>
						</NavigationList.Item>
					</NavigationList>
				</NavigationItems>
			</NavigationBar.Container>
		</NavigationBar>
	);
}
