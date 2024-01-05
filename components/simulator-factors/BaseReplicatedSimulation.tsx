import React from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';

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
				<Slider popVariable={populationSize} isActive={true} />
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
				<Slider popVariable={numberOfGenerations} isActive={true} />
			</Grid>

			<Grid mb={4}>
				<HelpContentWrapper
					title={startingAlleleFreq.sliderName + `「 ${startingAlleleFreq.variableHTML} 」`}
					message={startingAlleleFreq.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold" dangerouslySetInnerHTML={{ __html: startingAlleleFreq.sliderName }} />
				</HelpContentWrapper>
				<Slider popVariable={startingAlleleFreq} isActive={true} />
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
				<Slider popVariable={numPopulation} isActive={true} />
			</Grid>
		</Box>
	);
}
