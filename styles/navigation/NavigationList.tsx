import styled from 'styled-components';

const NavigationList = styled.ul`
	list-style: none;
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;

	@media ${(props) => props.theme._mq.TABLET} {
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		width: 100%;
	}
`;

NavigationList.Item = styled.li`
	width: 100%;
	text-align: center;
	font-weight: 400;
	letter-spacing: 1px;

	&:hover {
		background-color: #e0e0e0;

		a {
			color: ${(props) => props.theme.textColor ?? '#ffffff'};
		}
	}

	a {
		display: block;
		color: ${(props) => props.theme.headerTextColor ?? '#ffffff'};
		padding: 15px;
		text-decoration: none;
	}
`;

export default NavigationList;
