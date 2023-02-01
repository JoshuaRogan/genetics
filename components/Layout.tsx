'use client';
import styled, { ThemeProvider } from 'styled-components';
import Navigation from './Navigation';
import Footer from './Footer';
import StyledComponentsRegistry from '../utils/StyledComponentRegistry';

const Size = {
	MOBILE_SMALL: '320px',
	MOBILE: '375px',
	MOBILE_LARGE: '425px',
	TABLET: '768px',
	DESKTOP: '1024px',
	DESKTOP_LARGE: '1440px',
	DESKTOP_XLARGE: '2560px',
};

const Device = {
	MOBILE_SMALL: `(min-width: ${Size.MOBILE_SMALL})`,
	MOBILE: `(min-width: ${Size.MOBILE})`,
	MOBILE_LARGE: `(min-width: ${Size.MOBILE_LARGE})`,
	TABLET: `(min-width: ${Size.TABLET})`,
	DESKTOP: `(min-width: ${Size.DESKTOP})`,
	DESKTOP_LARGE: `(min-width: ${Size.DESKTOP_LARGE})`,
	DESKTOP_XLARGE: `(min-width: ${Size.DESKTOP_XLARGE})`,
};

const THEME = {
	primaryColor: '#4b516a',
	backgroundColor: '#333333',
	headerTextColor: '#ffffff',
	textColor: '#333333',
	textColorLightGray: '#737373',
	disabledGray: 'rgb(171,169,169)',
	main: 'red',
	spaceBetweenNum: 15,
	spaceBetweenSmall: '10px',
	spaceBetweenPx: '15px',
	spaceBetweenPx2x: '30px',
	_mq: {
		...Device,
	},
};

const RootStyles = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100vh;
	font-family: 'Roboto', sans-serif;

	* {
		box-sizing: border-box;
	}
`;

function Layout({ children }) {
	return (
		<StyledComponentsRegistry>
			<RootStyles>
				<ThemeProvider theme={THEME}>
					<>
						<Navigation />
						{children}
						<Footer />
					</>
				</ThemeProvider>
			</RootStyles>
		</StyledComponentsRegistry>
	);
}

export default Layout;
