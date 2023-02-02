interface ThemeInterface {
  colors: {
    primary: string
		accent: string
		secondary: string
		background: string
		body: string
		text: string
		title: string
		disabled: string
  }
	space: {
		_1x: string
		_2x: string
		_3x: string
		_4x: string
	}
	_mq: {
		[key: string]: string
	},
}


enum Size {
	MOBILE_SMALL = '320px',
	MOBILE = '375px',
	MOBILE_LARGE = '425px',
	TABLET = '768px',
	DESKTOP = '1024px',
	DESKTOP_LARGE = '1440px',
	DESKTOP_XLARGE = '2560px',
};

enum Device {
	MOBILE_SMALL = `(min-width: ${Size.MOBILE_SMALL})`,
	MOBILE = `(min-width: ${Size.MOBILE})`,
	MOBILE_LARGE = `(min-width: ${Size.MOBILE_LARGE})`,
	TABLET = `(min-width: ${Size.TABLET})`,
	DESKTOP = `(min-width: ${Size.DESKTOP})`,
	DESKTOP_LARGE = `(min-width: ${Size.DESKTOP_LARGE})`,
	DESKTOP_XLARGE = `(min-width: ${Size.DESKTOP_XLARGE})`,
};


// default theme options for both light and dark theme
const defaultTheme = {
	space: {
		_1x: '0.5rem',
		_2x: '1rem',
		_3x: '1.5rem',
		_4x: '2rem',
	},
	_mq: {
		...Device,
	},
};

const lightTheme: ThemeInterface = {
  colors: {
    primary: '#4b516a',
		accent: '#0070f3',
		secondary: '#0070f3',
		background: '#333333',
		body: '#ffffff',
		text: '#333333',
		title: '#1b3039',
		disabled: '#aba9a9',
  },
	...defaultTheme
};

const darkTheme: ThemeInterface = {
	colors: {
		primary: '#4b516a',
		accent: '#0070f3',
		secondary: '#0070f3',
		background: '#333333',
		body: '#17141D',
		text: '#ffffff',
		title: '#ffffff',
		disabled: '#aba9a9',
	},
	...defaultTheme
};


export {
	lightTheme,
	darkTheme,
}