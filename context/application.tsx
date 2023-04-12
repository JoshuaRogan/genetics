'use client';
import { nameToVariable, VALID_SECTIONS, popGenVariables, VALID_VARIABLES, Settings } from '../data/popGenVariables';
import React from 'react';

function valueToProper(name, value) {
	// Need to convert back to decimal
	return value;
}

const defaultValuesForSettings = {} as Settings;
popGenVariables.forEach((popGenVar) => {
	defaultValuesForSettings[popGenVar.variable] = popGenVar.defaultValue;
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
	clearResults: () => {},
	resetInputValues: () => {},
};

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
			console.error('Failed to set population gen var for ' + varName);
			return;
		}

		setPopGenVars((currentState) => {
			currentState[nameToVariable(varName)] = valueToProper(varName, value);
			return currentState;
		});
	};

	interface WorkerSettings {
		assortMating: boolean;
		d_assortativeMating: number;
		h_assortativeMating: number;
		hasInbreeding: boolean;
		inbreedingCoefficient: number | string;
		positiveAssortativeFreq: number | string;
		r_assortativeMating: number | string;
	}

	const addMoreResults = (workerResults) => {
		console.log(workerResults);
		if (workerResults.type === 'results-allele') {
			const alleleResults = workerResults.results;
			setAlleleResults((previousAlleleResults) => {
				return [...previousAlleleResults, workerResults.results];
			});

			setSettingsResults((previousSettingResults) => {
				return [...previousSettingResults, { ...popGenVars }];
			});
			const genoTypeFreqs = workerResults.genotypeFreqs;
			const A1A1 = genoTypeFreqs.AA;
			const A1A2 = genoTypeFreqs.Aa;
			const A2A2 = genoTypeFreqs.aa;
			setGenoTypeResults([A1A1, A1A2, A2A2]); // Order matters here
		}
	};

	const setActiveSession = (name, status) => {
		const newVar = {};
		newVar[name] = status;
		setActiveSessionState({ ...activeSections, ...newVar });
	};

	const clearResults = () => {
		setAlleleResults([]);
		setGenoTypeResults([]);
		setSettingsResults([]);
	};

	const resetInputValues = () => {
		setPopGenVars(defaultContext.popGenVars);
	};

	return (
		<ApplicationContext.Provider
			value={{
				activeSections,
				addMoreResults,
				alleleResults: alleleResults,
				clearResults,
				genoTypeResults,
				popGenVars,
				setActiveSession,
				setPopGenVar,
				settingResults,
				resetInputValues,
			}}
		>
			{children}
		</ApplicationContext.Provider>
	);
};
