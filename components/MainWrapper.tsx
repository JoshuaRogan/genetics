import Head from 'next/head';
import Navigation from './Navigation';
import Footer from './Footer';
import { Box } from '@chakra-ui/react';

function MainWrapper({ children }) {
	return (
		<>
			<Head>
				<title>Population Genetics Simulator</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Navigation />
			<Box marginBottom={'auto'}>{children}</Box>
			<Footer />
		</>
	);
}

export default MainWrapper;
