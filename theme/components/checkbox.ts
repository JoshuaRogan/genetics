import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const redBox = definePartsStyle({
	control: {
		color: 'purple.200',
		border: '1px solid',
		borderColor: 'gray.600',
		bg: 'blackAlpha.200',
		_hover: {
			bg: 'blackAlpha.400',
		},
		_focus: {
			borderColor: 'purple.600',
			boxShadow: '0 0 0 3px rgb(74 49 135 / 60%)',
		},
		_checked: {
			bg: 'purple.400',
			borderColor: 'purple.600',
			_hover: {
				bg: 'purple.500',
				borderColor: 'purple.800',
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
			color: 'purple.200',
			borderColor: 'gray.600',
			background: 'gray.800',
			_hover: {
				bg: 'gray.900',
			},
			_checked: {
				bg: 'purple.500',
				borderColor: 'purple.600',
				_hover: {
					bg: 'purple.400',
					borderColor: 'purple.800',
				},
			},
			_focus: {
				borderColor: 'purple.900',
				boxShadow: '0 0 0 3px rgb(159 122 234 / 100%)',
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
