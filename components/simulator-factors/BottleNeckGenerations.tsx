import React from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';

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
					title={generationToOverrideStart.sliderName }
					message={generationToOverrideStart.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold">
						{generationToOverrideStart.sliderName}
					</Text>
				</HelpContentWrapper>
				<RangeSlider startVariable={generationToOverrideStart} endVariable={generationToOverrideEnd} />
			</Grid>
			<Grid mb={4}>
				<HelpContentWrapper
					title={bottleNeckPopSize.sliderName + `「 ${bottleNeckPopSize.variableHTML} 」`}
					message={bottleNeckPopSize.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold">
						{bottleNeckPopSize.sliderName}
					</Text>
				</HelpContentWrapper>
				<Slider popVariable={bottleNeckPopSize} isActive={true} />
			</Grid>
		</Box>
	);
}
