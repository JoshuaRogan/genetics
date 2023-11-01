import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { a11yFocus } from '../../utils/a11y';

const baseLink = defineStyle({
	_focus: {
		...a11yFocus,
		outlineOffset: 1,
		outlineWidth: 2,
	},
});

const brandPrimary = defineStyle({
	textDecoration: 'underline',
	color: 'white',
	fontFamily: 'serif',
	fontWeight: 'normal',

	// let's also provide dark mode alternatives
	_dark: {
		color: 'orange.800',
	},
});

const footerLink = defineStyle({
	textDecoration: 'none',
	color: 'white',
	fontWeight: 'normal',
	_focus: {
		...a11yFocus,
		outlineColor: 'purple.400',
	},
});

const navigationLink = defineStyle({
	textDecoration: 'none',
	color: 'white',
	fontWeight: 'normal',
	paddingX: 8,
	paddingY: 3,
	rounded: 'md',
	_focus: {
		...a11yFocus,
		outlineColor: 'purple.400',
	},
});

const linkTheme = defineStyleConfig({
	variants: { baseLink, brandPrimary, footerLink, navigationLink },
});

export default linkTheme;
