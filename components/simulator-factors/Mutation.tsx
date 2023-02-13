import React from 'react';
import Slider from '../sliders/Slider';
import { getPopGenVariableByName, VALID_VARIABLES } from '../../data/popGenVariables';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import HelpContentWrapper from './HelpContentWrapper';

export default function Mutation({ isActive, name, onChange }) {
	const forwardMutation = getPopGenVariableByName(VALID_VARIABLES.MUTATION_FORWARD_MUTATION);
	const backwardMutation = getPopGenVariableByName(VALID_VARIABLES.MUTATION_BACKWARD_MUTATION);
	const fowardMutationEpon = getPopGenVariableByName(VALID_VARIABLES.MUTATION_FORWARD_MUTATION_EXPONENT);
	const backwardMutationExpon = getPopGenVariableByName(VALID_VARIABLES.MUTATION_BACKWARD_MUTATION_EXPONENT);

	return (
		<Box aria-label="Advance Simulation Factor: Selection">
			<Grid>
				<HelpContentWrapper
					title={forwardMutation.sliderName + `「 ${forwardMutation.variable} 」`}
					message={forwardMutation.description}
					status="info"
				>
					<Text fontWeight="bold">{forwardMutation.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" align={{ base: 'center', md: 'self-start' }}>
					<Slider
						onChange={onChange}
						min={forwardMutation.min}
						max={forwardMutation.max}
						step={forwardMutation.step}
						defaultValue={forwardMutation.defaultValue}
						label={forwardMutation.sliderName}
						name={forwardMutation.name}
						isActive={true}
					/>
					<Slider
						onChange={onChange}
						min={fowardMutationEpon.min}
						max={fowardMutationEpon.max}
						step={fowardMutationEpon.step}
						defaultValue={fowardMutationEpon.defaultValue}
						label={fowardMutationEpon.sliderName}
						name={fowardMutationEpon.name}
						isActive={true}
					/>
				</Stack>
			</Grid>
			<Grid>
				<HelpContentWrapper
					title={backwardMutation.sliderName + `「 ${backwardMutation.variable} 」`}
					message={backwardMutation.description}
					status="info"
				>
					<Text fontWeight="bold">{backwardMutation.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" align={{ base: 'center', md: 'self-start' }}>
					<Slider
						onChange={onChange}
						min={backwardMutation.min}
						max={backwardMutation.max}
						step={backwardMutation.step}
						defaultValue={backwardMutation.defaultValue}
						label={backwardMutation.sliderName}
						name={backwardMutation.name}
						isActive={true}
					/>
					<Slider
						onChange={onChange}
						min={backwardMutationExpon.min}
						max={backwardMutationExpon.max}
						step={backwardMutationExpon.step}
						defaultValue={backwardMutationExpon.defaultValue}
						label={backwardMutationExpon.sliderName}
						name={backwardMutationExpon.name}
						isActive={true}
					/>
				</Stack>
			</Grid>
		</Box>
	);
}
