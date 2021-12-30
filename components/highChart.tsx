import React from 'react';
import Highcharts from 'highcharts';
import styled from 'styled-components';
import HighchartsReact from 'highcharts-react-official';

const HighChartLoader = styled.div`
	min-height: 400px;
`;

function createOptions(line) {
	return {
		title: {
			text: 'Population Genetics Simulation',
		},
		xAxis: {
			title: {
				text: 'Generation Number',
			},
		},
		yAxis: {
			min: 0,
			max: 1,
			title: {
				text: 'Frequency of the A allele',
			},
		},
		series: [
			{
				data: line,
			},
		],
	};
}

const App = ({ line }) => (
	<HighChartLoader aria-label="Graph displaying the results of the Simulator" role="figure">
		<HighchartsReact highcharts={Highcharts} options={createOptions(line)} />
	</HighChartLoader>
);

export default App;
