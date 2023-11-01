import React from 'react';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import Slider from '../sliders/Slider';
import { getPopGenVariableByName } from '../../data/popGenVariables';
import { VALID_VARIABLES } from '../../types';
import HelpContentWrapper from './HelpContentWrapper';

export default function Inbreeding() {
	const inbreedingCoef = getPopGenVariableByName(VALID_VARIABLES.INBREEDING_COEFFICIENT);

	return (
		<Box aria-label="Advanced Simulation Factor: Inbreeding">
			<Grid mb={4}>
				<HelpContentWrapper
					title={inbreedingCoef.sliderName + `「 ${inbreedingCoef.variable} 」`}
					message={inbreedingCoef.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold">
						{inbreedingCoef.sliderName}
					</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" mt={4} align="center">
					<Slider popVariable={inbreedingCoef} isActive={true} />
				</Stack>
			</Grid>
		</Box>
	);
}
