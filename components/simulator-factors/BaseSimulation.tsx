import React from 'react';

import { getPopGenVariableByName, VALID_SECTIONS, VALID_VARIABLES } from '../../data/popGenVariables';
import HelpContentWrapper from './HelpContentWrapper';
import { Box, Checkbox, Grid, Stack, Text } from '@chakra-ui/react';
import Slider from '../sliders/Slider';

export default function BaseSimulation({ isActive, name, onChange, isReplicated, toggleActiveSection }) {
	const [isInfinitePopulation, setIsInfinitePopulation] = React.useState(false);

	const numberOfGenerations = getPopGenVariableByName(VALID_VARIABLES.NUM_GENERATIONS);
	const populationSize = getPopGenVariableByName(VALID_VARIABLES.POPULATION_SIZE);
	const startingAlleleFreq = getPopGenVariableByName(VALID_VARIABLES.STARTING_ALLELE_FREQ);
	const bulkSimulator = getPopGenVariableByName(VALID_VARIABLES.NUM_REPLICATED);

	const onInfinitePopulationChecked = (e) => {
		setIsInfinitePopulation(e.target.checked);
		toggleActiveSection(VALID_SECTIONS.FINITE);
	};

	return (
		<Box aria-label={name}>
			<Grid mb={4}>
				<HelpContentWrapper
					title={populationSize.sliderName + `「 ${populationSize.variable} 」`}
					message={populationSize.description}
					status="info"
				>
					<Text fontWeight="bold">{populationSize.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
					<Slider
						name={populationSize.name}
						label={populationSize.sliderName}
						defaultValue={populationSize.defaultValue}
						min={populationSize.min}
						max={populationSize.max}
						step={populationSize.step}
						isActive={true}
						isInfinite={isInfinitePopulation}
						onChange={onChange}
					/>
					<Checkbox
						role="checkbox"
						aria-label="Changes population size to infinite for the current simulation"
						size="lg"
						colorScheme="red"
						onChange={onInfinitePopulationChecked}
					>
						Infinite (∞)
					</Checkbox>
				</Stack>
			</Grid>

			<Grid mb={4}>
				<HelpContentWrapper
					title={numberOfGenerations.sliderName + `「 ${numberOfGenerations.variable} 」`}
					message={numberOfGenerations.description}
					status="info"
				>
					<Text fontWeight="bold">{numberOfGenerations.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
					<Slider
						name={numberOfGenerations.name}
						label={numberOfGenerations.sliderName}
						defaultValue={numberOfGenerations.defaultValue}
						min={numberOfGenerations.min}
						max={numberOfGenerations.max}
						step={numberOfGenerations.step}
						isActive={true}
						onChange={onChange}
					/>
				</Stack>
			</Grid>

			<Grid mb={4}>
				<HelpContentWrapper
					title={startingAlleleFreq.sliderName + `「 ${startingAlleleFreq.variable} 」`}
					message={startingAlleleFreq.description}
					status="info"
				>
					<Text fontWeight="bold">{startingAlleleFreq.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
					<Slider
						name={startingAlleleFreq.name}
						label={startingAlleleFreq.sliderName}
						defaultValue={startingAlleleFreq.defaultValue}
						min={startingAlleleFreq.min}
						max={startingAlleleFreq.max}
						step={startingAlleleFreq.step}
						isActive={true}
						onChange={onChange}
					/>
				</Stack>
			</Grid>

			{isReplicated && (
				<Grid mb={4}>
					<HelpContentWrapper
						title={bulkSimulator.sliderName + `「 ${bulkSimulator.variable} 」`}
						message={bulkSimulator.description}
						status="info"
					>
						<Text fontWeight="bold">{bulkSimulator.sliderName}</Text>
					</HelpContentWrapper>
					<Stack direction={{ base: 'column', md: 'row' }} mt={4} spacing="24px" align={{ base: 'center' }}>
						<Slider
							name={bulkSimulator.name}
							label={bulkSimulator.sliderName}
							aria-label={bulkSimulator.sliderName}
							defaultValue={bulkSimulator.defaultValue}
							min={bulkSimulator.min}
							max={bulkSimulator.max}
							step={bulkSimulator.step}
							isActive={true}
							onChange={onChange}
						/>
					</Stack>
				</Grid>
			)}
		</Box>
	);
}
