import { getWorker, listenToWorker } from '../workers/generationWorker';
import { ApplicationContext } from '../context/application';
import FinitePopulation from '../components/optionSections/FinitePopulation';
import BaseSimulation from '../components/optionSections/BaseSimulation';
import OptionsSection from './OptionsSection';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import IndexPage from './wrapper';
import HighChart from './highChart';
import debounce from 'debounce';

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

const Pre = styled.pre`
  max-width: 100%;
  overflow: scroll;
  background: rgba(123, 133, 120, 0.07);
  padding: 15px;
  margin-bottom: 200px;
  border-radius: 4px;
`

function HomePage() {
	const context = React.useContext(ApplicationContext);
	const [lastResult, setLastResult] = React.useState({});


	React.useEffect(() => {
		listenToWorker((event) => {
			console.log(event);
			setLastResult(event);
			context.setLastResult(event);
		});
	}, [])


	// bootstrap
	React.useEffect(() => {
		const worker = getWorker();

		if (!worker) {
			console.error('no worker');
			return;
		}


		console.log(context.popGenVars.p);
		worker.postMessage({"cmd":"initGeneration",
				"populationSize": context.popGenVars.N,
				"numGenerations": context.popGenVars.t,
				"startingFrequency": context.popGenVars.p}); // Send data to our worker.
		worker.postMessage({ cmd: 'run' });

		// Set Vars based on the context
		// worker.postMessage({'cmd':'setVar', 'varName': 'selection-W', 'wAA': wAA, 'wAa': wAa, 'waa': waa});
	}, [context.popGenVars]);


	const onChange = debounce((name, newValue) => {
		context.setPopGenVar(name, newValue); // bubble up changes for the backend
	}, 100 );

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
			<HighChart line={context.lastResult}/>
			<h2>Simulation Parameters </h2>

			<BaseSimulation isActive={true} name={'Base Simulation Model'} onChange={onChange} />
			<FinitePopulation isActive={true} name={'Finite Population'} onChange={onChange} />

			<Pre>
				<h4>Inputs (Debugging Purposes)</h4>
				{JSON.stringify(context.popGenVars)}

				<h4>Outputs</h4>
				{JSON.stringify(lastResult)}
			</Pre>


		</IndexPage>
	);
}

export default HomePage;
