import LegendContainer from 'components/LegendContainer';
import AssortativeMating from '../components/optionSections/AssortativeMating';
import BottleNeckGenerations from '../components/optionSections/BottleNeckGenerations';
import Inbreeding from '../components/optionSections/Inbreeding';
import Migration from '../components/optionSections/Migration';
import { popGenVariables, VALID_SECTIONS } from '../data/popGenVariables';
import { DebugHeader, Pre } from '../utils/debugging';
import { getWorker, listenToWorker } from '../workers/generationWorker';
import { ApplicationContext } from 'context/application';
import FinitePopulation from '../components/optionSections/FinitePopulation';
import BaseSimulation from '../components/optionSections/BaseSimulation';
import Selection from '../components/optionSections/Selection';
import Mutation from '../components/optionSections/Mutation';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import IndexPage from './wrapper';
import HighChart from './highChart';

const ChartControls = styled.div`
	display: flex;
	justify-content: space-around;
`;

const DebugTitle = styled.h2`
	color: red;
`;

function HomePage() {
	const context = React.useContext(ApplicationContext);

	// This is interacting with an imperative API. Might need to remove the useEffect
	React.useEffect(() => {
		listenToWorker((event) => {
			console.log(event);
			context.addMoreResults(event); // Needs to be handled as it won't work if it's in the context
		});
	}, []);

	const updateChart = (isAllele = true) => {
		const worker = getWorker();

		if (!worker) {
			console.error('Error no worker');
			return;
		}

		const popGenVars = context.popGenVars;

		worker.postMessage({
			cmd: 'initGeneration',
			populationSize: popGenVars.N,
			numGenerations: context.popGenVars.t,
			startingFrequency: context.popGenVars.p,
		});

		// Inverse of finite being active to enable infinite population
		if (!context.activeSections[VALID_SECTIONS.FINITE]) {
			worker.postMessage({ cmd: 'setVar', varName: 'inifinite-pop' });
		}

		if (context.activeSections[VALID_SECTIONS.SELECTION]) {
			const message = {
				cmd: 'setVar',
				varName: 'selection-W',
				wAA: context.popGenVars.WAA,
				wAa: context.popGenVars.WAa,
				waa: context.popGenVars.Waa,
			};
			worker.postMessage(message);
			worker.postMessage({ cmd: 'setVar', varName: 'selection-DS', selectionCoef: 0, dominaceCoef: 1 });
		}

		if (context.activeSections[VALID_SECTIONS.MUTATION]) {
			const mu = popGenVars.mu * Math.pow(10, popGenVars['mu-exp']);
			const nu = popGenVars.nu * Math.pow(10, popGenVars['nu-exp']);

			worker.postMessage({ cmd: 'setVar', varName: 'mutation', mu: mu, nu: nu });
		}

		if (context.activeSections[VALID_SECTIONS.MIGRATION]) {
			worker.postMessage({
				cmd: 'setVar',
				varName: 'migration',
				migrationRate: popGenVars.m,
				migrantAlleleFreq: popGenVars.pm,
			});
		}

		if (context.activeSections[VALID_SECTIONS.INBREEDING]) {
			worker.postMessage({ cmd: 'setVar', varName: 'inbreeding', inbreedCoef: popGenVars.F });
		}

		if (context.activeSections[VALID_SECTIONS.ASSORT_MATING]) {
			worker.postMessage({ cmd: 'setVar', varName: 'assortative-mating', matingFreq: popGenVars.assortMating });
		}

		if (context.activeSections[VALID_SECTIONS.BOTTLENECK_GEN]) {
			worker.postMessage({
				cmd: 'setVar',
				varName: 'population-bottleneck',
				generationStart: popGenVars['gen-to-over-start'],
				generationEnd: popGenVars['gen-to-over-end'],
				newPopulationSize: popGenVars.Nb,
			});
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
	};

	const onChange = (name, newValue) => {
		console.debug(name, newValue);
		context.setPopGenVar(name, newValue); // bubble up changes for the backend
	};

	const toggleActiveSection = (section) => {
		const currentState = context.activeSections[section];
		context.setActiveSession(section, !currentState);
	};

	return (
		<IndexPage>
			<main role="main">
				<h1>Individual Simulator</h1>

				<h2>Simulation Settings </h2>
				<div role="form" aria-label="All simulator inputs">
					<section aria-label="Basic simulator settings">
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
						<Selection
							isActive={context.activeSections[VALID_SECTIONS.SELECTION]}
							name={'Selection'}
							onChange={onChange}
							toggleActive={() => toggleActiveSection(VALID_SECTIONS.SELECTION)}
						/>
						<Mutation
							isActive={context.activeSections[VALID_SECTIONS.MUTATION]}
							name={'Mutation'}
							onChange={onChange}
							toggleActive={() => toggleActiveSection(VALID_SECTIONS.MUTATION)}
						/>
						<Migration
							isActive={context.activeSections[VALID_SECTIONS.MIGRATION]}
							name={'Migration'}
							onChange={onChange}
							toggleActive={() => toggleActiveSection(VALID_SECTIONS.MIGRATION)}
						/>
						<Inbreeding
							isActive={context.activeSections[VALID_SECTIONS.INBREEDING]}
							name={'Inbreeding'}
							onChange={onChange}
							toggleActive={() => toggleActiveSection(VALID_SECTIONS.INBREEDING)}
						/>
						<AssortativeMating
							isActive={context.activeSections[VALID_SECTIONS.ASSORT_MATING]}
							name={'Assortative Mating'}
							onChange={onChange}
							toggleActive={() => toggleActiveSection(VALID_SECTIONS.ASSORT_MATING)}
						/>
						<BottleNeckGenerations
							isActive={context.activeSections[VALID_SECTIONS.BOTTLENECK_GEN]}
							name={'Bottleneck Generations'}
							onChange={onChange}
							toggleActive={() => toggleActiveSection(VALID_SECTIONS.BOTTLENECK_GEN)}
						/>
					</section>
					<section aria-label="Advanced simulator settings">
						<h3>Advanced Factors + </h3>
						<p>Add more sliders here</p>
					</section>
				</div>

				<ChartControls>
					<button
						onClick={() => {
							context.clearResults();
							updateChart();
						}}
					>
						Run Simulation
					</button>
					<button onClick={() => updateChart()}>Add as a new simulation (Allele only)</button>
				</ChartControls>

				<HighChart lines={context.alleleResults} title="Graph 1: Allele Frequency Change Over Generations" />
				<LegendContainer alleleResults={context.alleleResults} settings={context.settingResults} />

				<HighChart lines={context.genoTypeResults} title={'Graph 2: Genotype Frequency Change Over Generations'} />
				<LegendContainer
					alleleResults={context.alleleResults}
					genoTypeResults={context.genoTypeResults}
					settings={context.settingResults}
				/>
			</main>

			<Pre role="figure" aria-label="Debugging information">
				<DebugTitle>Debug Information + Content for Legend:</DebugTitle>
				<DebugHeader>Current Input Values</DebugHeader>
				{JSON.stringify(context.popGenVars)} <br />
				{JSON.stringify(context.activeSections)}
				<DebugHeader>Allele Output</DebugHeader>
				{JSON.stringify(context.alleleResults)} <br />
				<DebugHeader>Genotype Output</DebugHeader>
				{JSON.stringify(context.alleleResults)} <br />
				<DebugHeader>Legend Data</DebugHeader>
				{JSON.stringify(context.settingResults, null, 2)}
			</Pre>
		</IndexPage>
	);
}

export default HomePage;
