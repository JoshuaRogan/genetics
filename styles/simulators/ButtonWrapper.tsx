import styled from 'styled-components';

interface ButtonWrapperProps {
	marginTop?: number;
	numberOfButtons?: number;
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
	display: grid;
	grid-template-rows: repeat(${(props) => props.numberOfButtons || 2}, 1fr);
	grid-gap: 10px;
	place-items: center;
	margin-top: ${(props) => props.marginTop ?? 0}px;

	@media ${(props) => props.theme._mq.TABLET} {
		display: grid;
		grid-template-columns: repeat(${(props) => props.numberOfButtons || 2}, 1fr);
		grid-template-rows: 1fr;
	}
`;

export default ButtonWrapper;
