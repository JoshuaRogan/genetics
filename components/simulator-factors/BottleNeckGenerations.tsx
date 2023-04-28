import React from 'react';

import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import Slider from '../sliders/Slider';
import { getPopGenVariableByName } from '../../data/popGenVariables';
import HelpContentWrapper from './HelpContentWrapper';
import { VALID_VARIABLES } from '../../types';

export default function BottleneckGenerations() {
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
					<Slider popVariable={generationToOverrideStart} isActive={true} isInfinite={false} />
					<Slider popVariable={generationToOverrideEnd} isActive={true} isInfinite={false} />
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
					<Slider popVariable={bottleNeckPopSize} isActive={true} isInfinite={false} />
				</Stack>
			</Grid>
		</Box>
	);
}
