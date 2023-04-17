import React from 'react';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import Slider from '../sliders/Slider';
import { getPopGenVariableByName, VALID_VARIABLES } from '../../data/popGenVariables';
import HelpContentWrapper from './HelpContentWrapper';

export default function Inbreeding({ name, onChange }) {
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
					<Slider
						name={inbreedingCoef.name}
						label={inbreedingCoef.sliderName}
						min={inbreedingCoef.min}
						max={inbreedingCoef.max}
						step={inbreedingCoef.step}
						defaultValue={inbreedingCoef.defaultValue}
						isActive={true}
						onChange={onChange}
					/>
				</Stack>
			</Grid>
		</Box>
	);
}
