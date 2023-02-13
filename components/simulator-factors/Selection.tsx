import React from 'react';

import Slider from '../sliders/Slider';
import { getPopGenVariableByName, VALID_VARIABLES } from '../../data/popGenVariables';
import { Box, Grid, Stack, Text } from '@chakra-ui/react';
import HelpContentWrapper from './HelpContentWrapper';

export default function Selection({ isActive, name, onChange }) {
	const fitnessFactorWAA = getPopGenVariableByName(VALID_VARIABLES.SELECTION_WAA);
	const fitnessFactorWAa = getPopGenVariableByName(VALID_VARIABLES.SELECTION_WAa);
	const fitnessFactorWaa = getPopGenVariableByName(VALID_VARIABLES.SELECTION_Waa);

	return (
		<Box aria-label="Advance Simulation Factor: Selection">
			<Grid>
				<HelpContentWrapper
					title={fitnessFactorWAA.sliderName + `「 ${fitnessFactorWAA.variable} 」`}
					message={fitnessFactorWAA.description}
					status="info"
				>
					<Text fontWeight="bold">{fitnessFactorWAA.sliderName}</Text>
				</HelpContentWrapper>
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" align={{ base: 'center' }}>
					<Slider
						onChange={onChange}
						min={fitnessFactorWAA.min}
						max={fitnessFactorWAA.max}
						step={fitnessFactorWAA.step}
						defaultValue={fitnessFactorWAA.defaultValue}
						label={fitnessFactorWAA.sliderName}
						name={fitnessFactorWAA.name}
						isActive={true}
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
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" align={{ base: 'center' }}>
					<Slider
						onChange={onChange}
						min={fitnessFactorWAa.min}
						max={fitnessFactorWAa.max}
						step={fitnessFactorWAa.step}
						defaultValue={fitnessFactorWAa.defaultValue}
						label={fitnessFactorWAa.sliderName}
						name={fitnessFactorWAa.name}
						isActive={true}
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
				<Stack direction={{ base: 'column', md: 'row' }} spacing="24px" align={{ base: 'center' }}>
					<Slider
						onChange={onChange}
						min={fitnessFactorWaa.min}
						max={fitnessFactorWaa.max}
						step={fitnessFactorWaa.step}
						defaultValue={fitnessFactorWaa.defaultValue}
						label={fitnessFactorWaa.sliderName}
						name={fitnessFactorWaa.name}
						isActive={true}
					/>
				</Stack>
			</Grid>
		</Box>

		// {/*<SingleRowWrapper>*/}
		// {/*	<NameColumn>*/}
		// {/*		<div>*/}
		// {/*			Selection Coefficient*/}
		// {/*			<HelpContentToggle onClick={() => setIsSelectionCoefActive(!isSelectionCoefActive)} />{' '}*/}
		// {/*		</div>*/}
		// {/*		<HelpContent*/}
		// {/*			variable={'s'}*/}
		// {/*			description="This represents the degree of selection against the aa genotype group with respect to the AA genotype group. A value of s = 1 indicates 100% selection against the aa genotype group. A value of s = 0 indicates no selection against the aa genotype group. Note, selection can be defined in terms of the selection and dominance coefficients, or in terms of the three fitness coefficients, but not both."*/}
		// {/*			inputName={'selection-coefficient'}*/}
		// {/*			isOpen={isSelectionCoefActive}*/}
		// {/*		/>*/}
		// {/*	</NameColumn>*/}
		// {/*	<SliderColumnAndValue>*/}
		// {/*		<Slider*/}
		// {/*			onChange={onChange}*/}
		// {/*			min={0}*/}
		// {/*			max={1}*/}
		// {/*			start={1}*/}
		// {/*			step={0.001}*/}
		// {/*			label={'Selection Coefficient'}*/}
		// {/*			name={VALID_VARIABLES.SELECTION_COEFFICIENT}*/}
		// {/*		/>*/}
		// {/*	</SliderColumnAndValue>*/}
		// {/*</SingleRowWrapper>*/}

		// {/*<SingleRowWrapper>*/}
		// {/*	<NameColumn>*/}
		// {/*		<div>*/}
		// {/*			Dominance  Coefficient*/}
		// {/*			<HelpContentToggle onClick={() => setIsDominanceCoefActive(!isDominanceCoefActive)} />{' '}*/}
		// {/*		</div>*/}
		// {/*		<HelpContent*/}
		// {/*			variable={'h'}*/}
		// {/*			description="This represents the degree of dominance of the unfavored a allele in selection. The product of selection and dominance coefficients (i.e., s × h) represents the degree of selection against the Aa genotype group with respect to the AA genotype group. A value of h = 1 indicates that the Aa genotype group is equally unfavored as the aa genotype group. A value of h = 0 indicates that the Aa genotype group is equally favored as the AA genotype group. A value of h = 0.5 represents the additive model, where the selection against the Aa genotype group is half that of the aa genotype group. Negative values of h (representing over‐dominance or “heterozygote advantage”) are not implemented. Instead use fitness coefficients to describe situations of over‐ or under‐dominance. Note, selection can be defined in terms of selection and dominance coefficients, or in terms of the three fitness coefficients, but not both."*/}
		// {/*			inputName={'selection-dominance-coefficient'}*/}
		// {/*			isOpen={isDominanceCoefActive}*/}
		// {/*		/>*/}
		// {/*	</NameColumn>*/}
		// {/*	<SliderColumnAndValue>*/}
		// {/*		<Slider*/}
		// {/*			onChange={onChange}*/}
		// {/*			min={0}*/}
		// {/*			max={1}*/}
		// {/*			start={1}*/}
		// {/*			step={0.001}*/}
		// {/*			label={'Dominance  Coefficient'}*/}
		// {/*			name={VALID_VARIABLES.SELECTION_DOMINANCE_COEFFICIENT}*/}
		// {/*		/>*/}
		// {/*	</SliderColumnAndValue>*/}
		// {/*</SingleRowWrapper>*/}

		// {/*<SingleRowWrapper>*/}
		// {/*	<NameColumn>*/}
		// {/*		<div>Number of Simulations</div>*/}
		// {/*	</NameColumn>*/}
		// {/*	<SliderColumnAndValue>*/}
		// {/*		<SliderOne label={'Number of Simulations'} name={'number-of-simulations'} required />*/}
		// {/*	</SliderColumnAndValue>*/}
		// {/*</SingleRowWrapper>*/}
		// </div>
	);
}
