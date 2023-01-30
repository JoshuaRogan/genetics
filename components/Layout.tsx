'use client';
import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
import Navigation from '../components/Navigation';
import StyledComponentsRegistry from '../utils/StyledComponentRegistry';
import Footer from './Footer';

const RootStyles = styled.div`
	font-family: 'Roboto', sans-serif;
	min-height: 100vh;
`;

const size = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '2560px',
};

const device = {
	mobileS: `(max-width: ${size.mobileS})`,
	mobileM: `(max-width: ${size.mobileM})`,
	mobileL: `(max-width: ${size.mobileL})`,
	tablet: `(max-width: ${size.tablet})`,
	laptop: `(max-width: ${size.laptop})`,
	laptopL: `(max-width: ${size.laptopL})`,
	desktop: `(max-width: ${size.desktop})`,
	desktopL: `(max-width: ${size.desktop})`,
};

const THEME = {
	backgroundColor: 'white',
	primaryColor: '#4b516a',
	textColor: '#333333',
	textColorLightGray: '#737373',
	disabledGray: 'rgb(171,169,169)',
	main: 'red',
	spaceBetweenNum: 15,
	spaceBetweenSmall: '10px',
	spaceBetweenPx: '15px',
	spaceBetweenPx2x: '30px',
	_mq: {
		...device,
	},
};

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
