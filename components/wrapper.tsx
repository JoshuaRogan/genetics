'use client';

import Head from 'next/head';

function MainWrapper({ children }) {
	return (
		<>
			<Head>
				<title>Population Genetics Simulator</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div>{children}</div>
		</>
	);
}

export default MainWrapper;
