import React from 'react';

import { getPopGenVariableByName } from '../../data/popGenVariables';
import HelpContentWrapper from './HelpContentWrapper';
import { Box, Checkbox, Grid, Stack, Text } from '@chakra-ui/react';
import Slider from '../sliders/Slider';
import { StoreState, VALID_SECTIONS, VALID_VARIABLES } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSectionStatus } from '../../redux/reducers/rootSlice';

export default function BaseIndividualSimulation({ name, isReplicated }) {
	const dispatch = useDispatch();
	const infinitePopulationState = useSelector((state: StoreState) => state.root.activeSections[VALID_SECTIONS.FINITE]);

	const populationSize = getPopGenVariableByName(VALID_VARIABLES.POPULATION_SIZE);
	const numberOfGenerations = getPopGenVariableByName(VALID_VARIABLES.NUM_GENERATIONS);
	const startingAlleleFreq = getPopGenVariableByName(VALID_VARIABLES.STARTING_ALLELE_FREQ);
	const bulkSimulator = getPopGenVariableByName(VALID_VARIABLES.NUM_REPLICATED);

	const onInfinitePopulationChecked = (e) => {
		dispatch(
			setActiveSectionStatus({
				name: VALID_SECTIONS.FINITE,
				status: !e.target.checked,
			}),
		);
	};

	return (
		<Box aria-label={name}>
			<Grid mb={8}>
				<HelpContentWrapper
					title={populationSize.sliderName + `「 ${populationSize.variableHTML} 」`}
					message={populationSize.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold" dangerouslySetInnerHTML={{__html: populationSize.sliderName}} />
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
					<Slider popVariable={populationSize} isActive={true} isInfinite={!infinitePopulationState} />
					<Checkbox
						variant="redBox"
						size="lg"
						checked={infinitePopulationState}
						onChange={onInfinitePopulationChecked}
						aria-label="Toggles population size to infinite for the current simulation"
					>
						Infinite (∞)
					</Checkbox>
				</Stack>
			</Grid>

			<Grid mb={8}>
				<HelpContentWrapper
					title={numberOfGenerations.sliderName + `「 ${numberOfGenerations.variableHTML} 」`}
					message={numberOfGenerations.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold">
						{numberOfGenerations.sliderName}
					</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
					<Slider popVariable={numberOfGenerations} isActive={true} />
				</Stack>
			</Grid>

			<Grid mb={8}>
				<HelpContentWrapper
					title={startingAlleleFreq.sliderName + `「 ${startingAlleleFreq.variableHTML} 」`}
					message={startingAlleleFreq.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold" dangerouslySetInnerHTML={{__html: startingAlleleFreq.sliderName}}>
					</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
					<Slider popVariable={startingAlleleFreq} isActive={true} />
				</Stack>
			</Grid>

			{isReplicated && (
				<Grid mb={4}>
					<HelpContentWrapper
						title={bulkSimulator.sliderName + `「 ${bulkSimulator.variableHTML} 」`}
						message={bulkSimulator.description}
						status="info"
					>
						<Text as="h3" fontWeight="bold">
							{bulkSimulator.sliderName}
						</Text>
					</HelpContentWrapper>
					<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
						<Slider popVariable={bulkSimulator} isActive={true} />
					</Stack>
				</Grid>
			)}
		</Box>
	);
}
