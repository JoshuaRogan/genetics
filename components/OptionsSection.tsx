import styled from 'styled-components';
import React from 'react';
import SliderOne from './SliderOne';

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

export default function OptionsSection({ isActive }) {
	return (
		<div>
			<h4>[X] Base Simulation Model</h4>

			<SingleRowWrapper>
				<NameColumn>
					<div>Number of Generations</div>
				</NameColumn>
				<SliderColumnAndValue>
					<SliderOne label={'Number of generations'} name={'number-of-generations'} required />
				</SliderColumnAndValue>
			</SingleRowWrapper>
		</div>
	);
}
