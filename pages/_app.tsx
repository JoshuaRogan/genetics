import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../styles/theme';
import DarkModeToggle from '../components/DarkModeToogle';

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
		transition: all 0.4s ease-in-out;
  }
`;

export default function App({ Component, pageProps }) {
	const [theme, setTheme] = useState('light');
	const [isMounted, setIsMounted] = useState(false);
	const isDarkTheme = theme === 'dark';

	const toggleTheme = () => {
		const updatedTheme = isDarkTheme ? 'light' : 'dark';
		setTheme(updatedTheme);
		localStorage.setItem('theme', updatedTheme);
	};

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
			setTheme(savedTheme);
		} else if (prefersDark) {
			setTheme('dark');
		}
	}, []);

	return (
		<>
			<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
				<GlobalStyle />
				{isMounted && <Component {...pageProps} />}
				<DarkModeToggle isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
			</ThemeProvider>
		</>
	);
}
