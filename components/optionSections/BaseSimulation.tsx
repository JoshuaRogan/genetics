import styled from 'styled-components';
import React from 'react';
import Slider from '../sliders/Slider';

import {
	NameColumn,
	SectionHeaderWrapper,
	SingleRowWrapper,
	SliderColumnAndValue,
	HelpContent,
	HelpContentToggle,
} from './optionHelpers';
import { getPopGenVariableByName, VALID_VARIABLES } from '../../data/popGenVariables';

function formatThousandToDecimal(number: number) {
	return number / 1000;
}

export default function BaseSimulation({ isActive, name, onChange }) {
	const [isSectionActive, setIsSectionActive] = React.useState(true);
	const [isNumberOfGenHelpActive, setIsNumberOfGenHelpActive] = React.useState(false);
	const [isStartingAlleleFreqActive, setIsStartingAlleleFreqActive] = React.useState(false);

	const numberOfGenerations = getPopGenVariableByName(VALID_VARIABLES.NUM_GENERATIONS);
	const startingAlleleFreq = getPopGenVariableByName(VALID_VARIABLES.STARTING_ALLELE_FREQ);

	return (
		<div aria-label="Base Simulation inputs">
			<SectionHeaderWrapper
				isActive={isSectionActive}
				name={name}
				isCheckable={false}
				onClick={() => setIsSectionActive(!isSectionActive)}
			/>
			<SingleRowWrapper>
				<NameColumn>
					<div>
						{numberOfGenerations.sliderName}
						<HelpContentToggle onClick={() => setIsNumberOfGenHelpActive(!isNumberOfGenHelpActive)} />{' '}
					</div>
					<HelpContent
						variable={numberOfGenerations.variable}
						description="This is the number of generations to be simulated"
						inputName={'number-of-generations'}
						isOpen={isNumberOfGenHelpActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						onChange={onChange}
						min={1}
						max={10000}
						start={numberOfGenerations.defaultValue}
						label={'Number of generations'}
						name={'number-of-generations'}
						required
						isActive={true}
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>

			<SingleRowWrapper>
				<NameColumn>
					<div>
						{startingAlleleFreq.sliderName}
						<HelpContentToggle onClick={() => setIsStartingAlleleFreqActive(!isStartingAlleleFreqActive)} />{' '}
					</div>
					<HelpContent
						variable={startingAlleleFreq.variable}
						description={startingAlleleFreq.description}
						inputName={'starting-allele-frequency'}
						isOpen={isStartingAlleleFreqActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						onChange={onChange}
						min={0}
						max={1}
						step={0.001}
						start={startingAlleleFreq.defaultValue}
						label={'Starting Allele Frequency'}
						name={'starting-allele-frequency'}
						required
						isDecimal
						isActive={true}
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>
		</div>
	);
}
