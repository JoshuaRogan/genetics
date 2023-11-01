import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { a11yFocus } from '../../utils/a11y';

const baseStyle = defineStyle({
	_focus: {
		...a11yFocus,
	},
});

const primary = defineStyle({
	...baseStyle,
	paddingY: 6,
	width: {
		base: '250px',
		md: '40%',
	},
	bg: 'blackAlpha.800',
	color: 'white',
	_hover: {
		bg: 'purple.500',
	},
});

const secondary = defineStyle({
	...baseStyle,
});

const themeSwitcher = defineStyle({
	...baseStyle,
	color: 'yellow.400',
	backgroundColor: 'whiteAlpha.200',
	_hover: {
		backgroundColor: 'whiteAlpha.300',
		_dark: {
			backgroundColor: 'whiteAlpha.300',
		},
	},
	_dark: {
		backgroundColor: 'whiteAlpha.200',
	},
});

const generateLinkStyle = defineStyle({
	...baseStyle,
	display: 'flex',
	mx: 'auto',
	mt: 4,
	color: 'green.700',
	border: 2,
	borderStyle: 'solid',
	borderColor: 'green.500',
	alignContent: 'center',
	_dark: {
		color: 'green.300',
		border: 2,
		borderStyle: 'solid',
		borderColor: 'green.300',
	},
	_hover: {
		backgroundColor: 'blackAlpha.100',
		_dark: {
			backgroundColor: 'whiteAlpha.300',
		},
	},
	_focus: {
		ring: false,
		outlineColor: 'purple.500',
		outlineOffset: 4,
		outlineWidth: 3,
	},
});

const showTableStyle = defineStyle({
	...baseStyle,
	display: 'flex',
	mx: 'auto',
	mt: 4,
	color: 'blue.600',
	border: 2,
	borderStyle: 'solid',
	borderColor: 'blue.500',
	alignContent: 'center',
	_dark: {
		color: 'blue.300',
		border: 2,
		borderStyle: 'solid',
		borderColor: 'blue.300',
	},
	_hover: {
		backgroundColor: 'blue.50',
		_dark: {
			backgroundColor: 'whiteAlpha.300',
		},
	},
	_focus: {
		ring: false,
		outlineColor: 'blue.500',
		outlineOffset: 4,
		outlineWidth: 3,
	},
});

const footerButton = defineStyle({
	...baseStyle,
	_focus: {
		...a11yFocus,
		outlineColor: 'purple.400',
	},
});

const buttonTheme = defineStyleConfig({
	variants: { baseStyle, primary, secondary, themeSwitcher, generateLinkStyle, showTableStyle, footerButton },
});

export default buttonTheme;
