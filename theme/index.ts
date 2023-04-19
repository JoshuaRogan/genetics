import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Global style overrides
import styles from './styles';

// Foundational style overrides
import * as foundations from './foundations';

// Component style overrides
import Button from './components/button';
import Accordion from './components/accordion';
import Checkbox from './components/checkbox';

// color mode config
const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

// Set breakpoints
const breakpoints = {
	xs: '320px',
	sm: '375px',
	md: '768px',
	lg: '1024px',
	xl: '1440px',
	'2xl': '2560px',
};

const overrides = {
	config,
	styles,
	breakpoints,
	// Other foundational style overrides go here
	...foundations,
	components: {
		Button,
		Accordion,
		Checkbox,
		// Other components go here
	},
};

export default extendTheme(overrides);
