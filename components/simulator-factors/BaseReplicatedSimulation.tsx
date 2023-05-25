import React from 'react';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';

import { VALID_VARIABLES } from '../../types';
import { getPopGenVariableByName } from '../../data/popGenVariables';
import HelpContentWrapper from './HelpContentWrapper';
import Slider from '../sliders/Slider';

export default function BaseReplicatedSimulation({ name }) {
	const numberOfGenerations = getPopGenVariableByName(VALID_VARIABLES.NUM_GENERATIONS);
	const populationSize = getPopGenVariableByName(VALID_VARIABLES.POPULATION_SIZE);
	const startingAlleleFreq = getPopGenVariableByName(VALID_VARIABLES.STARTING_ALLELE_FREQ);
	const numPopulation = getPopGenVariableByName(VALID_VARIABLES.NUM_OF_POPULATIONS);

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
					<Slider popVariable={populationSize} isActive={true} />
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
					<Slider popVariable={numberOfGenerations} isActive={true} />
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
					<Slider popVariable={startingAlleleFreq} isActive={true} />
				</Stack>
			</Grid>

			<Grid mb={4}>
				<HelpContentWrapper
					title={numPopulation.sliderName + `「 ${numPopulation.variable} 」`}
					message={numPopulation.description}
					status="info"
				>
					<Text fontWeight="bold">{numPopulation.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
					<Slider popVariable={numPopulation} isActive={true} />
				</Stack>
			</Grid>
		</Box>
	);
}
