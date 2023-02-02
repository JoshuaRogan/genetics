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
	background-color: ${(props) => (props.isActive ? '#e0e0e0' : props.theme.textColor)};
	transition: all 0.2s ease-in-out;

	&:hover {
		background-color: #e0e0e0;

		a {
			color: ${(props) => props.theme.textColor ?? '#ffffff'};
		}
	}

	a {
		display: block;

		/* If link is active set highlight theme */
		${(props) => props.isActive && `color: ${props.theme.textColor ?? '#ffffff'}`};

		/* Default color if not active */
		${(props) => !props.isActive && `color: ${props.theme.headerTextColor ?? '#ffffff'}`};
		padding: 15px;
		text-decoration: none;
	}
`;

export default NavigationList;
