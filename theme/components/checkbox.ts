import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const redBox = definePartsStyle({
	control: {
		color: 'black',
		border: '1px solid',
		borderColor: 'gray.400',
		bg: 'blackAlpha.200',
		_hover: {
			bg: 'blackAlpha.400',
		},
		_focus: {
			borderColor: 'red.500',
			boxShadow: '0 0 0 3px rgb(250 137 137 / 60%)',
		},
		_checked: {
			bg: 'red',
			borderColor: 'red.600',
			_hover: {
				bg: 'red.400',
				borderColor: 'red.600',
			},
		},
		_disabled: {
			color: 'gray.400',
			bg: 'blackAlpha.100',
			borderColor: 'blackAlpha.200',
			_hover: {
				bg: 'blackAlpha.100',
			},
		},
		_dark: {
			color: 'gray.200',
			borderColor: 'gray.600',
			background: 'gray.800',
			_hover: {
				bg: 'gray.900',
			},
			_checked: {
				bg: 'red.500',
				borderColor: 'red.600',
				_hover: {
					bg: 'red.600',
				},
			},
			_disabled: {
				bg: 'gray.700',
				borderColor: 'gray.600',
				_checked: {
					bg: 'red.400',
					borderColor: 'red.400',
				},
			},
		},
	},
});

const checkboxTheme = defineMultiStyleConfig({
	variants: { redBox },
});

export default checkboxTheme;
