const lightTheme = {
	colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
	chart: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: 'var(--chakra-colors-gray-700)',
		style: {
			fontFamily: 'Roboto',
			color: '#666666',
		},
	},
	title: {
		style: {
			color: 'var(--chakra-colors-gray-900)',
			fontSize: '1.5rem',
			fontFamily: 'Roboto Condensed',
			fontWeight: 'bold',
		},
	},
	subtitle: {
		style: {
			color: 'var(--chakra-colors-gray-800)',
			fontSize: '.9rem',
			fontFamily: 'Roboto Condensed',
			fontWeight: 'semibold',
		},
	},
	legend: {
		itemStyle: {
			fontWeight: 'bold',
			fontSize: '13px',
		},
	},
	tooltip: {
		borderWidth: 2,
		borderColor: 'var(--chakra-colors-purple-500)',
		backgroundColor: 'var(--chakra-colors-gray-50)',
		shadow: true,
	},
	xAxis: {
		gridLineColor: '#424242',
		gridLineWidth: 1,
		minorGridLineColor: '#424242',
		minorGridLineWidth: 0.5,
		tickColor: '#424242',
		minorTickColor: '#424242',
		lineColor: '#424242',
		labels: {
			style: {
				color: '#000',
			},
		},
		title: {
			style: {
				color: 'var(--chakra-colors-gray-800)',
				fontSize: '1.2rem',
				fontFamily: 'Roboto Condensed',
			},
		},
	},
	yAxis: {
		gridLineColor: '#424242',
		gridLineWidth: 1,
		minorGridLineColor: '#424242',
		minorGridLineWidth: 0.5,
		tickColor: '#424242',
		minorTickColor: '#424242',
		lineColor: '#424242',
		labels: {
			style: {
				color: '#000',
			},
		},
		title: {
			style: {
				color: 'var(--chakra-colors-gray-800)',
				fontSize: '1.2rem',
				fontFamily: 'Roboto Condensed',
			},
		},
	},
	plotOptions: {
		candlestick: {
			lineColor: '#404048',
		},
	},
};

const darkTheme = {
	colors: ['#d35400', '#2980b9', '#2ecc71', '#f1c40f', '#DEBCFB', '#7f8c8d'],
	chart: {
		backgroundColor: 'var(--chakra-colors-gray-900)',
		borderWidth: 1,
		borderColor: 'var(--chakra-colors-gray-700)',
		style: {
			fontFamily: 'Roboto',
		},
	},
	title: {
		style: {
			color: 'var(--chakra-colors-gray-200)',
			fontSize: '1.5rem',
			fontFamily: 'Roboto Condensed',
			fontWeight: 'bold',
		},
	},
	subtitle: {
		style: {
			color: 'var(--chakra-colors-gray-200)',
			fontSize: '1rem',
			fontFamily: 'Roboto Condensed',
			fontWeight: 'semibold',
		},
	},
	legend: {
		itemStyle: {
			color: 'var(--chakra-colors-gray-500)',
		},
		itemHoverStyle: {
			color: '#C0C0C0',
		},
	},
	tooltip: {
		borderWidth: 2,
		borderColor: 'var(--chakra-colors-purple-500)',
		backgroundColor: 'var(--chakra-colors-gray-50)',
		shadow: true,
	},
	xAxis: {
		gridLineColor: '#424242',
		gridLineWidth: 1,
		minorGridLineColor: '#424242',
		minorGridLineWidth: 0.5,
		tickColor: '#424242',
		minorTickColor: '#424242',
		lineColor: '#424242',
		labels: {
			style: {
				color: 'var(--chakra-colors-gray-300)',
			},
		},
		title: {
			style: {
				color: 'var(--chakra-colors-gray-300)',
				fontSize: '1.2rem',
				fontFamily: 'Roboto Condensed',
			},
		},
	},
	yAxis: {
		gridLineColor: '#424242',
		gridLineWidth: 1,
		minorGridLineColor: '#424242',
		minorGridLineWidth: 0.5,
		minorTickColor: '#424242',
		tickColor: '#424242',
		lineColor: '#424242',
		labels: {
			style: {
				color: 'var(--chakra-colors-gray-300)',
			},
		},
		title: {
			style: {
				color: 'var(--chakra-colors-gray-300)',
				fontSize: '1.2rem',
				fontFamily: 'Roboto Condensed',
			},
		},
	},
	plotOptions: {
		candlestick: {
			lineColor: '#404048',
		},
	},
};

export { lightTheme, darkTheme };
