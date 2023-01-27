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

export default function FinitePopulation({ isActive, name, onChange, toggleActive }) {
	const [isPopulationSizeActive, setIsPopulationSizeActive] = React.useState(false);
	const populationSize = getPopGenVariableByName(VALID_VARIABLES.POPULATION_SIZE);

	return (
		<div aria-label="Finite Population Simulator Inputs">
			<SectionHeaderWrapper isActive={isActive} name={name} onClick={() => toggleActive()} />
			<SingleRowWrapper>
				<NameColumn>
					<div>
						{populationSize.sliderName}
						<HelpContentToggle onClick={() => setIsPopulationSizeActive(!isPopulationSizeActive)} />{' '}
					</div>
					<HelpContent
						variable={populationSize.variable}
						description={populationSize.description}
						inputName={'population-size'}
						isOpen={isPopulationSizeActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						isActive={isActive}
						onChange={onChange}
						min={1}
						max={10000}
						start={populationSize.defaultValue}
						label={populationSize.sliderName}
						name={'population-size'}
					/>
				</SliderColumnAndValue>
			</SingleRowWrapper>
		</div>
	);
}
