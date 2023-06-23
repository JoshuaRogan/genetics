import React from 'react';
import { Box } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { darkTheme, lightTheme } from '../theme/highchartTheme';

if (typeof Highcharts === 'object') {
	HighchartsExporting(Highcharts);
	HighchartsExportData(Highcharts);
	HighchartsAccessibility(Highcharts);
}

const genoTypeOrder = ['AA', 'Aa', 'aa'];

function createLinesFromArray(lines, isGeno = false) {
	return lines.map((line: number[], index: number) => {
		const name = isGeno ? `Genotype ${genoTypeOrder[index]} Frequency` : `Simulation #${index + 1}`;

		return {
			name,
			accessibility: {
				enabled: true,
				description: 'The frequency of the A allele in the population.',
			},
			data: [
				...line.map((point: number, idx: number) => {
					const dataPointName = `Generation #${idx + 1}`;
					return [dataPointName, point];
				}),
			],
		};
	});
}

function createOptions(theme = 'light', lines, title) {
	const isGenoType = title.toLowerCase().includes('genotype');
	const subtitleColor =
		theme === 'light' ? 'var(--chakra-colors-blackAlpha-800)' : 'var(--chakra-colors-whiteAlpha-800)';

	return {
		title: {
			text: title || 'Population Genetics Simulation',
			margin: 50,
		},
		subtitle: {
			text: 'Hover (or navigate with the keyboard) over the line to see the frequency of the A allele in the population.',
		},
		chart: {
			styledMode: false,
			zoomType: 'xy',
			resetZoomButton: {
				position: {
					x: -5,
					y: 5,
				},
			},
			height: 500,
		},
		xAxis: {
			title: {
				text: 'Generation Number',
			},
			accessibility: {
				description: 'Generation number',
			},
			allowDecimals: false,
			min: 0,
		},
		yAxis: {
			title: {
				text: 'Frequency of the A allele',
			},
			accessibility: {
				description: 'Frequency of the A allele',
			},
			min: 0,
			max: 1,
		},
		accessibility: {
			description: 'The frequency of the A allele in the population.',
		},
		series: createLinesFromArray(lines, isGenoType),
		plotOptions: {
			series: {
				pointStart: 0,
				accessibility: {
					enabled: true,
					description: 'The frequency of the A allele in the population.',
					keyboardNavigation: {
						enabled: true,
					},
				},
				tooltip: {
					headerFormat: `
					<span style="font-size: 10px">
						<span style="color:{point.color}">\u25CF</span>
						{series.name}
					</span>
					<br/>`,
					pointFormat: '{point.name}: <b>{point.y}</b><br/>',
				},
			},
		},
		credits: {
			enabled: false,
		},
	};
}

const HighchartWrapper = ({ lines, title }) => {
	const { colorMode } = useColorMode();
	const theme = colorMode === 'light' ? lightTheme : darkTheme;

	Highcharts.setOptions(theme);

	return (
		<Box
			key={colorMode}
			// minHeight="500px"
			// height={500}
			aria-label="Graph displaying the results of the Simulator"
			role="figure"
		>
			<HighchartsReact highcharts={Highcharts} options={createOptions(colorMode, lines, title)} />
		</Box>
	);
};

export default HighchartWrapper;
