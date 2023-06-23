import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

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
		ring: false,
		outlineColor: 'purple.500',
		outlineOffset: 4,
		outlineWidth: 3,
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
		ring: false,
		outlineColor: 'purple.500',
		outlineOffset: 4,
		outlineWidth: 3,
	},
});

const linkTheme = defineStyleConfig({
	variants: { brandPrimary, footerLink, navigationLink },
});

export default linkTheme;
