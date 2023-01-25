import styled from 'styled-components';
import React from 'react';
import {
	HelpContent,
	HelpContentToggle,
	NameColumn,
	SectionHeaderWrapper,
	SingleRowWrapper,
	SliderColumnAndValue,
} from './optionHelpers';
import Slider from '../sliders/Slider';
import { VALID_VARIABLES } from '../../data/popGenVariables';

export default function Selection({ isActive, name, onChange, toggleActive }) {
	const [isWAASelectionActive, setIsWAASelectionActive] = React.useState(false);
	const [isWAaSelectionActive, setIsWAaSelectionActive] = React.useState(false);
	const [isWaaSelectionActive, setIsWaaSelectionActive] = React.useState(false);

	const [isSelectionCoefActive, setIsSelectionCoefActive] = React.useState(false);
	const [isDominanceCoefActive, setIsDominanceCoefActive] = React.useState(false);

	return (
		<div aria-label="Selection">
			<SectionHeaderWrapper isActive={isActive} name={name} onClick={() => toggleActive()} />

			<SingleRowWrapper>
				<NameColumn>
					<div>
						Fitness Coefficient(WAA)
						<HelpContentToggle onClick={() => setIsWAASelectionActive(!isWAASelectionActive)} />{' '}
					</div>
					<HelpContent
						variable={'wAA'}
						description="This describes the relative fitness of individuals with the AA genotype. Higher values represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wAa and waa). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and dominance coefficients, but not both."
						inputName={'fitness-coefficient-WAA'}
						isOpen={isWAASelectionActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						onChange={onChange}
						min={0}
						max={1}
						start={1}
						step={0.001}
						label={'Fitness Coefficient (WAA)'}
						name={VALID_VARIABLES.SELECTION_WAA}
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>

			<SingleRowWrapper>
				<NameColumn>
					<div>
						Fitness Coefficient(WAa)
						<HelpContentToggle onClick={() => setIsWAaSelectionActive(!isWAaSelectionActive)} />{' '}
					</div>
					<HelpContent
						variable={'wAa'}
						description="This describes the relative fitness of individuals with the Aa genotype. Higher values represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wAA and waa). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and dominance coefficients, but not both."
						inputName={'fitness-coefficient-WAa'}
						isOpen={isWAaSelectionActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						onChange={onChange}
						min={0}
						max={1}
						start={1}
						step={0.001}
						label={'Fitness Coefficient (WAa)'}
						name={VALID_VARIABLES.SELECTION_WAa}
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>

			<SingleRowWrapper>
				<NameColumn>
					<div>
						Fitness Coefficient(Waa)
						<HelpContentToggle onClick={() => setIsWaaSelectionActive(!isWaaSelectionActive)} />{' '}
					</div>
					<HelpContent
						variable={'waa'}
						description="This describes the relative fitness of individuals with the aa genotype. Higher values represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wAA and wAa). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and dominance coefficients, but not both."
						inputName={'fitness-coefficient-Waa'}
						isOpen={isWaaSelectionActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						onChange={onChange}
						min={0}
						max={1}
						start={1}
						step={0.001}
						label={'Fitness Coefficient (Waa)'}
						name={VALID_VARIABLES.SELECTION_Waa}
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>

			{/*<SingleRowWrapper>*/}
			{/*	<NameColumn>*/}
			{/*		<div>*/}
			{/*			Selection Coefficient*/}
			{/*			<HelpContentToggle onClick={() => setIsSelectionCoefActive(!isSelectionCoefActive)} />{' '}*/}
			{/*		</div>*/}
			{/*		<HelpContent*/}
			{/*			variable={'s'}*/}
			{/*			description="This represents the degree of selection against the aa genotype group with respect to the AA genotype group. A value of s = 1 indicates 100% selection against the aa genotype group. A value of s = 0 indicates no selection against the aa genotype group. Note, selection can be defined in terms of the selection and dominance coefficients, or in terms of the three fitness coefficients, but not both."*/}
			{/*			inputName={'selection-coefficient'}*/}
			{/*			isOpen={isSelectionCoefActive}*/}
			{/*		/>*/}
			{/*	</NameColumn>*/}
			{/*	<SliderColumnAndValue>*/}
			{/*		<Slider*/}
			{/*			onChange={onChange}*/}
			{/*			min={0}*/}
			{/*			max={1}*/}
			{/*			start={1}*/}
			{/*			step={0.001}*/}
			{/*			label={'Selection Coefficient'}*/}
			{/*			name={VALID_VARIABLES.SELECTION_COEFFICIENT}*/}
			{/*		/>*/}
			{/*	</SliderColumnAndValue>*/}
			{/*</SingleRowWrapper>*/}

			{/*<SingleRowWrapper>*/}
			{/*	<NameColumn>*/}
			{/*		<div>*/}
			{/*			Dominance  Coefficient*/}
			{/*			<HelpContentToggle onClick={() => setIsDominanceCoefActive(!isDominanceCoefActive)} />{' '}*/}
			{/*		</div>*/}
			{/*		<HelpContent*/}
			{/*			variable={'h'}*/}
			{/*			description="This represents the degree of dominance of the unfavored a allele in selection. The product of selection and dominance coefficients (i.e., s × h) represents the degree of selection against the Aa genotype group with respect to the AA genotype group. A value of h = 1 indicates that the Aa genotype group is equally unfavored as the aa genotype group. A value of h = 0 indicates that the Aa genotype group is equally favored as the AA genotype group. A value of h = 0.5 represents the additive model, where the selection against the Aa genotype group is half that of the aa genotype group. Negative values of h (representing over‐dominance or “heterozygote advantage”) are not implemented. Instead use fitness coefficients to describe situations of over‐ or under‐dominance. Note, selection can be defined in terms of selection and dominance coefficients, or in terms of the three fitness coefficients, but not both."*/}
			{/*			inputName={'selection-dominance-coefficient'}*/}
			{/*			isOpen={isDominanceCoefActive}*/}
			{/*		/>*/}
			{/*	</NameColumn>*/}
			{/*	<SliderColumnAndValue>*/}
			{/*		<Slider*/}
			{/*			onChange={onChange}*/}
			{/*			min={0}*/}
			{/*			max={1}*/}
			{/*			start={1}*/}
			{/*			step={0.001}*/}
			{/*			label={'Dominance  Coefficient'}*/}
			{/*			name={VALID_VARIABLES.SELECTION_DOMINANCE_COEFFICIENT}*/}
			{/*		/>*/}
			{/*	</SliderColumnAndValue>*/}
			{/*</SingleRowWrapper>*/}

			{/*<SingleRowWrapper>*/}
			{/*	<NameColumn>*/}
			{/*		<div>Number of Simulations</div>*/}
			{/*	</NameColumn>*/}
			{/*	<SliderColumnAndValue>*/}
			{/*		<SliderOne label={'Number of Simulations'} name={'number-of-simulations'} required />*/}
			{/*	</SliderColumnAndValue>*/}
			{/*</SingleRowWrapper>*/}
		</div>
	);
}
