import styled from 'styled-components';
import React from 'react';

import { getPopGenVariableByName, VALID_VARIABLES } from '../../data/popGenVariables';
import HelpContentWrapper from './HelpContentWrapper';
import { NoteType } from '../../styles/shared/Note';
import {
	Box,
	Flex,
	HStack,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import Slider from '../sliders/Slider';

// import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark } from '@chakra-ui/react';

function formatThousandToDecimal(number: number) {
	return number / 1000;
}

const SliderWrapper = styled.div`
	display: grid;
`;

export default function BaseSimulation({ isActive, name, onChange }) {
	const numberOfGenerations = getPopGenVariableByName(VALID_VARIABLES.NUM_GENERATIONS);
	const populationSize = getPopGenVariableByName(VALID_VARIABLES.POPULATION_SIZE);
	const startingAlleleFreq = getPopGenVariableByName(VALID_VARIABLES.STARTING_ALLELE_FREQ);

	return (
		<Box aria-label="Base Simulation inputs">
			<SliderWrapper>
				<HelpContentWrapper
					title={populationSize.sliderName + `「 ${populationSize.variable} 」`}
					message={populationSize.description}
					status="info"
				>
					<Text fontWeight="bold">{populationSize.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" align={{ base: 'center' }}>
					<Slider
						onChange={onChange}
						min={1}
						max={10000}
						defaultValue={populationSize.defaultValue}
						label={'Population size'}
						name={populationSize.name}
						isActive={true}
					/>
				</Stack>
			</SliderWrapper>

			<SliderWrapper>
				<HelpContentWrapper
					title={numberOfGenerations.sliderName + `「 ${numberOfGenerations.variable} 」`}
					message={numberOfGenerations.description}
					status="info"
				>
					<Text fontWeight="bold">{numberOfGenerations.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" align={{ base: 'center' }}>
					<Slider
						onChange={onChange}
						min={1}
						max={10000}
						defaultValue={numberOfGenerations.defaultValue}
						label={'Number of generations'}
						name={numberOfGenerations.name}
						isActive={true}
					/>
				</Stack>
			</SliderWrapper>

			<SliderWrapper>
				<HelpContentWrapper
					title={startingAlleleFreq.sliderName + `「 ${startingAlleleFreq.variable} 」`}
					message={startingAlleleFreq.description}
					status="info"
				>
					<Text fontWeight="bold">{startingAlleleFreq.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" align={{ base: 'center' }}>
					<Slider
						onChange={onChange}
						min={startingAlleleFreq.min}
						max={startingAlleleFreq.max}
						step={startingAlleleFreq.step}
						defaultValue={startingAlleleFreq.defaultValue}
						label={'Number of generations'}
						name={startingAlleleFreq.name}
						isActive={true}
					/>
				</Stack>
			</SliderWrapper>
		</Box>
	);
}
