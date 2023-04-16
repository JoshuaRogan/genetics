import React from 'react';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import Slider from '../sliders/Slider';
import { getPopGenVariableByName, VALID_VARIABLES } from '../../data/popGenVariables';
import HelpContentWrapper from './HelpContentWrapper';

export default function AssortativeMating({ name, onChange }) {
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
					<Slider
						name={positiveAssortMatingFreq.name}
						label={positiveAssortMatingFreq.sliderName}
						min={positiveAssortMatingFreq.min}
						max={positiveAssortMatingFreq.max}
						step={positiveAssortMatingFreq.step}
						defaultValue={positiveAssortMatingFreq.defaultValue}
						isActive={true}
						onChange={onChange}
					/>
				</Stack>
			</Grid>
		</Box>
	);
}
