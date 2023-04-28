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
			<Grid>
				<HelpContentWrapper
					title={positiveAssortMatingFreq.sliderName + `「 ${positiveAssortMatingFreq.variable} 」`}
					message={positiveAssortMatingFreq.description}
					status="info"
				>
					<Text fontWeight="bold">{positiveAssortMatingFreq.sliderName}</Text>
				</HelpContentWrapper>
				<Stack
					direction={{ base: 'column', md: 'row' }}
					spacing="24px"
					mt={2}
					align={{ base: 'center', md: 'self-start' }}
				>
					<Slider popVariable={positiveAssortMatingFreq} isActive={true} isInfinite={false} />
				</Stack>
			</Grid>
		</Box>
	);
}
