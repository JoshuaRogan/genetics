import styled from 'styled-components';

export const SingleRowWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
`;

export const SliderColumnAndValue = styled.div`
	flex-basis: 75%;
`;

export const NameColumn = styled.div`
	flex-basis: 25%;
`;

const SectionHeaderWrapperH4 = styled.h4``;

export function SectionHeaderWrapper({ isActive, name }) {
	return (
		<SectionHeaderWrapperH4>
			[{isActive ? 'X' : ''}] {name}
		</SectionHeaderWrapperH4>
	);
}

const HelpContentContainer = styled.div`
	display: ${(props) => (props.isOpen ? 'block' : 'none')};
	padding: 5px;
`;

const HelpContentVariable = styled.div`
	font-size: 22px;
	font-style: italic;
	color: ${(props) => props.theme.primaryColor};
	font-weight: 900;
	padding-top: 5px;
	padding-bottom: 5px;
`;

const HelpContentDescription = styled.div`
	font-size: 15px;
	color: ${(props) => props.theme.textColorLightGray};
`;

export function HelpContent({ inputName, variable, description, isOpen = false }) {
	return (
		<HelpContentContainer isOpen={isOpen}>
			<HelpContentVariable> {variable} </HelpContentVariable>
			<HelpContentDescription id={`help-content-${inputName}`}> {description} </HelpContentDescription>
		</HelpContentContainer>
	);
}

const HelpContentToggleStyled = styled.span`
	color: ${(props) => props.theme.primaryColor};
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
	margin-left: 5px;
	position: relative;
	top: -5px;
`;

export function HelpContentToggle({ onClick }) {
	const clickHandle = () => {
		onClick();
	};

	return (
		<HelpContentToggleStyled title="Click to get help" onClick={clickHandle}>
			?
		</HelpContentToggleStyled>
	);
}
