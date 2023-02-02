import styled from 'styled-components';

const Paragraph = styled.p`
	color: ${(props) => props.theme.colors.text};
	margin: ${(props) => props.margin || 0};
`;

export default Paragraph;
