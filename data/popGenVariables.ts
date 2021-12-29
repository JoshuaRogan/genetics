
export const VALIDSECTIONS = {
	BASE: 'base-simulation',
	FINITE: 'finite-population',
	SELECTION: 'selection',
	MUTATION: 'mutation',
	// ...continue
}

export const VALID_VARIABLES = {
	NUM_GENERATIONS: 'number-of-generations',
	STARTING_ALLELE_FREQ: 'starting-allele-frequency',
	POPULATION_SIZE: 'population-size',
};


interface PopGenVariable {
	name: string;
	variable: string;
	description: string;
	section: string;
	order: number; // the order it appears within its section
}

export const popGenVariables = [
	{
		name: VALID_VARIABLES.NUM_GENERATIONS,
		variable: 't',
		description: 'This is the number of generations to be simulated',
		section: VALIDSECTIONS.BASE,
		order: 0,
	},
	{
		name: VALID_VARIABLES.STARTING_ALLELE_FREQ,
		variable: 'p',
		description: 'This is the frequency of the allele of interest, A, at generation 0.',
		section: VALIDSECTIONS.BASE,
		order: 1,
	},
	{
		name: VALID_VARIABLES.POPULATION_SIZE,
		variable: 'N',
		section: VALIDSECTIONS.FINITE,
		order: 0,
	}
] as PopGenVariable[];

export function getPopGenVariableByName(name: string) : PopGenVariable {
	return popGenVariables.find(popgenVar => popgenVar.name === name);
}

export function nameToVariable(name: string) : string {
	return getPopGenVariableByName(name).variable;
}

