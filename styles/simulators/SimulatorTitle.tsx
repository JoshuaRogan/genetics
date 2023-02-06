import styled from 'styled-components';

const SimulatorTitle = styled.h1`
	color: ${(props) => props.theme.colors.title};
	font-size: clamp(1.1rem, 5vw, 2rem);
	text-align: center;
`;

export default SimulatorTitle;
