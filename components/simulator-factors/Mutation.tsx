import React from 'react';
import Slider from '../sliders/Slider';
import { getPopGenVariableByName } from '../../data/popGenVariables';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import HelpContentWrapper from './HelpContentWrapper';
import { VALID_VARIABLES } from '../../types';

export default function Mutation() {
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
				<Stack
					direction={{ base: 'column', md: 'row' }}
					spacing="24px"
					mt={2}
					align={{ base: 'center', md: 'self-start' }}
				>
					<Slider popVariable={forwardMutation} isActive={true} isInfinite={false} />
					<Slider popVariable={fowardMutationEpon} isActive={true} isInfinite={false} />
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
				<Stack
					direction={{ base: 'column', md: 'row' }}
					spacing="24px"
					mt={2}
					align={{ base: 'center', md: 'self-start' }}
				>
					<Slider popVariable={backwardMutation} isActive={true} isInfinite={false} />
					<Slider popVariable={backwardMutationExpon} isActive={true} isInfinite={false} />
				</Stack>
			</Grid>
		</Box>
	);
}
