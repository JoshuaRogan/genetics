import styled from 'styled-components';

const HomePageTitle = styled.h1`
	color: ${(props) => props.theme.colors.title};
	font-size: clamp(2rem, 7vw, 4rem);
	text-align: center;
`;

export default HomePageTitle;
