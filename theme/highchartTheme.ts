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
			color: '#000',
			fontFamily: 'Roboto Condensed',
			fontWeight: 'bold',
		},
	},
	subtitle: {
		style: {
			color: '#666666',
			fontFamily: 'Roboto Condensed',
		},
	},
	legend: {
		itemStyle: {
			fontWeight: 'bold',
			fontSize: '13px',
		},
	},
	tooltip: {
		borderWidth: 0,
		backgroundColor: 'rgba(219,219,216,0.8)',
		shadow: false,
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
				color: '#333',
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
				color: '#333',
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
	colors: ['#d35400', '#2980b9', '#2ecc71', '#f1c40f', '#2c3e50', '#7f8c8d'],
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
			color: 'var(--chakra-colors-gray-400)',
			fontFamily: 'Roboto Condensed',
			fontWeight: 'bold',
		},
	},
	subtitle: {
		style: {
			color: 'var(--chakra-colors-gray-400)',
			fontFamily: 'Roboto Condensed',
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
		borderWidth: 0,
		backgroundColor: 'rgba(219,219,216,0.8)',
		shadow: false,
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
				color: 'var(--chakra-colors-gray-400)',
			},
		},
		title: {
			style: {
				color: 'var(--chakra-colors-gray-400)',
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
				color: 'var(--chakra-colors-gray-400)',
			},
		},
		title: {
			style: {
				color: 'var(--chakra-colors-gray-400)',
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
