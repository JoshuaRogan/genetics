import { VALID_SECTIONS } from '../data/popGenVariables';
import { DebugHeader, Pre } from '../utils/debugging';
import { getWorker, listenToWorker } from '../workers/generationWorker';
import { ApplicationContext } from '../context/application';
import FinitePopulation from '../components/optionSections/FinitePopulation';
import BaseSimulation from '../components/optionSections/BaseSimulation';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import IndexPage from './wrapper';
import HighChart from './highChart';
import debounce from 'debounce';

function HomePage() {
	const context = React.useContext(ApplicationContext);
	const [lastResult, setLastResult] = React.useState({});

	React.useEffect(() => {
		listenToWorker((event) => {
			// console.log(event);
			setLastResult(event);
			context.setLastResult(event);
		});
	}, []);

	// bootstrap
	React.useEffect(() => {
		const worker = getWorker();

		if (!worker) {
			console.error('no worker');
			return;
		}

		worker.postMessage({
			cmd: 'initGeneration',
			populationSize: context.popGenVars.N,
			numGenerations: context.popGenVars.t,
			startingFrequency: context.popGenVars.p,
		}); // Send data to our worker.

		if (!context.activeSections[VALID_SECTIONS.FINITE]) {
			worker.postMessage({ cmd: 'setVar', varName: 'inifinite-pop' });
		}

		// All Other Variables
		// worker.postMessage({'cmd':'setVar', 'varName': 'selection-W', 'wAA': .3, 'wAa': .2, 'waa': .5});
		// worker.postMessage({'cmd':'setVar', 'varName': 'selection-DS', 'selectionCoef': .3, 'dominaceCoef': .2});
		// worker.postMessage({'cmd':'setVar', 'varName': 'mutation', 'mu': .0003, 'nu': .003});
		// worker.postMessage({'cmd':'setVar', 'varName': 'migration', 'migrationRate': .145, 'migrantAlleleFreq': .333});
		// worker.postMessage({'cmd':'setVar', 'varName': 'inbreeding', 'inbreedCoef': .255});
		// worker.postMessage({'cmd':'setVar', 'varName': 'assortative-mating', 'matingFreq': .99});
		// worker.postMessage({'cmd':'setVar', 'varName': 'population-bottleneck', 'generationStart': 3, 'generationEnd': 50, 'newPopulationSize': 500});

		// Kick it off
		worker.postMessage({ cmd: 'run' });

		// Set Vars based on the context
		// worker.postMessage({'cmd':'setVar', 'varName': 'selection-W', 'wAA': wAA, 'wAa': wAa, 'waa': waa});
	}, [context.popGenVars, context.activeSections]);

	const onChange = debounce((name, newValue) => {
		context.setPopGenVar(name, newValue); // bubble up changes for the backend
	}, 100);

	const toggleActiveSection = (section) => {
		const currentState = context.activeSections[section];
		context.setActiveSession(section, !currentState);
	};

	return (
		<IndexPage>
			<main role="main">
				<h1>Simulator</h1>
				<HighChart line={context.lastResult} />
				<h2>Simulation Parameters </h2>
				<div role="form" aria-label="All simulator inputs">
					<BaseSimulation
						isActive={context.activeSections[VALID_SECTIONS.BASE]}
						name={'Base Simulation Model'}
						onChange={onChange}
						toggleActive={() => toggleActiveSection(VALID_SECTIONS.BASE)}
					/>
					<FinitePopulation
						isActive={context.activeSections[VALID_SECTIONS.FINITE]}
						name={'Finite Population'}
						onChange={onChange}
						toggleActive={() => toggleActiveSection(VALID_SECTIONS.FINITE)}
					/>
				</div>
			</main>

			<Pre role="figure" aria-label="Debugging information">
				<DebugHeader>Inputs (Debugging Purposes)</DebugHeader>
				{JSON.stringify(context.popGenVars)}

				<DebugHeader>Outputs</DebugHeader>
				{JSON.stringify(lastResult)}
			</Pre>
		</IndexPage>
	);
}

export default HomePage;
