import React from 'react';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';

import { VALID_VARIABLES } from '../../types';
import Slider from '../sliders/Slider';
import HelpContentWrapper from './HelpContentWrapper';
import { getPopGenVariableByName } from '../../data/popGenVariables';
import RangeSlider from '../sliders/RangeSlider';

export default function BottleneckGenerations() {
	const generationToOverrideStart = getPopGenVariableByName(VALID_VARIABLES.BOTTLENECK_GEN_TO_OVERRIDE_START);
	const generationToOverrideEnd = getPopGenVariableByName(VALID_VARIABLES.BOTTLENECK_GEN_TO_OVERRIDE_END);
	const bottleNeckPopSize = getPopGenVariableByName(VALID_VARIABLES.BOTTLENECK_POPULATION_SIZE);

	return (
		<Box aria-label="Advanced Simulation Factor: BottleneckGenerations">
			<Grid mb={8}>
				<HelpContentWrapper
					title={generationToOverrideStart.sliderName + `「 ${generationToOverrideStart.variable} 」`}
					message={generationToOverrideStart.description}
					status="info"
				>
					<Text fontWeight="bold">{generationToOverrideStart.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" mt={4} align="center">
					<RangeSlider startVariable={generationToOverrideStart} endVariable={generationToOverrideEnd} />
				</Stack>
			</Grid>
			<Grid mb={4}>
				<HelpContentWrapper
					title={bottleNeckPopSize.sliderName + `「 ${bottleNeckPopSize.variable} 」`}
					message={bottleNeckPopSize.description}
					status="info"
				>
					<Text fontWeight="bold">{bottleNeckPopSize.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" mt={4} align="center">
					<Slider popVariable={bottleNeckPopSize} isActive={true} />
				</Stack>
			</Grid>
		</Box>
	);
}
