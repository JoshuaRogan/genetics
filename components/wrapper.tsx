import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';

const RootStyles = styled.div`
	font-family: 'Roboto', sans-serif;
`;

const THEME = {
	backgroundColor: 'white',
	primaryColor: '#4b516a',
	textColor: '#333333',
	main: 'red',
	spaceBetweenNum: 15,
	spaceBetweenPx: '15px',
	spaceBetweenPx2x: '30px',
};

function IndexPage({ children }) {
	return (
		<RootStyles>
			<Head>
				<title>My page title</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'} />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<ThemeProvider theme={THEME}>{children}</ThemeProvider>
		</RootStyles>
	);
}

export default IndexPage;
