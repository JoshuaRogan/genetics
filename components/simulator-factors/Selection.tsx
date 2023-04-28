import React from 'react';

import Slider from '../sliders/Slider';
import { getPopGenVariableByName } from '../../data/popGenVariables';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import HelpContentWrapper from './HelpContentWrapper';
import { VALID_VARIABLES } from '../../types';

export default function Selection() {
	const fitnessFactorWAA = getPopGenVariableByName(VALID_VARIABLES.SELECTION_WAA);
	const fitnessFactorWAa = getPopGenVariableByName(VALID_VARIABLES.SELECTION_WAa);
	const fitnessFactorWaa = getPopGenVariableByName(VALID_VARIABLES.SELECTION_Waa);

	return (
		<Box aria-label="Advanced Simulation Factor: Selection">
			<Grid>
				<HelpContentWrapper
					title={fitnessFactorWAA.sliderName + `「 ${fitnessFactorWAA.variable} 」`}
					message={fitnessFactorWAA.description}
					status="info"
				>
					<Text fontWeight="bold">{fitnessFactorWAA.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mb={4} mt={2} spacing="24px" align={{ base: 'center' }}>
					<Slider popVariable={fitnessFactorWAA} isActive={true} isInfinite={false} />
				</Stack>
			</Grid>
			<Grid>
				<HelpContentWrapper
					title={fitnessFactorWAa.sliderName + `「 ${fitnessFactorWAa.variable} 」`}
					message={fitnessFactorWAa.description}
					status="info"
				>
					<Text fontWeight="bold">{fitnessFactorWAa.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mb={4} mt={2} spacing="24px" align={{ base: 'center' }}>
					<Slider popVariable={fitnessFactorWAa} isActive={true} isInfinite={false} />
				</Stack>
			</Grid>
			<Grid>
				<HelpContentWrapper
					title={fitnessFactorWaa.sliderName + `「 ${fitnessFactorWaa.variable} 」`}
					message={fitnessFactorWaa.description}
					status="info"
				>
					<Text fontWeight="bold">{fitnessFactorWaa.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" mt={2} align={{ base: 'center' }}>
					<Slider popVariable={fitnessFactorWaa} isActive={true} isInfinite={false} />
				</Stack>
			</Grid>
		</Box>
	);
}
