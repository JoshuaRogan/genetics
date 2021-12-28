import OptionsSection from '../components/OptionsSection';
import styled from 'styled-components';
import IndexPage from '../components/wrapper';
import HighChart from '../components/highChart';

const NavBarWrapper = styled.div`
	background: red;
	height: 50px;
`;

const Nav = styled.nav`
	background-color: ${(props) => props.theme.backgroundColor};
	padding-left: 30px;
	padding-right: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Logo = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LogoImage = styled.img`
	max-height: 50px;
`;

const NavList = styled.ul`
	list-style: none;
	display: flex;
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

function HomePage() {
	return (
		<IndexPage>
			<NavBarWrapper>
				<Nav className="navbar">
					<LeftSection>
						<Logo href="https://freecodecamp.org" className="logo">
							<LogoImage src="https://eloquent-williams-76e898.netlify.app/logo.png" alt="freeCodeCamp logo" />
						</Logo>
						<ApplicationList>
							<NavItem>
								<NavLink href="#">Allele</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#">Genotype</NavLink>
							</NavItem>
						</ApplicationList>
					</LeftSection>

					<RightSection>
						<NavList className="nav-links">
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
					</RightSection>
				</Nav>
			</NavBarWrapper>

			<h2>Accessibility Page Test</h2>

			<HighChart />

			<OptionsSection isActive={true}></OptionsSection>
		</IndexPage>
	);
}

export default HomePage;
