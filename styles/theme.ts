import { extendTheme, type ThemeConfig } from '@chakra-ui/react'


// color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// Set breakpoints
const breakpoints = {
	xs: '320px',
  sm: '375px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
	'2xl': '2560px',
}

const textStyles = {
	title: {
		fontSize: { base: '24px', md: '32px', lg: '40px' },
		fontWeight: 'bold',
		lineHeight: '110%',
		marginY: '16px',
	},
	subtitle: {
		fontSize: { base: '18px', md: '24px', lg: '28px' },
		fontWeight: 'bold',
		lineHeight: '110%',
	},
}


const theme = extendTheme({ 
	config, 
	textStyles,
	breakpoints, 
	semanticTokens: {
	colors: {
		text: {
			default: '#333333',
			_dark: '#ffffff',
		},
		navBarText: {
			default: '#ffffff',
			_dark: '#ffffff',
		},
		navBar: {
			default: '#333333',
			_dark: 'gray.900',
		},
		body: {
			default: '#ffffff',
			_dark: '#333333',
		},
		sliderTrack: {
			default: 'red.100',
			_dark: 'red.100',
		},
		sliderFilledTrack: {
			default: 'tomato',
			_dark: 'tomato',
		},
	},
	radii: {
		button: '12px',
	},
}, })

export default theme;