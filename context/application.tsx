'use client';
import { nameToVariable, popGenVariables } from '../data/popGenVariables';
import React from 'react';
import { Settings, VALID_SECTIONS } from '../types';

function valueToProper(name, value) {
	// Need to convert back to decimal
	return value;
}

const defaultValuesForSettings = {} as Settings;
popGenVariables.forEach((popGenVar) => {
	defaultValuesForSettings[popGenVar.variable] = popGenVar.defaultValue;
});

const defaultActiveSectionState = {
	[VALID_SECTIONS.BASE]: true,
	[VALID_SECTIONS.FINITE]: true,
	[VALID_SECTIONS.SELECTION]: false,
	[VALID_SECTIONS.MUTATION]: false,
	[VALID_SECTIONS.MIGRATION]: false,
	[VALID_SECTIONS.INBREEDING]: false,
	[VALID_SECTIONS.ASSORT_MATING]: false,
	[VALID_SECTIONS.BOTTLENECK_GEN]: false,
};

export const defaultContext = {
	// Default values for variables in popGenVariablesFile
	popGenVars: defaultValuesForSettings as Settings,
	setPopGenVar: (varName, value) => {},
	alleleResults: [],
	genoTypeResults: [],
	settingResults: [],
	activeSectionsResults: [],
	activeSections: Object.assign({}, defaultActiveSectionState),
	setActiveSession: (name, status) => {},
	addMoreResults: (moreResult, settingsResults) => {},
	clearResults: () => {},
	resetInputValues: () => {},
	resetDefaultActiveSections: () => {},
};

export const ApplicationContext = React.createContext(defaultContext);
export const ApplicationProvider = ApplicationContext.Provider;
export const ApplicationConsumer = ApplicationContext.Consumer;

export const ApplicationContextProvider = ({ children, isBulkSimulatorProp }) => {
	// set values from url params if they exist, otherwise use default values
	const urlParams = new URLSearchParams(window.location.search);
	const popGenValues = {} as Settings;

	// Iterate through all the available variables and set the default values
	// if they are not in the url params already (i.e. if they are not set)
	popGenVariables.forEach((popGenVar) => {
		const paramValue = urlParams.get(popGenVar.variable);

		// If the param value is set and is not the default value, then we should
		// set the section to be active since the user has set a value for it.
		if (paramValue && Number(paramValue) !== popGenVar.defaultValue) {
			defaultContext.activeSections[popGenVar.section] = true;
		}

		popGenValues[popGenVar.variable] = paramValue || popGenVar.defaultValue;
	});

	const [popGenVars, setPopGenVars] = React.useState(popGenValues || defaultContext.popGenVars);
	const [activeSections, setActiveSectionState] = React.useState(defaultContext.activeSections);
	const [alleleResults, setAlleleResults] = React.useState([]);
	const [genoTypeResults, setGenoTypeResults] = React.useState([]);
	const [settingResults, setSettingsResults] = React.useState([]);
	const [activeSectionsResults, setActiveSectionsResults] = React.useState([]);
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

	const addMoreResults = (workerResults) => {
		if (workerResults.type === 'results-allele') {
			setAlleleResults((previousAlleleResults) => {
				return [...previousAlleleResults, workerResults.results];
			});

			setSettingsResults((previousSettingResults) => {
				return [...previousSettingResults, { ...popGenVars }];
			});

			setActiveSectionsResults((previousActiveSectionsResults) => {
				return [...previousActiveSectionsResults, workerResults.resultsSettings];
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
		setActiveSectionState({ ...activeSections, ...newVar });
	};

	const clearResults = () => {
		setAlleleResults([]);
		setGenoTypeResults([]);
		setSettingsResults([]);
		setActiveSectionsResults([]);
	};

	const resetInputValues = () => {
		const defaultValues = {} as Settings;
		popGenVariables.forEach((popGenVar) => {
			defaultValues[popGenVar.variable] = popGenVar.defaultValue;
		});
		setPopGenVars(defaultValues);
	};

	const resetDefaultActiveSections = () => {
		setActiveSectionState(defaultActiveSectionState);
	};

	return (
		<ApplicationContext.Provider
			value={{
				activeSections,
				alleleResults,
				settingResults,
				genoTypeResults,
				popGenVars,
				activeSectionsResults,
				addMoreResults,
				clearResults,
				setActiveSession,
				setPopGenVar,
				resetInputValues,
				resetDefaultActiveSections,
			}}
		>
			{children}
		</ApplicationContext.Provider>
	);
};
