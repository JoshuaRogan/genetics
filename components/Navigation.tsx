import React from 'react';
import styled from 'styled-components';

const NavBarWrapper = styled.div`
	height: 50px;
`;

const Nav = styled.nav`
	background-color: ${(props) => props.theme.backgroundColor};
	padding-left: 30px;
	padding-right: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	max-width: 100%;
	overflow: hidden;

	@media ${(props) => props.theme._mq.tablet} {
	}
`;

const Logo = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LogoImage = styled.img`
	max-height: 30px;
`;

const NavList = styled.ul`
	list-style: none;
	display: flex;

	@media ${(props) => props.theme._mq.tablet} {
		flex-direction: column;
	}
`;

const ApplicationList = styled.ul`
	list-style: none;
	display: flex;
	align-self: flex-start;
`;

const NavItem = styled.li`
	&:hover {
		background-color: ${(props) => props.theme.primaryColor};

		a {
			color: white;
		}
	}
`;

const NavLink = styled.a`
	display: inline-block;
	padding: 10px 15px;
	text-decoration: none;
	color: ${(props) => props.theme.primaryColor};

	&:hover {
	}
`;

const LeftSection = styled.div`
	display: flex;
`;

const RightSection = styled.div`
	display: flex;
`;

const MobileNavigation = styled.div`
	display: none;
	background: white;
	width: 100%;
	min-height: 150px;
	z-index: 1;

	@media ${(props) => props.theme._mq.tablet} {
		display: ${(props) => (props.mobileNavOpen ? 'flex' : 'none')};
		position: absolute;
		top: 50px;
		left: 0;
		flex-direction: column;
	}
`;

const MobileMenuIcon = styled.div`
	display: none;

	@media ${(props) => props.theme._mq.tablet} {
		display: block;
	}

	&:hover {
		cursor: pointer;
	}
`;

const DesktopNavigation = styled.div`
	display: block;

	@media ${(props) => props.theme._mq.tablet} {
		display: none;
	}
`;

export default function Navigation() {
	const [mobileNavOpen, setIsMobileNavOpen] = React.useState(false);

	const onNavClick = () => {
		setIsMobileNavOpen(!mobileNavOpen);
	};

	return (
		<NavBarWrapper>
			<Nav className="navbar">
				<LeftSection>
					<Logo href="https://freecodecamp.org" className="logo">
						<LogoImage src="https://eloquent-williams-76e898.netlify.app/logo.png" alt="freeCodeCamp logo" />
					</Logo>
					<DesktopNavigation>
						<ApplicationList aria-label="Simulator Links">
							<NavItem>
								<NavLink href="#">Allele</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#">Genotype</NavLink>
							</NavItem>
						</ApplicationList>
					</DesktopNavigation>
				</LeftSection>

				<RightSection>
					<MobileMenuIcon onClick={onNavClick}> Menu </MobileMenuIcon>
					<DesktopNavigation>
						<NavList className="nav-links" aria-label="Additional Links">
							<NavItem>
								<NavLink href="#">About</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#">FAQ</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#">Contact</NavLink>
							</NavItem>
						</NavList>
					</DesktopNavigation>
				</RightSection>

				<MobileNavigation mobileNavOpen={mobileNavOpen}>
					<NavList className="nav-links" aria-label="Additional Links">
						<NavItem>
							<NavLink href="#">Allele</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#">Genotype</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#">About</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#">FAQ</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#">Contact</NavLink>
						</NavItem>
					</NavList>
				</MobileNavigation>
			</Nav>
		</NavBarWrapper>
	);
}