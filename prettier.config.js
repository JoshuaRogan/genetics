module.exports = {
	endOfLine: 'lf',
	printWidth: 120,
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	overrides: [
		{
			files: ['*.json', '*.yml', '*.svg', '*.yaml'],
			options: {
				trailingComma: 'none',
			},
		},
	],
};
