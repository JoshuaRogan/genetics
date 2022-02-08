import React from 'react';
import Highcharts from 'highcharts';
import styled from 'styled-components';
import HighchartsReact from 'highcharts-react-official';

const HighChartLoader = styled.div`
	min-height: 400px;
`;

function createLinesFromArray(lines) {
	return lines.map((line) => {
		return {
			data: line,
		};
	});
}

function createOptions(lines) {
	console.log('lines updating', lines.length, lines);
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
		series: createLinesFromArray(lines),
	};
}

const App = ({ lines }) => (
	<HighChartLoader aria-label="Graph displaying the results of the Simulator" role="figure">
		<HighchartsReact highcharts={Highcharts} options={createOptions(lines)} />
	</HighChartLoader>
);

export default App;
