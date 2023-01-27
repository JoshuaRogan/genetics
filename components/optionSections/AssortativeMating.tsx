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

export default function AssortativeMating({ isActive, name, onChange, toggleActive }) {
	const [isPositiveAssortMatFreqActive, setIsPositiveAssortMatFreqActive] = React.useState(false);

	const positiveAssortMatingFreq = getPopGenVariableByName(VALID_VARIABLES.ASSORT_MATING_POSITIVE_FREQ);

	return (
		<div aria-label="Inbreeding Inputs">
			<SectionHeaderWrapper isActive={isActive} name={name} onClick={() => toggleActive()} />
			<SingleRowWrapper>
				<NameColumn>
					<div>
						{positiveAssortMatingFreq.sliderName}
						<HelpContentToggle onClick={() => setIsPositiveAssortMatFreqActive(!isPositiveAssortMatFreqActive)} />{' '}
					</div>
					<HelpContent
						variable={positiveAssortMatingFreq.variable}
						variableHTML={positiveAssortMatingFreq.variableHTML}
						description={positiveAssortMatingFreq.description}
						inputName={positiveAssortMatingFreq.name}
						isOpen={isPositiveAssortMatFreqActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						isActive={isActive}
						onChange={onChange}
						min={0}
						max={1}
						step={0.001}
						start={0}
						label={positiveAssortMatingFreq.sliderName}
						name={positiveAssortMatingFreq.name}
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
