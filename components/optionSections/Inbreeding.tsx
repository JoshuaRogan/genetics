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

export default function Inbreeding({ isActive, name, onChange, toggleActive }) {
	const [isMigrationRateActive, setIsMigrationRateActive] = React.useState(false);
	const [isMigrantAlleleFreqActive, setIsMigrantAlleleFreqActive] = React.useState(false);

	const inbreedingCoef = getPopGenVariableByName(VALID_VARIABLES.INBREEDING_COEFFICIENT);

	return (
		<div aria-label="Inbreeding Inputs">
			<SectionHeaderWrapper isActive={isActive} name={name} onClick={() => toggleActive()} />
			<SingleRowWrapper>
				<NameColumn>
					<div>
						{inbreedingCoef.sliderName}
						<HelpContentToggle onClick={() => setIsMigrationRateActive(!isMigrationRateActive)} />{' '}
					</div>
					<HelpContent
						variable={inbreedingCoef.variable}
						description={inbreedingCoef.description}
						inputName={inbreedingCoef.name}
						isOpen={isMigrationRateActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						onChange={onChange}
						min={0}
						max={1}
						step={.001}
						start={0}
						label={inbreedingCoef.sliderName}
						name={inbreedingCoef.name}
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
