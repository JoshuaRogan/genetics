import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Box, Button, ButtonGroup, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';

import Selection from '../simulator-factors/Selection';
import AssortativeMating from '../simulator-factors/AssortativeMating';
import BottleNeckGenerations from '../simulator-factors/BottleNeckGenerations';
import Inbreeding from '../simulator-factors/Inbreeding';
import Migration from '../simulator-factors/Migration';
import BaseIndividualSimulation from '../simulator-factors/BaseIndividualSimulation';
import Mutation from '../simulator-factors/Mutation';

import { DebugHeader, Pre } from '../../utils/debugging';
import { getWorker, listenToWorker, removeAndRecreateWorker } from '../../workers/generationWorker';

import LegendContainer from '../LegendContainer';
import MainWrapper from '../MainWrapper';
import HighChart from '../highChart';
import Collapsible from '../Collapsible';
import FactorManager from '../FactorManager';
import {
	addMoreResults,
	clearResults,
	resetDefaultActiveSections,
	resetInputValues,
	setPopGenVar,
} from '../../redux/reducers/rootSlice';
import { StoreState, VALID_SECTIONS } from '../../types';
import Highcharts from 'highcharts';

function Index() {
	const dispatch = useDispatch();
	const popGenVars = useSelector((state: StoreState) => state.root.popGenVars);
	const activeSections = useSelector((state: StoreState) => state.root.activeSections);
	const alleleResults = useSelector((state: StoreState) => state.root.alleleResults);
	const genotypeResults = useSelector((state: StoreState) => state.root.genoTypeResults);
	const settingResults = useSelector((state: StoreState) => state.root.settingResults);
	const activeSectionsResults = useSelector((state: StoreState) => state.root.activeSectionsResults);

	const toast = useToast();
	const [isCompleteToastDisplayed, setIsCompleteToastDisplayed] = useState(false);

	React.useEffect(() => {
		dispatch(setPopGenVar({ varName: 'number-replicated', value: 1 }));

		listenToWorker(onWorkerResultHandler);

		return () => {
			// clear the results on the graph
			dispatch(clearResults());

			// reset the input values
			dispatch(resetInputValues());

			// reset the active sections
			dispatch(resetDefaultActiveSections());

			// This is a measure to prevent multiple event listener attaching to a single worker on page reloads
			removeAndRecreateWorker();
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onWorkerResultHandler = useCallback(
		(event) => {
			dispatch(addMoreResults({ workerResults: event }));
		},
		[dispatch],
	);

	const updateChart = () => {
		const worker: Worker = getWorker();

		if (!worker) {
			console.error('Error no worker');
			return;
		}

		worker.postMessage({
			cmd: 'initGeneration',
			populationSize: popGenVars.N,
			numGenerations: popGenVars.t,
			startingFrequency: popGenVars.p,
		});

		worker.postMessage({
			cmd: 'setVar',
			varName: 'simSettings',
			vars: activeSections,
		});

		// Inverse of finite being active to enable infinite population
		if (!activeSections[VALID_SECTIONS.FINITE]) {
			worker.postMessage({ cmd: 'setVar', varName: 'inifinite-pop' });
		}

		if (activeSections[VALID_SECTIONS.SELECTION]) {
			const message = {
				cmd: 'setVar',
				varName: 'selection-W',
				wAA: popGenVars.WAA,
				wAa: popGenVars.WAa,
				waa: popGenVars.Waa,
			};
			worker.postMessage(message);
			worker.postMessage({ cmd: 'setVar', varName: 'selection-DS', selectionCoef: 0, dominaceCoef: 1 });
		}

		if (activeSections[VALID_SECTIONS.MUTATION]) {
			const mu = popGenVars.mu * Math.pow(10, popGenVars['mu-exp']);
			const nu = popGenVars.nu * Math.pow(10, popGenVars['nu-exp']);

			worker.postMessage({ cmd: 'setVar', varName: 'mutation', mu: mu, nu: nu });
		}

		if (activeSections[VALID_SECTIONS.MIGRATION]) {
			worker.postMessage({
				cmd: 'setVar',
				varName: 'migration',
				migrationRate: popGenVars.m,
				migrantAlleleFreq: popGenVars.pm,
			});
		}

		if (activeSections[VALID_SECTIONS.INBREEDING]) {
			worker.postMessage({ cmd: 'setVar', varName: 'inbreeding', inbreedCoef: popGenVars.F });
		}

		if (activeSections[VALID_SECTIONS.ASSORT_MATING]) {
			worker.postMessage({ cmd: 'setVar', varName: 'assortative-mating', matingFreq: popGenVars.assortMating });
		}

		if (activeSections[VALID_SECTIONS.BOTTLENECK_GEN]) {
			worker.postMessage({
				cmd: 'setVar',
				varName: 'population-bottleneck',
				generationStart: popGenVars['gen-to-over-start'],
				generationEnd: popGenVars['gen-to-over-end'],
				newPopulationSize: popGenVars.BNb,
			});
		}

		// Listen for messages from the worker
		// TODO: Listener duplicates on each updateChart call, need to remove old listeners
		worker.addEventListener(
			'message',
			(event) => {
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
								description:
									'The simulation has completed and the results are ready to view. Below each table there is a summary of the results.',
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
			},
			{
				once: false,
			},
		);

		// Kick it off
		worker.postMessage({ cmd: 'run' });

		// Set Vars based on the context
		// worker.postMessage({'cmd':'setVar', 'varName': 'selection-W', 'wAA': wAA, 'wAa': wAa, 'waa': waa});
	};

	const generateShareableLink = () => {
		const url = new URL(window.location.href);
		const params = new URLSearchParams(url.search);

		for (const genVar in popGenVars) {
			params.set(genVar, popGenVars[genVar]);
		}

		url.search = params.toString();

		// copy link to clipboard
		navigator.clipboard.writeText(url.toString());

		toast({
			title: 'Link copied to clipboard',
			description: 'You can now share this link with others',
			status: 'success',
			duration: 4000,
			isClosable: true,
		});
	};

	const resetDataTableView = () => {
		// Reset the data table view
		if (!Highcharts.charts || Highcharts.charts.length === 0) {
			return;
		}

		Highcharts.charts.filter(Boolean).forEach((chart) => {
			if (chart) {
				chart.hideData();
			}
		});
	};

	return (
		<MainWrapper>
			<Box
				as="main"
				padding={{ base: '0 15px 15px 15px', sm: '0 30px 30px 30px', md: '0' }}
				maxWidth={{ md: '90%', lg: '80%', xl: '70%' }}
				mx={{ sm: 'auto' }}
			>
				<Box as="section" m={'40px 0'}>
					<Text as="h1" textStyle="title" align="center">
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

					<Box
						as="div"
						role="form"
						aria-label="Simulator variable configuration"
						padding={{ base: '0 15px 15px 15px', sm: '0 30px 30px 30px', md: '0' }}
						mt={{ base: 6, md: 10 }}
						maxWidth={{ md: '90%', lg: '80%', xl: '70%' }}
						marginX={{ sm: 'auto' }}
					>
						<BaseIndividualSimulation name={'Base Simulation Model'} isReplicated={false} />
						<Box my={6}>
							<Collapsible header={`Advanced Factors`} variant="solid" iconDirection="left">
								{/* Selection Input */}
								<FactorManager title={VALID_SECTIONS.SELECTION} isFactorActive={true}>
									<Selection />
								</FactorManager>

								{/* Mutation Input */}
								<FactorManager title={VALID_SECTIONS.MUTATION} isFactorActive={true}>
									<Mutation />
								</FactorManager>

								{/* Migration Input */}
								<FactorManager title={VALID_SECTIONS.MIGRATION} isFactorActive={true}>
									<Migration />
								</FactorManager>

								{/* Inbreeding Input */}
								<FactorManager title={VALID_SECTIONS.INBREEDING} isFactorActive={true}>
									<Inbreeding />
								</FactorManager>

								{/* Assortative Mating Input */}
								<FactorManager title={VALID_SECTIONS.ASSORT_MATING} isFactorActive={true}>
									<AssortativeMating />
								</FactorManager>

								{/* Population Bottleneck Input */}
								<FactorManager title={VALID_SECTIONS.BOTTLENECK_GEN} isFactorActive={true}>
									<BottleNeckGenerations />
								</FactorManager>
							</Collapsible>
							<Button variant="generateLinkStyle" rightIcon={<LinkIcon />} onClick={generateShareableLink}>
								Generate shareable Link
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
								variant="primary"
								onClick={() => {
									// reset the chart data table for it to update
									resetDataTableView();

									dispatch(clearResults());
									updateChart();
								}}
							>
								Run Simulation
							</Button>
							<Button
								variant="primary"
								marginTop={{ base: 2, md: 0 }}
								onClick={() => {
									// reset the chart data table for it to update
									resetDataTableView();

									updateChart();
								}}
							>
								Add as a new simulation
							</Button>
						</ButtonGroup>
					</Box>
				</Box>

				<Box my={6}>
					<HighChart chartIndex={0} lines={alleleResults} title="Graph 1: Allele Frequency Change Over Generations" />
				</Box>
				<Text
					as="p"
					mt={4}
					mb={8}
					textAlign={{
						base: 'center',
						md: 'left',
					}}
				>
					Below will be the results for the above graph. The legend will change based on the settings you have selected,
					and the results of the simulation.
				</Text>
				<LegendContainer
					alleleResults={alleleResults}
					genoTypeResults={null}
					settings={settingResults}
					enabledSettings={activeSectionsResults}
					graphNumber={1}
					isReplicated={false}
				/>

				<Box my={6}>
					<HighChart
						chartIndex={1}
						lines={genotypeResults}
						title="Graph 2: Genotype Frequency Change Over Generations"
					/>
				</Box>
				<Text
					as="p"
					mt={4}
					mb={8}
					textAlign={{
						base: 'center',
						md: 'left',
					}}
				>
					Below will be the results for the above graph. Here you will find the initial / final genotype frequencies,
					for A1A1, A1A2, and A2A2. The legend will change based on the settings you have selected, and the results of
					the simulation.
				</Text>
				<LegendContainer
					alleleResults={alleleResults}
					genoTypeResults={genotypeResults}
					settings={settingResults}
					enabledSettings={activeSectionsResults}
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
					<Button
						onClick={() => {
							// reset the chart data table for it to update
							resetDataTableView();

							// clear the results on the graph
							dispatch(clearResults());

							// reset the input values
							dispatch(resetInputValues());

							// reset the active sections
							dispatch(resetDefaultActiveSections());

							if (!toast.isActive('simulation-reset')) {
								toast({
									id: 'simulation-reset',
									title: 'Simulator Reset',
									description: "The simulator's settings have been reset to their default values.",
									status: 'warning',
									duration: 5000,
									isClosable: true,
								});
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
					<Box as="h2" color={'red'}>
						Debug Information + Content for Legend:
					</Box>
					<DebugHeader>Current Input Values</DebugHeader>
					{JSON.stringify(popGenVars)} <br />
					{JSON.stringify(activeSections)}
					<DebugHeader>Allele Output</DebugHeader>
					{JSON.stringify(alleleResults)} <br />
					<DebugHeader>Genotype Output</DebugHeader>
					{JSON.stringify(alleleResults)} <br />
					<DebugHeader>Legend Data</DebugHeader>
					{JSON.stringify(settingResults, null, 2)}
				</Pre>
			</Box>
		</MainWrapper>
	);
}

export default Index;
