import styled from 'styled-components';

const FooterWrapper = styled.footer`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	min-height: 42px;
	height: 42px;
	padding: 0 15px;
	font-size: 0.8rem;
	background-color: ${(props) => props.theme.footerColor ?? '#222222'};

	a {
		color: #ffffff;
		text-decoration: none;
	}

	@media ${(props) => props.theme._mq.MOBILE} {
		padding: 0 30px;
		font-size: 1rem;
	}
`;

export default FooterWrapper;
