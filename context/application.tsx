"use client"
import { nameToVariable, VALID_SECTIONS, popGenVariables, Settings } from '../data/popGenVariables';
import React from 'react';


function valueToProper(name, value) {
	// Need to convert back to decimal
	if (name === 'starting-allele-frequency') {
		return value / 1000;
	}

	return value;
}

const defaultValuesForSettings = {} as Settings;
popGenVariables.forEach(popGenVar => {
	defaultValuesForSettings[popGenVar.variable] = popGenVar.defaultValue
});

export const defaultContext = {
	// Default values for variables in popGenVariablesFile
	popGenVars: defaultValuesForSettings as Settings,
	setPopGenVar: (varName, value) => {},
	alleleResults: [],
	genoTypeResults: [],
	settingResults: [],
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
	setActiveSession: (name, status) => {},
	addMoreResults: (moreResult, settingsResults) => {},
	clearResults: () => {}
}



export const ApplicationContext = React.createContext(defaultContext);
export const ApplicationProvider = ApplicationContext.Provider;
export const ApplicationConsumer = ApplicationContext.Consumer;

export const ApplicationContextProvider = ({ children, isBulkSimulatorProp }) => {
	const [popGenVars, setPopGenVars] = React.useState(defaultContext.popGenVars);
	const [activeSections, setActiveSessionState] = React.useState(defaultContext.activeSections);
	const [alleleResults, setAlleleResults] = React.useState([]);
	const [genoTypeResults, setGenoTypeResults] = React.useState([]);
	const [settingResults, setSettingsResults] = React.useState([]);
	const [isBulkSimulator, setIsBulkSimulator] = React.useState(isBulkSimulatorProp ?? false);

	const setPopGenVar = (varName, value) => {
		if (!nameToVariable(varName)) {
			console.error("Failed to set population gen var for " + varName)
			return;
		}

		setPopGenVars((currentState) => {
			currentState[nameToVariable(varName)] = valueToProper(varName, value);
			return currentState
		})
	};

	const addMoreResults = (workerResults) => {
		if (workerResults.type === 'results-allele') {
			const alleleResults = workerResults.results;
			setAlleleResults((previousAlleleResults) => {
				return [...previousAlleleResults, workerResults.results];
			});


			console.log(popGenVars);
			setSettingsResults((previousSettingResults) => {
				return [...previousSettingResults, popGenVars];
			});

			const A1A1 = [];
			const A1A2 = [];
			const A2A2 = [];

			alleleResults.forEach((alleleRes) => {
				const A = alleleRes;
				const a = 1 - A;
				A1A1.push(Math.pow(A, 2)); // genotype AA is determined by squaring the allele frequency A
				A1A2.push(2 * A * a); // genotype Aa is determined by multiplying 2 times the frequency of A times the frequency of a.
				A2A2.push(Math.pow(a, 2)); //  frequency of aa is determined by squaring a.
			})
			setGenoTypeResults([A1A1, A1A2, A2A2]);
		}


	};

	// const addMoreResults = (newResult) => setAlleleResults((allPreviousResults => {
	//
	// 	return [...allPreviousResults, newResult.results];
	// }));

	const setActiveSession = (name, status) => {
		const newVar = {};
		newVar[name] = status;
		setActiveSessionState({...activeSections, ...newVar })
	};

	const clearResults = () => {
		setAlleleResults([]);
		setGenoTypeResults([]);
		setSettingsResults([]);
	}

  return (
    <ApplicationContext.Provider value={{
		activeSections,
		addMoreResults,
		alleleResults: alleleResults,
		clearResults,
		genoTypeResults,
		popGenVars,
		setActiveSession,
		setPopGenVar,
		settingResults,
	}}>
      {children}
    </ApplicationContext.Provider>
  )
}
