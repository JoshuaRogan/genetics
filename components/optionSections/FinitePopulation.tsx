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

export default function FinitePopulation({ isActive, name, onChange, toggleActive }) {
	const [isPopulationSizeActive, setIsPopulationSizeActive] = React.useState(false);

	return (
		<div aria-label="Finite Population Simulator Inputs">
			<SectionHeaderWrapper isActive={isActive} name={name} onClick={() => toggleActive()} />
			<SingleRowWrapper>
				<NameColumn>
					<div>
						Population Size
						<HelpContentToggle onClick={() => setIsPopulationSizeActive(!isPopulationSizeActive)} />{' '}
					</div>
					<HelpContent
						variable={'N'}
						description="This is the number of individuals, N, per generation in the simulation. Note, the number of chromosomes is 2N. If this parameter is not enabled, the simulation will model the theoretical infinitely sized population."
						inputName={'population-size'}
						isOpen={isPopulationSizeActive}
					/>
				</NameColumn>
				<SliderColumnAndValue>
					<Slider
						onChange={onChange}
						min={1}
						max={10000}
						start={500}
						label={'Population Size'}
						name={'population-size'}
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
