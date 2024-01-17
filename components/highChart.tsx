import React, { useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
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

const genoTypeOrder = ['A₁A₁', 'A₁A₂', 'A₂A₂'];

function createLinesFromArray(lines, isGeno = false) {
	return lines.map((line: number[], index: number) => {
		const name = isGeno ? `Genotype ${genoTypeOrder[index]} Frequency` : `Simulation #${index + 1}`;

		return {
			name,
			accessibility: {
				enabled: true,
				description: isGeno ? 'Frequency' : 'The frequency of the A₁ allele in the population.',
			},
			data: [...line],
		};
	});
}

function createOptions(theme = 'light', lines, title: string) {
	const isGenoType = title.toLowerCase().includes('genotype');

	return {
		title: {
			text: `<h2>${title}</h2>`,
			align: 'center',
			useHTML: true,
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
				text: isGenoType ? 'Frequency' : 'Frequency of the A₁ allele',
			},
			accessibility: {
				description: isGenoType ? 'Frequency' : 'Frequency of the A₁ allele',
			},
			min: 0,
			max: 1,
		},
		accessibility: {
			description: isGenoType ? 'Frequency' : 'Frequency of the A₁ allele',
		},
		series: createLinesFromArray(lines, isGenoType),
		plotOptions: {
			series: {
				pointStart: 0,
				accessibility: {
					enabled: true,
					description: isGenoType ? 'Frequency' : 'Frequency of the A₁ allele',
					keyboardNavigation: {
						enabled: true,
					},
				},
				tooltip: {
					useHTML: true,
					headerFormat: `
					<div>
						<span style="color:{point.color}">\u25CF</span>
						<span>
							{series.name}
						</span>
					</div>
					<br/>
					<br/>
					`,
					pointFormat: `
					<span>
					Generation #<b>{point.x}</b>: <b>{point.y}</b>
					</span>`,
				},
			},
		},
		tooltip: {
			borderColor: 'var(--chakra-colors-purple-500)',
			backgroundColor: '#FFFFFF',
			borderWidth: 4,
			borderRadius: 3,
			className: 'highcharts-tooltip',
		},
		caption: {
			useHTML: true,
			text: `<h3>${title}</h3>`,
		},
		exporting: {
			showTable: true,
		},
		credits: {
			enabled: false,
		},
	};
}

const HighchartWrapper = ({ chartIndex, lines, title }) => {
	const { colorMode } = useColorMode();
	const theme = colorMode === 'light' ? lightTheme : darkTheme;

	Highcharts.setOptions(theme);

	// Hide the data table on initial render since the option is set to true in the theme
	useEffect(() => {
		const dataTable = document.getElementsByClassName('highcharts-data-table')[chartIndex] as HTMLElement;
		if (dataTable) dataTable.style.display = 'none';
	}, [chartIndex]);

	return (
		<Box
			key={colorMode}
			display="flex"
			flexDirection="column"
			justifyContent="center"
			aria-label="Graph displaying the results of the Simulator"
			role="figure"
		>
			<HighchartsReact highcharts={Highcharts} options={createOptions(colorMode, lines, title)} />
			<Button
				variant="showTableStyle"
				my={2}
				w={250}
				onClick={() => {
					const chart = Highcharts.charts.filter(Boolean)[chartIndex];

					const element = document.getElementsByClassName('highcharts-data-table')[chartIndex] as HTMLElement;

					if (!element || !chart) return;

					element.style.display === 'block' ? chart.hideData() : chart.viewData();

					const tableCaption = document.getElementsByClassName('highcharts-table-caption')[chartIndex] as HTMLElement;
					if (tableCaption) {
						tableCaption.textContent = title;
					}
				}}
			>
				Show/Hide data view table
			</Button>
		</Box>
	);
};

export default HighchartWrapper;
