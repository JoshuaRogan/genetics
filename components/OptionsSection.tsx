import styled from 'styled-components';
import React from 'react';
import SliderOne from './SliderOne';
import { SectionHeaderWrapper } from './optionSections/optionHelpers';

// Main section across the page
const SingleRowWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
`;

const SliderColumnAndValue = styled.div`
	flex-basis: 75%;
`;

const NameColumn = styled.div`
	flex-basis: 25%;
`;

export default function OptionsSection({ isActive, name, children }) {
	return (
		<div>
			<SectionHeaderWrapper isActive={isActive} name={name} />

			{children}

			<SingleRowWrapper>
				<NameColumn>
					<div>Number of Generations</div>
				</NameColumn>
				<SliderColumnAndValue>
					<SliderOne label={'Number of generations'} name={'number-of-generations'} required />
				</SliderColumnAndValue>
			</SingleRowWrapper>

			<SingleRowWrapper>
				<NameColumn>
					<div>Starting Allele Frequency</div>
				</NameColumn>
				<SliderColumnAndValue>
					<SliderOne label={'Starting Allele Frequency'} name={'starting-allele-frequency'} required />
				</SliderColumnAndValue>
			</SingleRowWrapper>
		</div>
	);
}
