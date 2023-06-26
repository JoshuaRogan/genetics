import { createGlobalStyle } from 'styled-components';
import { useEffect, useState } from 'react';
import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '../redux/store';

const GlobalStyle = createGlobalStyle`

  #__next {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 0;
		padding: 0;
		min-height: 100vh;
  }

	.highcharts-tooltip {
		font-size: 1em;
		padding: 0 0.5em;

		& text {

			& > tspan:nth-child(1) {
				font: bold 20px sans-serif;
				fill: black;
			}

			& > tspan:nth-child(4) {
				font: normal 16px sans-serif;
			}
		}
	}


	.highcharts-data-table {
		margin-top: 30px;
		&	table {
			font-family: 'Roboto, sans-serif';
			border: 1px solid #646262;
			margin: 10px auto;
			text-align: center;
			width: 100%;
			min-width: 360px;
			max-width: 950px;

			caption {
				font-size: 1.2em;
				font-weight: bold;
			}

			thead {
				border-bottom: 1px solid #646262;
			}

			th {
				font-weight: 600;
				padding: 0.5em;
			}

			tbody {
				border-style: solid;
				border-width: 1px;

				tr {
					border-bottom: 1px solid #646262;
				}

				tr:nth-child(even) {
					background: var(--chakra-colors-blackAlpha-100);
				}
			}
	}
`;

export default function App({ Component, pageProps }) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<>
			<Provider store={store}>
				<ChakraProvider theme={theme}>
					<GlobalStyle />
					{isMounted && <Component {...pageProps} />}
				</ChakraProvider>
			</Provider>
		</>
	);
}
