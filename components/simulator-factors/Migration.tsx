import React from 'react';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import Slider from '../sliders/Slider';
import { getPopGenVariableByName, VALID_VARIABLES } from '../../data/popGenVariables';
import HelpContentWrapper from './HelpContentWrapper';

export default function Migration({ isActive, name, onChange }) {
	const migrationRate = getPopGenVariableByName(VALID_VARIABLES.MIGRATION_MIGRATION_RATE);
	const migrantAllelFreq = getPopGenVariableByName(VALID_VARIABLES.MIGRATION_MIGRANT_ALLELE_FREQ);

	return (
		<Box aria-label="Advance Simulation Factor: Migration">
			<Grid>
				<HelpContentWrapper
					title={migrationRate.sliderName + `「 ${migrationRate.variable} 」`}
					message={migrationRate.description}
					status="info"
				>
					<Text fontWeight="bold">{migrationRate.sliderName}</Text>
				</HelpContentWrapper>
				<Stack
					direction={{ base: 'column', md: 'row' }}
					spacing="24px"
					mt={2}
					align={{ base: 'center', md: 'self-start' }}
				>
					<Slider
						onChange={onChange}
						min={migrationRate.min}
						max={migrationRate.max}
						step={migrationRate.step}
						defaultValue={migrationRate.defaultValue}
						label={migrationRate.sliderName}
						name={migrationRate.name}
						isActive={true}
					/>
				</Stack>
			</Grid>
			<Grid>
				<HelpContentWrapper
					title={migrantAllelFreq.sliderName + `「 ${migrantAllelFreq.variable} 」`}
					message={migrantAllelFreq.description}
					status="info"
				>
					<Text fontWeight="bold">{migrantAllelFreq.sliderName}</Text>
				</HelpContentWrapper>
				<Stack
					direction={{ base: 'column', md: 'row' }}
					spacing="24px"
					mt={2}
					align={{ base: 'center', md: 'self-start' }}
				>
					<Slider
						onChange={onChange}
						min={migrantAllelFreq.min}
						max={migrantAllelFreq.max}
						step={migrantAllelFreq.step}
						defaultValue={migrantAllelFreq.defaultValue}
						label={migrantAllelFreq.sliderName}
						name={migrantAllelFreq.name}
						isActive={true}
					/>
				</Stack>
			</Grid>
		</Box>
	);
}
