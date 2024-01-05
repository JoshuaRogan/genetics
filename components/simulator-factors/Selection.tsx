import React from 'react';

import Slider from '../sliders/Slider';
import { getPopGenVariableByName } from '../../data/popGenVariables';
import { Box, Grid, Text } from '@chakra-ui/react';
import HelpContentWrapper from './HelpContentWrapper';
import { VALID_VARIABLES } from '../../types';

export default function Selection() {
	const fitnessFactorWAA = getPopGenVariableByName(VALID_VARIABLES.SELECTION_WAA);
	const fitnessFactorWAa = getPopGenVariableByName(VALID_VARIABLES.SELECTION_WAa);
	const fitnessFactorWaa = getPopGenVariableByName(VALID_VARIABLES.SELECTION_Waa);

	return (
		<Box aria-label="Advanced Simulation Factor: Selection">
			<Grid mb={8}>
				<HelpContentWrapper
					title={fitnessFactorWAA.sliderName + `「 ${fitnessFactorWAA.variableHTML} 」`}
					message={fitnessFactorWAA.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold" dangerouslySetInnerHTML={{ __html: fitnessFactorWAA.sliderName }}></Text>
				</HelpContentWrapper>
				<Slider popVariable={fitnessFactorWAA} isActive={true} />
			</Grid>
			<Grid mb={8}>
				<HelpContentWrapper
					title={fitnessFactorWAa.sliderName + `「 ${fitnessFactorWAa.variableHTML} 」`}
					message={fitnessFactorWAa.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold" dangerouslySetInnerHTML={{ __html: fitnessFactorWAa.sliderName }} />
				</HelpContentWrapper>
				<Slider popVariable={fitnessFactorWAa} isActive={true} />
			</Grid>
			<Grid mb={2}>
				<HelpContentWrapper
					title={fitnessFactorWaa.sliderName + `「 ${fitnessFactorWaa.variableHTML} 」`}
					message={fitnessFactorWaa.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold" dangerouslySetInnerHTML={{ __html: fitnessFactorWaa.sliderName }} />
				</HelpContentWrapper>
				<Slider popVariable={fitnessFactorWaa} isActive={true} />
			</Grid>
		</Box>
	);
}
