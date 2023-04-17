import React from 'react';

import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import Slider from '../sliders/Slider';
import { getPopGenVariableByName, VALID_VARIABLES } from '../../data/popGenVariables';
import HelpContentWrapper from './HelpContentWrapper';

export default function BottleneckGenerations({ name, onChange }) {
	const generationToOverrideStart = getPopGenVariableByName(VALID_VARIABLES.BOTTLENECK_GEN_TO_OVERRIDE_START);
	const generationToOverrideEnd = getPopGenVariableByName(VALID_VARIABLES.BOTTLENECK_GEN_TO_OVERRIDE_END);
	const bottleNeckPopSize = getPopGenVariableByName(VALID_VARIABLES.BOTTLENECK_POPULATION_SIZE);

	return (
		<Box aria-label="Advanced Simulation Factor: BottleneckGenerations">
			<Grid>
				<HelpContentWrapper
					title={generationToOverrideStart.sliderName + `「 ${generationToOverrideStart.variable} 」`}
					message={generationToOverrideStart.description}
					status="info"
				>
					<Text fontWeight="bold">{generationToOverrideStart.sliderName}</Text>
				</HelpContentWrapper>
				<Stack
					direction={{ base: 'column', md: 'row' }}
					spacing="24px"
					mt={4}
					align={{ base: 'center', md: 'self-start' }}
				>
					<Slider
						onChange={onChange}
						min={generationToOverrideStart.min}
						max={generationToOverrideStart.max}
						step={generationToOverrideStart.step}
						defaultValue={generationToOverrideStart.defaultValue}
						label={generationToOverrideStart.sliderName}
						name={generationToOverrideStart.name}
						isActive={true}
					/>
					<Slider
						onChange={onChange}
						min={generationToOverrideEnd.min}
						max={generationToOverrideEnd.max}
						step={generationToOverrideEnd.step}
						defaultValue={generationToOverrideEnd.defaultValue}
						label={generationToOverrideEnd.sliderName}
						name={generationToOverrideEnd.name}
						isActive={true}
					/>
				</Stack>
			</Grid>
			<Grid>
				<HelpContentWrapper
					title={bottleNeckPopSize.sliderName + `「 ${bottleNeckPopSize.variable} 」`}
					message={bottleNeckPopSize.description}
					status="info"
				>
					<Text fontWeight="bold">{bottleNeckPopSize.sliderName}</Text>
				</HelpContentWrapper>
				<Stack
					direction={{ base: 'column', md: 'row' }}
					spacing="24px"
					mt={2}
					align={{ base: 'center', md: 'self-start' }}
				>
					<Slider
						onChange={onChange}
						min={bottleNeckPopSize.min}
						max={bottleNeckPopSize.max}
						step={bottleNeckPopSize.step}
						defaultValue={bottleNeckPopSize.defaultValue}
						label={bottleNeckPopSize.sliderName}
						name={bottleNeckPopSize.name}
						isActive={true}
					/>
				</Stack>
			</Grid>
		</Box>
	);
}
