import styled from 'styled-components';

const SimulatorContainer = styled.main`
	padding: 0 15px 15px 15px;

	@media ${(props) => props.theme._mq.MOBILE_LARGE} {
		padding: 0 30px 30px 30px;
	}

	@media ${(props) => props.theme._mq.TABLET} {
		margin-left: auto;
		margin-right: auto;
		max-width: 90%;
		padding: 0;
	}

	@media ${(props) => props.theme._mq.DESKTOP} {
		max-width: 80%;
	}
	@media ${(props) => props.theme._mq.DESKTOP_LARGE} {
		max-width: 70%;
	}
`;

export default SimulatorContainer;
