import React, { useState } from 'react';

import { getPopGenVariableByName } from '../../data/popGenVariables';
import HelpContentWrapper from './HelpContentWrapper';
import { Box, Checkbox, Grid, Stack, Text } from '@chakra-ui/react';
import Slider from '../sliders/Slider';
import { VALID_SECTIONS, VALID_VARIABLES } from '../../types';
import { useDispatch } from 'react-redux';
import { setActiveSectionStatus } from '../../redux/reducers/rootSlice';

export default function BaseIndividualSimulation({ isActive, name, isReplicated }) {
	const dispatch = useDispatch();
	const [isInfinitePopulation, setIsInfinitePopulation] = useState(false);

	const populationSize = getPopGenVariableByName(VALID_VARIABLES.POPULATION_SIZE);
	const numberOfGenerations = getPopGenVariableByName(VALID_VARIABLES.NUM_GENERATIONS);
	const startingAlleleFreq = getPopGenVariableByName(VALID_VARIABLES.STARTING_ALLELE_FREQ);
	const bulkSimulator = getPopGenVariableByName(VALID_VARIABLES.NUM_REPLICATED);

	const onInfinitePopulationChecked = (e) => {
		setIsInfinitePopulation(e.target.checked);
		dispatch(
			setActiveSectionStatus({
				name: VALID_SECTIONS.FINITE,
				status: e.target.checked,
			}),
		);
	};

	return (
		<Box aria-label={name}>
			<Grid mb={4}>
				<HelpContentWrapper
					title={populationSize.sliderName + `「 ${populationSize.variable} 」`}
					message={populationSize.description}
					status="info"
				>
					<Text fontWeight="bold">{populationSize.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
					<Slider popVariable={populationSize} isActive={true} isInfinite={isInfinitePopulation} />
					<Checkbox
						variant="redBox"
						role="checkbox"
						aria-label="Changes population size to infinite for the current simulation"
						size="lg"
						onChange={onInfinitePopulationChecked}
					>
						Infinite (∞)
					</Checkbox>
				</Stack>
			</Grid>

			<Grid mb={4}>
				<HelpContentWrapper
					title={numberOfGenerations.sliderName + `「 ${numberOfGenerations.variable} 」`}
					message={numberOfGenerations.description}
					status="info"
				>
					<Text fontWeight="bold">{numberOfGenerations.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
					<Slider popVariable={numberOfGenerations} isActive={true} isInfinite={isInfinitePopulation} />
				</Stack>
			</Grid>

			<Grid mb={4}>
				<HelpContentWrapper
					title={startingAlleleFreq.sliderName + `「 ${startingAlleleFreq.variable} 」`}
					message={startingAlleleFreq.description}
					status="info"
				>
					<Text fontWeight="bold">{startingAlleleFreq.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
					<Slider popVariable={startingAlleleFreq} isActive={true} isInfinite={isInfinitePopulation} />
				</Stack>
			</Grid>

			{isReplicated && (
				<Grid mb={4}>
					<HelpContentWrapper
						title={bulkSimulator.sliderName + `「 ${bulkSimulator.variable} 」`}
						message={bulkSimulator.description}
						status="info"
					>
						<Text fontWeight="bold">{bulkSimulator.sliderName}</Text>
					</HelpContentWrapper>
					<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
						<Slider popVariable={bulkSimulator} isActive={true} isInfinite={isInfinitePopulation} />
					</Stack>
				</Grid>
			)}
		</Box>
	);
}
