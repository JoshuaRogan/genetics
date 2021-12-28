import styled from 'styled-components';
import React from 'react';
import SliderOne from '../SliderOne';
import { NameColumn, SectionHeaderWrapper, SingleRowWrapper, SliderColumnAndValue } from './optionHelpers';

export default function FinitePopulation({ isActive, name }) {
	return (
		<div>
			<SectionHeaderWrapper isActive={isActive} name={name} />
			<SingleRowWrapper>
				<NameColumn>
					<div>Population Size</div>
				</NameColumn>
				<SliderColumnAndValue>
					<SliderOne label={'Population Size'} name={'populatio-size'} />
				</SliderColumnAndValue>
			</SingleRowWrapper>

			<SingleRowWrapper>
				<NameColumn>
					<div>Number of Simulations</div>
				</NameColumn>
				<SliderColumnAndValue>
					<SliderOne label={'Number of Simulations'} name={'number-of-simulations'} required />
				</SliderColumnAndValue>
			</SingleRowWrapper>
		</div>
	);
}
