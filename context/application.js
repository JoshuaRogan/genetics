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

		// selection
		WAA: undefined,
		WAa: undefined,
		Waa: undefined,
		s: undefined,
		h: undefined,

	},
	setPopGenVar: () => {},
	allResults: [],
	activeSections: {
		[VALID_SECTIONS.BASE]: true,
		[VALID_SECTIONS.FINITE]: true,
		[VALID_SECTIONS.SELECTION]: false,
	},
	setActiveSession: (name) => {},
	addMoreResults: (moreResult) => {},
	clearResults: () => {}
}

export const ApplicationContext = React.createContext(defaultContext);
export const ApplicationProvider = ApplicationContext.Provider;
export const ApplicationConsumer = ApplicationContext.Consumer;


export const ApplicationContextProvider = ({ children }) => {
	const [popGenVars, setPopGenVars] = React.useState(defaultContext.popGenVars);
	const [activeSections, setActiveSessionState] = React.useState(defaultContext.activeSections);
	const [allResults, setAllResults] = React.useState([]);

	const setPopGenVar = (varName, value) => {
		if (!nameToVariable(varName)) {
			console.error("Failed to set population gen var for " + varName)
			return;
		}

		const newVar = {};
		newVar[nameToVariable(varName)] = valueToProper(varName, value);
		setPopGenVars({ ...popGenVars, ...newVar});
	};

	const addMoreResults = (newResult) => setAllResults((allPreviousResults => {
		return [...allPreviousResults, newResult.results];
	}));

	const setActiveSession = (name, status) => {
		const newVar = {};
		newVar[name] = status;
		setActiveSessionState({...activeSections, ...newVar })
	};

	const clearResults = () => {
		setAllResults([]);
	}

  return (
    <ApplicationContext.Provider value={{ popGenVars, b: '123', setPopGenVar, addMoreResults, allResults, clearResults, activeSections, setActiveSession }}>
      {children}
    </ApplicationContext.Provider>
  )
}
