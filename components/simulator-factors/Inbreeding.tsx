import React from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';
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
					title={inbreedingCoef.sliderName + `「 ${inbreedingCoef.variableHTML} 」`}
					message={inbreedingCoef.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold">
						{inbreedingCoef.sliderName}
					</Text>
				</HelpContentWrapper>
				<Slider popVariable={inbreedingCoef} isActive={true} />
			</Grid>
		</Box>
	);
}
