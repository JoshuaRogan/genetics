import React from 'react';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import Slider from '../sliders/Slider';
import { getPopGenVariableByName } from '../../data/popGenVariables';
import HelpContentWrapper from './HelpContentWrapper';
import { VALID_VARIABLES } from '../../types';

export default function AssortativeMating() {
	const positiveAssortMatingFreq = getPopGenVariableByName(VALID_VARIABLES.ASSORT_MATING_POSITIVE_FREQ);

	return (
		<Box aria-label="Advanced Simulation Factor: AssortativeMating">
			<Grid mb={4}>
				<HelpContentWrapper
					title={positiveAssortMatingFreq.sliderName + `「 ${positiveAssortMatingFreq.variable} 」`}
					message={positiveAssortMatingFreq.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold">
						{positiveAssortMatingFreq.sliderName}
					</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" mt={4} align="center">
					<Slider popVariable={positiveAssortMatingFreq} isActive={true} />
				</Stack>
			</Grid>
		</Box>
	);
}
