import { ComponentStyleConfig } from '@chakra-ui/react';

const ButtonStyle: ComponentStyleConfig = {
	// style object for base or default style
	baseStyle: {},
	// styles for different sizes ("sm", "md", "lg")
	sizes: {},
	// styles for different visual variants ("outline", "solid")
	variants: {
		primary: {
			bg: 'buttonPrimary',
			color: 'white',
			_hover: {
				bg: 'blue.500',
			},
		},
		secondary: {
			bg: 'buttonSecondary',
			color: 'white',
			_hover: {
				bg: 'buttonSecondaryHover',
			},
		},
	},
	// default values for 'size', 'variant' and 'colorScheme'
	defaultProps: {
		size: 'md',
		variant: 'primary',
		colorScheme: 'buttonPrimary',
	},
};

export default ButtonStyle;
