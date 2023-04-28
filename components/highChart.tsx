import React from 'react';
import Highcharts from 'highcharts';
import { Box } from '@chakra-ui/react';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

if (typeof Highcharts === 'object') {
	HighchartsExporting(Highcharts);
	HighchartsExportData(Highcharts);
	HighchartsAccessibility(Highcharts);
}

const genoTypeOrder = ['AA', 'Aa', 'aa'];

function createLinesFromArray(lines, isGeno = false) {
	return lines.map((line, index) => {
		return {
			data: [...line],
			name: isGeno ? genoTypeOrder[index] : 'Run ' + (index + 1),
		};
	});
}

function createOptions(lines, title) {
	const isGenoType = title.toLowerCase().includes('genotype');

	return {
		title: {
			text: title || 'Population Genetics Simulation',
		},
		chart: {
			zoomType: 'xy',
			resetZoomButton: {
				position: {
					x: -5,
					y: 5,
				},
			},
		},
		xAxis: {
			title: {
				text: 'Generation Number',
			},
			allowDecimals: false,
			min: 0,
		},
		yAxis: {
			min: 0,
			max: 1,
			title: {
				text: 'Frequency of the A allele',
			},
		},
		series: createLinesFromArray(lines, isGenoType),
		plotOptions: {
			series: {
				pointStart: 0,
			},
		},
		credits: {
			enabled: false,
		},
	};
}

const App = ({ lines, title }) => {
	// UseEffect / State here for the lines to prevent constant re-rendering

	return (
		<Box minHeight="400px" aria-label="Graph displaying the results of the Simulator" role="figure">
			<HighchartsReact highcharts={Highcharts} options={createOptions(lines, title)} />
		</Box>
	);
};

export default App;
