import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../styles/theme2';
import theme from '../styles/theme';
import DarkModeToggle from '../components/DarkModeToogle';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';

const GlobalStyle = createGlobalStyle`

	* {
		box-sizing: border-box;
	}

	body {
		margin: 0;
		font-family: 'Roboto', sans-serif;
	}

  #__next {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 0;
		padding: 0;
		min-height: 100vh;
		color: ${(props) => props.theme.colors.text};
		background-color: ${(props) => props.theme.colors.body};
  }
`;

export default function App({ Component, pageProps }) {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);
	return (
		<>
			<ThemeProvider theme={lightTheme}>
				<ChakraProvider theme={theme}>
					<GlobalStyle />
					{isMounted && <Component {...pageProps} />}
					<DarkModeToggle />
				</ChakraProvider>
			</ThemeProvider>
		</>
	);
}
