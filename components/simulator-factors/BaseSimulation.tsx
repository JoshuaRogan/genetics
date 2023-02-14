import React from 'react';

import { getPopGenVariableByName, VALID_VARIABLES } from '../../data/popGenVariables';
import HelpContentWrapper from './HelpContentWrapper';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import Slider from '../sliders/Slider';

export default function BaseSimulation({ isActive, name, onChange }) {
	const numberOfGenerations = getPopGenVariableByName(VALID_VARIABLES.NUM_GENERATIONS);
	const populationSize = getPopGenVariableByName(VALID_VARIABLES.POPULATION_SIZE);
	const startingAlleleFreq = getPopGenVariableByName(VALID_VARIABLES.STARTING_ALLELE_FREQ);

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
					<Slider
						onChange={onChange}
						min={populationSize.min}
						max={populationSize.max}
						step={populationSize.step}
						defaultValue={populationSize.defaultValue}
						label={populationSize.sliderName}
						name={populationSize.name}
						isActive={true}
					/>
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
				<Stack direction={{ base: 'column', md: 'row' }} mb={4} spacing="24px" align={{ base: 'center' }}>
					<Slider
						onChange={onChange}
						min={numberOfGenerations.min}
						max={numberOfGenerations.max}
						step={numberOfGenerations.step}
						defaultValue={numberOfGenerations.defaultValue}
						label={numberOfGenerations.sliderName}
						name={numberOfGenerations.name}
						isActive={true}
					/>
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
					<Slider
						onChange={onChange}
						min={startingAlleleFreq.min}
						max={startingAlleleFreq.max}
						step={startingAlleleFreq.step}
						defaultValue={startingAlleleFreq.defaultValue}
						label={startingAlleleFreq.sliderName}
						name={startingAlleleFreq.name}
						isActive={true}
					/>
				</Stack>
			</Grid>
		</Box>
	);
}
