import { nameToVariable, VALID_SECTIONS } from '/data/popGenVariables';
import React from 'react';


function valueToProper(name, value) {
	// Need to convert back to decimal
	if (name === 'starting-allele-frequency') {
		return value / 1000;
	}

	return value;
}

export const defaultContext = {
	b: '123',
	popGenVars: {
		t: 500,
		p: 0.5,
		N: 500,
		numSims: 1,
	},
	setPopGenVar: () => {},
	lastResult: { lines: [[1,2,3], [1,2,4]] },
	setLastResult: () => {},
	activeSections: {
		[VALID_SECTIONS.BASE]: true,
		[VALID_SECTIONS.FINITE]: true,
	},
	setActiveSession: (name) => {},
}

export const ApplicationContext = React.createContext(defaultContext);
export const ApplicationProvider = ApplicationContext.Provider;
export const ApplicationConsumer = ApplicationContext.Consumer;


export const ApplicationContextProvider = ({ children }) => {
	const [popGenVars, setPopGenVars] = React.useState(defaultContext.popGenVars);
	const [lastResult, setLastResultState] = React.useState(defaultContext.lastResult);
	const [activeSections, setActiveSessionState] = React.useState(defaultContext.activeSections);

	const setPopGenVar = (varName, value) => {
		const newVar = {};
		newVar[nameToVariable(varName)] = valueToProper(varName, value);
		setPopGenVars({ ...popGenVars, ...newVar});
	};

	const setLastResult = (lastResult) => {
		setLastResultState(lastResult.results);
	};

	const setActiveSession = (name, status) => {
		const newVar = {};
		newVar[name] = status;
		setActiveSessionState({...activeSections, ...newVar })
	};

  return (
    <ApplicationContext.Provider value={{ popGenVars, b: '123', setPopGenVar, setLastResult, lastResult, activeSections, setActiveSession }}>
      {children}
    </ApplicationContext.Provider>
  )
}
