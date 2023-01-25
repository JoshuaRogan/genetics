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
import { getPopGenVariableByName, VALID_VARIABLES } from '../../data/popGenVariables';

export default function Mutation({ isActive, name, onChange, toggleActive }) {
	const [isFowardMutationActive, setIsFowardMutationActive] = React.useState(false);
	const [isBackwardMutationActive, setIsBackwardMutationActive] = React.useState(false);

	const forwardMutation = getPopGenVariableByName(VALID_VARIABLES.MUTATION_FORWARD_MUTATION);
	const backwardMutation = getPopGenVariableByName(VALID_VARIABLES.MUTATION_BACKWARD_MUTATION);
	const fowardMutationEpon = getPopGenVariableByName(VALID_VARIABLES.MUTATION_FORWARD_MUTATION_EXPONENT);
	const backwardMutationExpon = getPopGenVariableByName(VALID_VARIABLES.MUTATION_BACKWARD_MUTATION_EXPONENT);

	return (
		<div aria-label="Mutation">
			<SectionHeaderWrapper isActive={isActive} name={name} onClick={() => toggleActive()} />

			<SingleRowWrapper>
				<NameColumn>
					<div>
						{forwardMutation.sliderName}
						<HelpContentToggle onClick={() => setIsFowardMutationActive(!isFowardMutationActive)} />{' '}
					</div>
					<HelpContent
						variable={forwardMutation.variable}
						variableHTML={forwardMutation.variableHTML}
						description="The rate at which allele A mutates to allele a per generation."
						inputName={'foward-mutation-rate'}
						isOpen={isFowardMutationActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						isActive={isActive}
						onChange={onChange}
						min={0}
						max={9.9999}
						start={0}
						step={0.001}
						label={forwardMutation.sliderName}
						name={VALID_VARIABLES.MUTATION_FORWARD_MUTATION}
					/>
				</SliderColumnAndValue>
				<SliderColumnAndValue>
					<Slider
						isActive={isActive}
						onChange={onChange}
						min={-10}
						max={-1}
						start={-5}
						step={1}
						label={'10 to the nth power (-10 to -1) for forward mutation'}
						name={VALID_VARIABLES.MUTATION_FORWARD_MUTATION_EXPONENT}
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>

			<SingleRowWrapper>
				<NameColumn>
					<div>
						{backwardMutation.sliderName}
						<HelpContentToggle onClick={() => setIsBackwardMutationActive(!isBackwardMutationActive)} />{' '}
					</div>
					<HelpContent
						variable={backwardMutation.variable}
						variableHTML={backwardMutation.variableHTML}
						description="The rate at which allele a mutates to allele A per generation."
						inputName={'backward-mutation-rate'}
						isOpen={isBackwardMutationActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						isActive={isActive}
						onChange={onChange}
						min={0}
						max={9.9999}
						start={0}
						step={0.001}
						label={backwardMutation.sliderName}
						name={VALID_VARIABLES.MUTATION_BACKWARD_MUTATION}
					/>
				</SliderColumnAndValue>
				<SliderColumnAndValue>
					<Slider
						isActive={isActive}
						onChange={onChange}
						min={-10}
						max={-1}
						start={-5}
						step={1}
						label={'10 to the nth power (-10 to -1) for backward mutation'}
						name={VALID_VARIABLES.MUTATION_BACKWARD_MUTATION_EXPONENT}
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>

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
