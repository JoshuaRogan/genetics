'use client';

import Head from 'next/head';
import styled from 'styled-components';

const RootStyles = styled.div`
	padding-left: 70px;
	padding-right: 70px;
`;

function MainWrapper({ children }) {
	return (
		<RootStyles>
			<Head>
				<title>Population Genetics Simulator</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			{children}
		</RootStyles>
	);
}

export default MainWrapper;
