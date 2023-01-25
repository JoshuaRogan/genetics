import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
import Navigation from '../components/Navigation';

const RootStyles = styled.div`
	font-family: 'Roboto', sans-serif;
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

function IndexPage({ children }) {
	return (
		<RootStyles>
			<Head>
				<title>Population Genetics Simulator</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'} />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<ThemeProvider theme={THEME}>
				<Navigation />
				{children}
			</ThemeProvider>
		</RootStyles>
	);
}

export default IndexPage;
