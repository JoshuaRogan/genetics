'use client';
import { nameToVariable, VALID_SECTIONS, popGenVariables, VALID_VARIABLES, Settings } from '../data/popGenVariables';
import React from 'react';

function valueToProper(name, value) {
	// Need to convert back to decimal
	if (name === VALID_VARIABLES.STARTING_ALLELE_FREQ) {
		return value / 1000;
	}

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
		inbreedingCoefficient: number|string;
		positiveAssortativeFreq: number|string;
		r_assortativeMating: number | string;
	}

// How to Calculate Assortative mating values
// p0 = this.currentAlleleFre; //The allele frequency at this time
// q0 = 1 - p0;
//
// //The previous values of d,h,r
// var d0 = this.d_assortativeMating;
// var h0 = this.h_assortativeMating;
// var r0 = this.r_assortativeMating;
// var alpha = this.positiveAssortativeFreq;
//
// //Specify each numerator first since the denominator is the same between all of them
// var d_numerator = ((1 - alpha) * Math.pow(p0, 2)) + (alpha * (d0 + h0/4));
// var h_numerator = (2 * (1 - alpha) * p0 * q0) + (alpha * (h0/2));
// var r_numerator = ((1 - alpha) * Math.pow(q0, 2)) + (alpha * (r0 + h0/4));
// var commonDenom = d_numerator + h_numerator + r_numerator;
//
//
// console.log(d_numerator, h_numerator, r_numerator);
//
// //Update the d,h,r values
// this.d_assortativeMating = d_numerator / commonDenom;
// this.h_assortativeMating = h_numerator / commonDenom;
// this.r_assortativeMating = r_numerator / commonDenom;
//
//
// // Short hand variables for the new variables
// var d_n = this.d_assortativeMating;
// var h_n = this.h_assortativeMating; 	//Change from d_assortative...
// var r_n = this.r_assortativeMating;		//Changed from d_assortative..

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
			setGenoTypeResults([A1A1, A1A2, A2A2]);

			// // Short settings used for genotype calc
			// const settings = workerResults.settings as WorkerSettings;
			// const hasAssort = workerResults.settings.assortMating;
			// const hasInbreeding = workerResults.settings.hasInbreeding;

			// alleleResults.forEach((alleleRes) => {
			// 	const A = alleleRes;
			// 	const a = 1 - A;
			//
			//
			// 	if (hasAssort) {
			// 		// var d0 = this.d_assortativeMating;
			// 		// var h0 = this.h_assortativeMating;
			// 		// var r0 = this.r_assortativeMating;
			// 		// var alpha = this.positiveAssortativeFreq;
			// 		//
			// 		// //Specify each numerator first since the denominator is the same between all of them
			// 		// var d_numerator = ((1 - alpha) * Math.pow(p0, 2)) + (alpha * (d0 + h0/4));
			// 		// var h_numerator = (2 * (1 - alpha) * p0 * q0) + (alpha * (h0/2));
			// 		// var r_numerator = ((1 - alpha) * Math.pow(q0, 2)) + (alpha * (r0 + h0/4));
			// 		// var commonDenom = d_numerator + h_numerator + r_numerator;
			// 		// console.log(d_numerator, h_numerator, r_numerator);
			// 		// //Update the d,h,r values
			// 		// this.d_assortativeMating = d_numerator / commonDenom;
			// 		// this.h_assortativeMating = h_numerator / commonDenom;
			// 		// this.r_assortativeMating = r_numerator / commonDenom;
			// 	}
			//
			// 	// P(AA)t = Dt + Fpt (1‐pt)
			//     // P(Aa)t = Ht – 2Fpt (1‐pt)
			//     // P(aa)t = Rt + Fpt (1‐pt)
			// 	if (hasInbreeding && hasAssort) {
			//
			// 	} else if(hasInbreeding) {
			//
			//
			// 	} else if(hasAssort) {
			// 	// P(AA)t = Dt
			// 	// P(Aa)t = Ht
			// 	// P(aa)t = Rt
			//
			//
			// 	} else {
			//
			// 	}
			//
			// 	A1A1.push(Math.pow(A, 2)); // genotype AA is determined by squaring the allele frequency A
			// 	A1A2.push(2 * A * a); // genotype Aa is determined by multiplying 2 times the frequency of A times the frequency of a.
			// 	A2A2.push(Math.pow(a, 2)); //  frequency of aa is determined by squaring a.
			//
			// });

		}
	};

	// const addMoreResults = (newResult) => setAlleleResults((allPreviousResults => {
	//
	// 	return [...allPreviousResults, newResult.results];
	// }));

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
			}}
		>
			{children}
		</ApplicationContext.Provider>
	);
};
