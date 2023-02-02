import styled from 'styled-components';

const HomeContainer = styled.div`
	padding: 0 30px 30px 30px;

	@media ${(props) => props.theme._mq.TABLET} {
		margin-left: auto;
		margin-right: auto;
		max-width: 768px;
	}

	@media ${(props) => props.theme._mq.DESKTOP} {
		max-width: 860px;
	}
	@media ${(props) => props.theme._mq.DESKTOP_LARGE} {
		max-width: 1080px;
	}
`;

export default HomeContainer;
