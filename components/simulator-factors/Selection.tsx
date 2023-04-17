import React from 'react';

import Slider from '../sliders/Slider';
import { getPopGenVariableByName, VALID_VARIABLES } from '../../data/popGenVariables';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import HelpContentWrapper from './HelpContentWrapper';

export default function Selection({ name, onChange }) {
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
					<Slider
						name={fitnessFactorWAA.name}
						label={fitnessFactorWAA.sliderName}
						min={fitnessFactorWAA.min}
						max={fitnessFactorWAA.max}
						step={fitnessFactorWAA.step}
						defaultValue={fitnessFactorWAA.defaultValue}
						isActive={true}
						onChange={onChange}
					/>
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
					<Slider
						name={fitnessFactorWAa.name}
						label={fitnessFactorWAa.sliderName}
						min={fitnessFactorWAa.min}
						max={fitnessFactorWAa.max}
						step={fitnessFactorWAa.step}
						defaultValue={fitnessFactorWAa.defaultValue}
						isActive={true}
						onChange={onChange}
					/>
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
					<Slider
						name={fitnessFactorWaa.name}
						label={fitnessFactorWaa.sliderName}
						min={fitnessFactorWaa.min}
						max={fitnessFactorWaa.max}
						step={fitnessFactorWaa.step}
						defaultValue={fitnessFactorWaa.defaultValue}
						isActive={true}
						onChange={onChange}
					/>
				</Stack>
			</Grid>
		</Box>
	);
}
