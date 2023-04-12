import styled from 'styled-components';
import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Text, useColorModeValue, useToast } from '@chakra-ui/react';

import LegendContainer from '../LegendContainer';
import AssortativeMating from '../simulator-factors/AssortativeMating';
import BottleNeckGenerations from '../simulator-factors/BottleNeckGenerations';
import Inbreeding from '../simulator-factors/Inbreeding';
import Migration from '../simulator-factors/Migration';
import { VALID_SECTIONS } from '../../data/popGenVariables';
import { DebugHeader, Pre } from '../../utils/debugging';
import { getWorker, listenToWorker } from '../../workers/generationWorker';
import { ApplicationContext } from '../../context/application';
import BaseSimulation from '../simulator-factors/BaseSimulation';
import Selection from '../simulator-factors/Selection';
import Mutation from '../simulator-factors/Mutation';
import MainWrapper from '../MainWrapper';
import HighChart from '../highChart';

import SimulatorContainer from '../../styles/simulators/SimulatorContainer';
import InputContainer from '../../styles/simulators/InputContainer';
import Collapsible from '../Collapsible';
import FactorManager from '../FactorManager';
import { LinkIcon } from '@chakra-ui/icons';

const DebugTitle = styled.h2`
	color: red;
`;

function Index() {
	const context = React.useContext(ApplicationContext);
	const toast = useToast();

	const [isCompleteToastDisplayed, setIsCompleteToastDisplayed] = useState(false);
	const [resetValue, setResetValue] = useState(0);

	// This is interacting with an imperative API. Might need to remove the useEffect
	React.useEffect(() => {
		context.setPopGenVar('number-replicated', 1);
		listenToWorker((event) => {
			context.addMoreResults(event, null); // Needs to be handled as it won't work if it's in the context
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateChart = (isAllele = true) => {
		context.setPopGenVar('number-replicated', 1); // bubble up changes for the backend
		const worker: Worker = getWorker();

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

		// Listen for messages from the worker
		worker.addEventListener('message', (event) => {
			const workerResult = JSON.parse(event.data);

			// If the worker started a new generation show toast
			if (workerResult.status === 'running' && !toast.isActive('simulation-started')) {
				// Close all toasts before starting a new simulation
				toast.closeAll();

				// Show a toast to let the user know the simulation has started
				toast({
					id: 'simulation-started',
					title: 'Simulation Started',
					description: 'The simulation has started and will complete in the background.',
					status: 'info',
					duration: 3000,
					position: 'bottom-right',
					isClosable: true,
				});

				return;
			}

			// If work was completed successfully, show a toast to let the user know
			if (workerResult.status === 'complete' && !isCompleteToastDisplayed) {
				setIsCompleteToastDisplayed(true);

				// This timeout exists to smooth out the transition between the simulation complete toast and the results
				setTimeout(() => {
					if (!toast.isActive('simulation-complete')) {
						toast({
							id: 'simulation-complete',
							title: 'Simulation Complete',
							description: 'The simulation has completed and the results are ready to view.',
							status: 'success',
							duration: 4000,
							position: 'bottom-right',
							isClosable: true,
							onCloseComplete: () => {
								setIsCompleteToastDisplayed(false);
							},
						});
					}
				}, 2000);

				return;
			}
		});

		// Kick it off
		worker.postMessage({ cmd: 'run' });

		// Set Vars based on the context
		// worker.postMessage({'cmd':'setVar', 'varName': 'selection-W', 'wAA': wAA, 'wAa': wAa, 'waa': waa});
	};

	const onChange = (name, newValue) => {
		context.setPopGenVar(name, newValue); // bubble up changes for the backend
		context.setPopGenVar('number-replicated', 1); // bubble up changes for the backend
	};

	const toggleActiveSection = (section) => {
		const currentState = context.activeSections[section];
		context.setActiveSession(section, !currentState);
	};

	const generateShareableLink = () => {
		const url = new URL(window.location.href);
		const params = new URLSearchParams(url.search);

		for (const genVar in context.popGenVars) {
			if (context.popGenVars.hasOwnProperty(genVar)) {
				params.set(genVar, context.popGenVars[genVar]);
			}
		}

		// params.set('p', context.popGenVars.p.toPrecision(3));
		// params.set('N', context.popGenVars.N.toPrecision(3));
		// params.set('t', context.popGenVars.t.toPrecision(3));
		// params.set('mu', context.popGenVars.mu.toPrecision(3));
		// params.set('nu', context.popGenVars.nu.toPrecision(3));
		// params.set('m', context.popGenVars.m.toPrecision(3));
		// params.set('pm', context.popGenVars.pm.toPrecision(3));
		// params.set('F', context.popGenVars.F.toPrecision(3));
		// params.set('assortMating', context.popGenVars.assortMating.toPrecision(3));
		// params.set('gen-to-over-start', context.popGenVars['gen-to-over-start'].toPrecision(3));
		// params.set('gen-to-over-end', context.popGenVars['gen-to-over-end'].toPrecision(3));
		// params.set('Nb', context.popGenVars.Nb.toPrecision(3));
		// params.set('WAA', context.popGenVars.WAA.toPrecision(3));
		// params.set('WAa', context.popGenVars.WAa.toPrecision(3));
		// params.set('Waa', context.popGenVars.Waa.toPrecision(3));

		url.search = params.toString();
		console.log(url.href);
		return url.toString();
	};

	return (
		<MainWrapper>
			<SimulatorContainer role="main">
				<Box as="section" m={'40px 0'}>
					<Text textStyle="title" align="center">
						Individual Simulations
					</Text>
					<Text as="p" my={4}>
						(Place holder text) Use this paragrah to explain 1) the purpose of this page. 2) what the default graph is.
						3) what the users should do on this page.
					</Text>
					<Text as="p" my={4}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat.
					</Text>
					<Text as="p" my={4}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat.
					</Text>
				</Box>

				<Box
					as="section"
					position="relative"
					left="50%"
					right="50%"
					mx="-50vw"
					w="100vw"
					py={{ base: '20px', md: '40px' }}
					px={{ base: '0', md: '30px' }}
					bg={useColorModeValue('gray.100', ' gray.700')}
				>
					<Text as="h2" textStyle="subtitle" align="center" mb={4}>
						Simulator Settings
					</Text>

					<InputContainer key={`reset-key-${resetValue}`} role="form" aria-label="All simulator inputs">
						<BaseSimulation
							isActive={context.activeSections[VALID_SECTIONS.BASE]}
							name={'Base Simulation Model'}
							onChange={onChange}
							isReplicated={false}
							toggleActiveSection={toggleActiveSection}
						/>
						<Box my={6}>
							<Collapsible header={`Advanced Factors`} variant="solid" iconDirection="left">
								{/* Selection Input */}
								<FactorManager
									isActive={true}
									title="Selection"
									toggleActive={() => toggleActiveSection(VALID_SECTIONS.SELECTION)}
								>
									<Selection
										isActive={context.activeSections[VALID_SECTIONS.SELECTION]}
										name={'Selection'}
										onChange={onChange}
									/>
								</FactorManager>

								{/* Mutation Input */}
								<FactorManager
									isActive={true}
									title="Mutation"
									toggleActive={() => toggleActiveSection(VALID_SECTIONS.MUTATION)}
								>
									<Mutation
										isActive={context.activeSections[VALID_SECTIONS.MUTATION]}
										name={'Mutation'}
										onChange={onChange}
									/>
								</FactorManager>

								{/* Migration Input */}
								<FactorManager
									isActive={true}
									title="Migration"
									toggleActive={() => toggleActiveSection(VALID_SECTIONS.MIGRATION)}
								>
									<Migration
										isActive={context.activeSections[VALID_SECTIONS.MIGRATION]}
										name={'Migration'}
										onChange={onChange}
									/>
								</FactorManager>

								{/* Inbreeding Input */}
								<FactorManager
									isActive={true}
									title="Inbreeding"
									toggleActive={() => toggleActiveSection(VALID_SECTIONS.INBREEDING)}
								>
									<Inbreeding
										isActive={context.activeSections[VALID_SECTIONS.INBREEDING]}
										name={'Inbreeding'}
										onChange={onChange}
									/>
								</FactorManager>

								{/* Assortative Mating Input */}
								<FactorManager
									isActive={true}
									title="Assortative Mating"
									toggleActive={() => toggleActiveSection(VALID_SECTIONS.ASSORT_MATING)}
								>
									<AssortativeMating
										isActive={context.activeSections[VALID_SECTIONS.ASSORT_MATING]}
										name={'Assortative Mating'}
										onChange={onChange}
									/>
								</FactorManager>

								{/* Population Bottleneck Input */}
								<FactorManager
									isActive={true}
									title="Bottleneck Generations"
									toggleActive={() => toggleActiveSection(VALID_SECTIONS.BOTTLENECK_GEN)}
								>
									<BottleNeckGenerations
										isActive={context.activeSections[VALID_SECTIONS.BOTTLENECK_GEN]}
										name={'Bottleneck Generations'}
										onChange={onChange}
									/>
								</FactorManager>
							</Collapsible>
							<Button
								mt={4}
								colorScheme="whatsapp"
								variant="outline"
								alignContent="center"
								rightIcon={<LinkIcon />}
								onClick={() => {
									// generate link
									const link = generateShareableLink();

									// and copy to clipboard
									navigator.clipboard.writeText(link);

									// toast({
									// 	title: 'Link copied to clipboard',
									// 	description: 'You can now share this link with others',
									// 	status: 'success',
									// 	duration: 9000,
									// 	isClosable: true,
									// });
								}}
							>
								Export settings
							</Button>
						</Box>
						<Text my={4}>
							You can change the settings above, and then “Runs Simulation” to get a new simulation based on the latest
							settings, or “Add As A New Simulation” to the graphs without erasing the last smulation.
						</Text>
						<ButtonGroup
							w="100%"
							display={'flex'}
							flexDirection={{ base: 'column', md: 'row' }}
							justifyContent={{ base: 'center', md: 'space-around' }}
							alignItems={'center'}
							marginTop={25}
							marginBottom={25}
							spacing={0}
						>
							<Button
								w={{ base: '70%', md: '30%' }}
								onClick={() => {
									context.clearResults();
									updateChart();
								}}
								variant={'primary'}
							>
								Run Simulation
							</Button>
							<Button
								onClick={() => updateChart()}
								w={{ base: '70%', md: '30%' }}
								marginTop={{ base: 2, md: 0 }}
								variant={'primary'}
							>
								Add as a new simulation
							</Button>
						</ButtonGroup>
					</InputContainer>
				</Box>

				<Box my={6}>
					<HighChart lines={context.alleleResults} title="Graph 1: Allele Frequency Change Over Generations" />
				</Box>
				<LegendContainer
					alleleResults={context.alleleResults}
					genoTypeResults={null}
					settings={context.settingResults}
					graphNumber={1}
					isReplicated={false}
				/>

				<Box my={6}>
					<HighChart lines={context.genoTypeResults} title={'Graph 2: Genotype Frequency Change Over Generations'} />
				</Box>
				<LegendContainer
					alleleResults={context.alleleResults}
					genoTypeResults={context.genoTypeResults}
					settings={context.settingResults}
					graphNumber={2}
					isReplicated={false}
				/>

				<ButtonGroup
					w="100%"
					display={'flex'}
					flexDirection={{ base: 'column', md: 'row' }}
					justifyContent={{ base: 'center', md: 'space-around' }}
					alignItems={'center'}
					marginTop={25}
					marginBottom={25}
					spacing={0}
				>
					<Button w={{ base: '80%', md: '30%' }} variant={'primary'}>
						Show Data Table
					</Button>
					<Button
						onClick={() => {
							// clear the results on the graph
							context.clearResults();

							// reset the input values
							context.resetInputValues();

							if (!toast.isActive('simulation-reset')) {
								toast({
									id: 'simulation-reset',
									title: 'Simulator Reset',
									description: 'The simulator has been reset to default values.',
									status: 'warning',
									duration: 5000,
									isClosable: true,
								});

								setResetValue(resetValue + 1);
							}
						}}
						w={{ base: '80%', md: '30%' }}
						marginTop={{ base: 2, md: 0 }}
						variant={'primary'}
					>
						Reset Simulator
					</Button>
				</ButtonGroup>

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
			</SimulatorContainer>
		</MainWrapper>
	);
}

export default Index;
