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
					title={populationSize.sliderName + `「 ${populationSize.variableHTML} 」`}
					message={populationSize.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold">
						{populationSize.sliderName}
					</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
					<Slider popVariable={populationSize} isActive={true} />
				</Stack>
			</Grid>

			<Grid mb={4}>
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

			<Grid mb={4}>
				<HelpContentWrapper
					title={startingAlleleFreq.sliderName + `「 ${startingAlleleFreq.variableHTML} 」`}
					message={startingAlleleFreq.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold" dangerouslySetInnerHTML={{__html: startingAlleleFreq.sliderName}} />
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
					<Slider popVariable={startingAlleleFreq} isActive={true} />
				</Stack>
			</Grid>

			<Grid mb={4}>
				<HelpContentWrapper
					title={numPopulation.sliderName + `「 ${numPopulation.variableHTML} 」`}
					message={numPopulation.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold">
						{numPopulation.sliderName}
					</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
					<Slider popVariable={numPopulation} isActive={true} />
				</Stack>
			</Grid>
		</Box>
	);
}
