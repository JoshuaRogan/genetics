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
	const [isBottleNeckPopSizeActive, setIsBottleNeckPopSizeActive] = React.useState(false);

	const generationToOverrideStart = getPopGenVariableByName(VALID_VARIABLES.BOTTLENECK_GEN_TO_OVERRIDE_START);
	const generationToOverrideEnd = getPopGenVariableByName(VALID_VARIABLES.BOTTLENECK_GEN_TO_OVERRIDE_END);
	const bottleNeckPopSize = getPopGenVariableByName(VALID_VARIABLES.BOTTLENECK_POPULATION_SIZE);

	return (
		<div aria-label="Inbreeding Inputs">
			<SectionHeaderWrapper isActive={isActive} name={name} onClick={() => toggleActive()} />

			<SingleRowWrapper>
				<NameColumn>
					<div>
						{generationToOverrideStart.sliderName}
						<HelpContentToggle onClick={() => setIsPositiveAssortMatFreqActive(!isPositiveAssortMatFreqActive)} />{' '}
					</div>
					<HelpContent
						variable={generationToOverrideStart.variable}
						variableHTML={''}
						description={generationToOverrideStart.description}
						inputName={generationToOverrideStart.name}
						isOpen={isPositiveAssortMatFreqActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						isActive={isActive}
						onChange={onChange}
						min={0}
						max={500} /* Get this number from the value of another liser*/
						step={1}
						start={0}
						label={generationToOverrideStart.sliderName}
						name={generationToOverrideStart.name}
					/>
				</SliderColumnAndValue>
				<SliderColumnAndValue>
					<Slider
						isActive={isActive}
						onChange={onChange}
						min={0}
						max={500} /* Get this number from the value of another liser*/
						step={1}
						start={50}
						label={generationToOverrideEnd.sliderName}
						name={generationToOverrideEnd.name}
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>

			<SingleRowWrapper>
				<NameColumn>
					<div>
						{bottleNeckPopSize.sliderName}
						<HelpContentToggle onClick={() => setIsBottleNeckPopSizeActive(!isBottleNeckPopSizeActive)} />{' '}
					</div>
					<HelpContent
						variable={bottleNeckPopSize.variable}
						variableHTML={bottleNeckPopSize.variableHTML}
						description={bottleNeckPopSize.description}
						inputName={bottleNeckPopSize.name}
						isOpen={isBottleNeckPopSizeActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						isActive={isActive}
						onChange={onChange}
						min={0}
						max={10000}
						step={1}
						start={5000}
						label={bottleNeckPopSize.sliderName}
						name={bottleNeckPopSize.name}
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
