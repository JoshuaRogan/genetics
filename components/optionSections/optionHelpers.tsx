import React from 'react';
import styled from 'styled-components';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

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

const SectionHeaderWrapperH3 = styled.h3``;

const IconWrapper = styled.span`
	&:hover {
		cursor: ${(props) => (props.isCheckable ? 'pointer' : 'default')};
	}
`;

export function SectionHeaderWrapper({ isActive, name, isCheckable = true, onClick = (isActive) => {} }) {
	const handleOnClick = () => {
		if (!isCheckable) {
			return;
		}
		onClick(!isActive);
	};

	return (
		<SectionHeaderWrapperH3>
			<IconWrapper isCheckable={isCheckable} onClick={handleOnClick}>
				{isActive ? <FaCheckSquare size="16px" /> : <FaRegSquare size="16px" />} {name}
			</IconWrapper>
		</SectionHeaderWrapperH3>
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

export function HelpContent({ inputName, variable, variableHTML = null, description, isOpen = false }) {
	const variableFinal = variableHTML ?? variable;

	return (
		<HelpContentContainer isOpen={isOpen}>
			<HelpContentVariable dangerouslySetInnerHTML={{ __html: variableFinal }} />
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
