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
import {getPopGenVariableByName, VALID_VARIABLES} from "../../data/popGenVariables";

export default function AssortativeMating({ isActive, name, onChange, toggleActive }) {
	const [isPositiveAssortMatFreqActive, setIsPositiveAssortMatFreqActive] = React.useState(false);
	const [isBottleNeckPopSizeActive, setIsBottleNeckPopSizeActive] = React.useState(false);

	const generationToOverride = getPopGenVariableByName(VALID_VARIABLES.BOTTLENECK_GEN_TO_OVVERRIDE);
	const bottleNeckPopSize = getPopGenVariableByName(VALID_VARIABLES.BOTTLENECK_POPULATION_SIZE);

	return (
		<div aria-label="Inbreeding Inputs">
			<SectionHeaderWrapper isActive={isActive} name={name} onClick={() => toggleActive()} />

			<SingleRowWrapper>
				<NameColumn>
					<div>
						{generationToOverride.sliderName}
						<HelpContentToggle onClick={() => setIsPositiveAssortMatFreqActive(!isPositiveAssortMatFreqActive)} />{' '}
					</div>
					<HelpContent
						variable={''}
						description={generationToOverride.description}
						inputName={generationToOverride.name}
						isOpen={isPositiveAssortMatFreqActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						onChange={onChange}
						min={0}
						max={1}
						step={.001}
						start={0}
						label={generationToOverride.sliderName}
						name={generationToOverride.name}
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
						onChange={onChange}
						min={0}
						max={1}
						step={.001}
						start={0}
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
