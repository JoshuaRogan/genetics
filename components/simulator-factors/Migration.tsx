import React from 'react';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import Slider from '../sliders/Slider';
import { getPopGenVariableByName } from '../../data/popGenVariables';
import HelpContentWrapper from './HelpContentWrapper';
import { VALID_VARIABLES } from '../../types';

export default function Migration() {
	const migrationRate = getPopGenVariableByName(VALID_VARIABLES.MIGRATION_MIGRATION_RATE);
	const migrantAllelFreq = getPopGenVariableByName(VALID_VARIABLES.MIGRATION_MIGRANT_ALLELE_FREQ);

	return (
		<Box aria-label="Advance Simulation Factor: Migration">
			<Grid mb={8}>
				<HelpContentWrapper
					title={migrationRate.sliderName + `「 ${migrationRate.variableHTML} 」`}
					message={migrationRate.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold">
						{migrationRate.sliderName}
					</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" mt={4} align="center">
					<Slider popVariable={migrationRate} isActive={true} />
				</Stack>
			</Grid>
			<Grid mb={4}>
				<HelpContentWrapper
					title={migrantAllelFreq.sliderName + `「 ${migrantAllelFreq.variableHTML} 」`}
					message={migrantAllelFreq.description}
					status="info"
				>
					<Text as="h3" fontWeight="bold">
						{migrantAllelFreq.sliderName}
					</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" mt={4} align="center">
					<Slider popVariable={migrantAllelFreq} isActive={true} />
				</Stack>
			</Grid>
		</Box>
	);
}
