import styled from 'styled-components';

// NavigationBar is a styled component that is a parent of the nav element
const NavigationBar = styled.nav`
	z-index: 1;
	display: flex;
	width: 100%;
	min-height: 48px;
	height: 48px;
	background-color: ${(props) => props.theme.colors.background};
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

// Container is a styled component that is a child of NavigationBar
NavigationBar.Container = styled.div`
	width: 100%;

	@media ${(props) => props.theme._mq.TABLET} {
		display: flex;
		flex-direction: row;
	}
`;

NavigationBar.Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	padding: 0 15px;

	@media ${(props) => props.theme._mq.TABLET} {
		width: auto;
	}
`;

NavigationBar.HeaderButton = styled.button`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	width: 40px;
	height: 32px;
	background-color: transparent;
	border: none;
	cursor: pointer;
	appearance: none;

	@media ${(props) => props.theme._mq.TABLET} {
		display: none;
	}
`;

export default NavigationBar;
