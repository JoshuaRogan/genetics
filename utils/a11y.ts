import { SystemStyleObject } from '@chakra-ui/react';

export const a11yFocus: SystemStyleObject = {
	ring: false,
	outlineColor: 'purple.500',
	outlineOffset: 4,
	outlineWidth: 3,
	_dark: {
		outlineColor: 'purple.400',
	},
};

export const a11yThumbFocus: SystemStyleObject = {
	ring: false,
	outlineColor: 'purple.500',
	outlineOffset: 1,
	outlineWidth: 3,
	_dark: {
		outlineColor: 'purple.100',
	},
};
