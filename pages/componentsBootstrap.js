import styled from 'styled-components';
import SliderOne from '../components/SliderOne';
import IndexPage from '../components/wrapper';
import HighChart from '../components/highChart';

const PaddedWrapper = styled.div`
	padding: 5px;
`;

const NavBarWrapper = styled.div`
	background: red;
`;

const Nav = styled.nav`
	width: 100%;
	background-color: darkgreen;
	padding-left: 30px;
	padding-right: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Logo = styled.a`
	display: inline-block;
`;

const NavList = styled.ul`
	list-style: none;
	display: flex;
`;

const NavItem = styled.li`
	&:hover {
		color: red;
		background: orange;
	}
`;

const NavLink = styled.a`
	display: inline-block;
	padding: 10px 15px;
	text-decoration: none;
	color: white;

	&:hover {
		color: red;
		background: red;
	}
`;

function HomePage() {
	return (
		<IndexPage>
			<NavBarWrapper>
				<Nav className="navbar">
					<Logo href="https://freecodecamp.org" className="logo">
						<img src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" alt="Genetics Logo" />
					</Logo>
					<NavList className="nav-links">
						<NavItem className="nav-item">
							<NavLink href="#">Curriculum</NavLink>
						</NavItem>
						<NavItem className="nav-item">
							<NavLink href="#">Forum</NavLink>
						</NavItem>
						<NavItem className="nav-item">
							<NavLink href="#">News</NavLink>
						</NavItem>
						<NavItem className="nav-item">
							<NavLink href="#">Sign in</NavLink>
						</NavItem>
					</NavList>
				</Nav>
			</NavBarWrapper>

			<h2>Accessibility Page Test</h2>

			<HighChart />
			<PaddedWrapper>
				<SliderOne label={'Number of generations'} name={'number-of-generations'} required />
			</PaddedWrapper>
		</IndexPage>
	);
}

export default HomePage;
