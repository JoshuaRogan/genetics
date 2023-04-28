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
			<Grid>
				<HelpContentWrapper
					title={inbreedingCoef.sliderName + `「 ${inbreedingCoef.variable} 」`}
					message={inbreedingCoef.description}
					status="info"
				>
					<Text fontWeight="bold">{inbreedingCoef.sliderName}</Text>
				</HelpContentWrapper>
				<Stack
					direction={{ base: 'column', md: 'row' }}
					spacing="24px"
					mt={2}
					align={{ base: 'center', md: 'self-start' }}
				>
					<Slider popVariable={inbreedingCoef} isActive={true} isInfinite={false} />
				</Stack>
			</Grid>
		</Box>
	);
}
