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
	h1: {
		fontSize: ['48px', '72px'],
		fontWeight: 'bold',
		lineHeight: '110%',
		letterSpacing: '-2%',
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
		heroGradientStart: {
			default: '#7928CA',
			_dark: '#e3a7f9',
		},
		heroGradientEnd: {
			default: '#FF0080',
			_dark: '#fbec8f',
		},
	},
	radii: {
		button: '12px',
	},
}, })

export default theme;