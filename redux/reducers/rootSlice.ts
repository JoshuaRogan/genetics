import { createSlice } from '@reduxjs/toolkit';
import { popGenVariables } from '../../data/popGenVariables';
import { GenoTypeFrequency, RootState, Settings, VALID_SECTIONS } from '../../types';

import type { PayloadAction } from '@reduxjs/toolkit';

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

const defaultValuesForSettings = {} as Settings;
popGenVariables.forEach((popGenVar) => {
	defaultValuesForSettings[popGenVar.variable] = popGenVar.defaultValue;
});

const initializePopGenVars = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const popGenValues = Object.assign({}, defaultValuesForSettings);

	// Iterate through all the available variables and set the default values
	// if they are not in the url params already (i.e. if they are not set)
	popGenVariables.forEach((popGenVar) => {
		const paramValue = urlParams.get(popGenVar.variable);
		popGenValues[popGenVar.variable] = Number(paramValue) || popGenVar.defaultValue;
	});

	return popGenValues;
};

const initializeActiveSections = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const activeSections = Object.assign({}, defaultActiveSectionState);

	popGenVariables.forEach((popGenVar) => {
		const paramValue = urlParams.get(popGenVar.variable);

		// If the param value is set and is not the default value, then we should
		// set the section to be active since the user has set a value for it.
		if (paramValue && Number(paramValue) !== popGenVar.defaultValue) {
			activeSections[popGenVar.section] = true;
		}
	});

	return activeSections;
};

const initialState: RootState = {
	popGenVars: typeof window !== 'undefined' ? initializePopGenVars() : defaultValuesForSettings,
	activeSections: typeof window !== 'undefined' ? initializeActiveSections() : defaultActiveSectionState,
	alleleResults: [],
	genoTypeResults: [],
	settingResults: [],
	activeSectionsResults: [],
};

export const rootSlice = createSlice({
	name: 'rootContext',
	initialState,
	reducers: {
		setPopGenVar: (state, action: PayloadAction<{ varName: string; value: number }>) => {
			state.popGenVars[action.payload.varName] = action.payload.value;
		},
		setActiveSectionStatus: (state, action: PayloadAction<{ name: string; status: boolean }>) => {
			state.activeSections[action.payload.name] = action.payload.status;
		},
		addMoreResults: (state, action: PayloadAction<{ workerResults: any }>) => {
			const workerResults = action.payload.workerResults;

			if (workerResults.type === 'results-allele') {
				state.alleleResults.push(workerResults.results);

				const genoTypeFreqs: GenoTypeFrequency = workerResults.genotypeFreqs;
				const A1A1 = genoTypeFreqs.AA;
				const A1A2 = genoTypeFreqs.Aa;
				const A2A2 = genoTypeFreqs.aa;
				state.genoTypeResults = [A1A1, A1A2, A2A2];

				state.settingResults.push(state.popGenVars);
				state.activeSectionsResults.push(state.activeSections);
			}
		},
		clearResults: (state) => {
			state.alleleResults = [];
			state.genoTypeResults = [];
			state.settingResults = [];
			state.activeSectionsResults = [];
		},
		resetInputValues: (state) => {
			state.popGenVars = Object.assign({}, defaultValuesForSettings);
		},
		resetDefaultActiveSections: (state) => {
			state.activeSections = Object.assign({}, defaultActiveSectionState);
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setPopGenVar,
	setActiveSectionStatus,
	addMoreResults,
	clearResults,
	resetInputValues,
	resetDefaultActiveSections,
} = rootSlice.actions;

export default rootSlice.reducer;
