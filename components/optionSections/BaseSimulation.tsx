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

function formatThousandToDecimal(number: number) {
	return number / 1000;
}

export default function BaseSimulation({ isActive, name, onChange }) {
	const [isSectionActive, setIsSectionActive] = React.useState(true);
	const [isNumberOfGenHelpActive, setIsNumberOfGenHelpActive] = React.useState(false);
	const [isStartingAlleleFreqActive, setIsStartingAlleleFreqActive] = React.useState(false);

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
						Number of Generations
						<HelpContentToggle onClick={() => setIsNumberOfGenHelpActive(!isNumberOfGenHelpActive)} />{' '}
					</div>
					<HelpContent
						variable={'t'}
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
						start={500}
						label={'Number of generations'}
						name={'number-of-generations'}
						required
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>

			<SingleRowWrapper>
				<NameColumn>
					<div>
						Starting Allele Frequency
						<HelpContentToggle onClick={() => setIsStartingAlleleFreqActive(!isStartingAlleleFreqActive)} />{' '}
					</div>
					<HelpContent
						variable={'p'}
						description="This is the frequency of the allele of interest, A, at generation 0."
						inputName={'starting-allele-frequency'}
						isOpen={isStartingAlleleFreqActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						onChange={onChange}
						min={0}
						max={1000}
						start={500}
						formatter={formatThousandToDecimal}
						label={'Starting Allele Frequency'}
						name={'starting-allele-frequency'}
						required
						isDecimal
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>
		</div>
	);
}
