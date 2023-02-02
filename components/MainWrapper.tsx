import Head from 'next/head';
import Navigation from './Navigation';
import Footer from './Footer';

function MainWrapper({ children }) {
	return (
		<>
			<Head>
				<title>Population Genetics Simulator</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Navigation />
			<div>{children}</div>
			<Footer />
		</>
	);
}

export default MainWrapper;
