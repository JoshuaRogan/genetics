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

	// Default values for variables in popGenVariablesFile
	popGenVars: {
		t: 500,
		p: 0.5,
		N: 500,
		numSims: 1,

		// selection
		WAA: 1,
		WAa: 1,
		Waa: 1,
		s: 0,
		h: 1,

		// Mutation
		mu: 0, // forward mutation
		'mu-exp': -5,
		nu: 0, // reverse mutation
		'nu-exp': -5,

		// Migration
		m: 0,
		pm: 0.500,

		// Inbreeding
		F: 0,

		// Assortative Mating
		assortMating: 0,

		// Bottleneck
		'gen-to-over-start': 0,
		'gen-to-over-end': 50,
		Nb: 5000,



	},
	setPopGenVar: () => {},
	allResults: [],
	activeSections: {
		[VALID_SECTIONS.BASE]: true,
		[VALID_SECTIONS.FINITE]: true,
		[VALID_SECTIONS.SELECTION]: false,
		[VALID_SECTIONS.MUTATION]: false,
		[VALID_SECTIONS.MIGRATION]: false,
		[VALID_SECTIONS.INBREEDING]: false,
		[VALID_SECTIONS.ASSORT_MATING]: false,
		[VALID_SECTIONS.BOTTLENECK_GEN]: false,
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
