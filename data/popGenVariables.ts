export const VALID_SECTIONS = {
	BASE: 'base-simulation',
	FINITE: 'finite-population',
	SELECTION: 'selection',
	MUTATION: 'mutation',
	MIGRATION: 'migration',
	INBREEDING: 'inbreeding',
	ASSORT_MATING: 'assortative-mating',
	BOTTLENECK_GEN: 'bottleneck-generations',
	// ...continue
};

export const VALID_VARIABLES = {
	NUM_GENERATIONS: 'number-of-generations',
	STARTING_ALLELE_FREQ: 'starting-allele-frequency',
	POPULATION_SIZE: 'population-size',
	NUM_REPLICATED: 'number-replicated',
	NUM_OF_POPULATIONS: 'number-of-populations',

	SELECTION_WAA: 'selection-wAA',
	SELECTION_WAa: 'selection-WAa',
	SELECTION_Waa: 'selection-Waa',
	SELECTION_COEFFICIENT: 'selection-coefficient',
	SELECTION_DOMINANCE_COEFFICIENT: 'selection-dominance-coefficient',

	MUTATION_FORWARD_MUTATION: 'mutation-forward',
	MUTATION_BACKWARD_MUTATION: 'mutation-backward',
	MUTATION_FORWARD_MUTATION_EXPONENT: 'mutation-forward-exponent',
	MUTATION_BACKWARD_MUTATION_EXPONENT: 'mutation-backward-exponent',

	MIGRATION_MIGRATION_RATE: 'migration-rate',
	MIGRATION_MIGRANT_ALLELE_FREQ: 'migration-migrant-allele-freq',

	INBREEDING_COEFFICIENT: 'inbreeding-coeff',

	ASSORT_MATING_POSITIVE_FREQ: 'positive-assortative-mating-frequency',

	BOTTLENECK_GEN_TO_OVERRIDE_START: 'bottle-neck-gen-to-override-start',
	BOTTLENECK_GEN_TO_OVERRIDE_END: 'bottle-neck-gen-to-override-end',
	BOTTLENECK_POPULATION_SIZE: 'bottle-neck-population-size',
};

// IMPORTANT THIS IS JUST A MECHANISM TO HELP AUTOCOMPLETE. NEED TO KEEP UPDATED WITH THE VARIABLES BELOW
export interface Settings {
	t: number;
	p: number;
	N: number;
	numSims: number;

	// selection
	WAA: number;
	WAa: number;
	Waa: number;
	s: number;
	h: number;

	// Mutation
	mu: number; // forward mutation
	'mu-exp': number;
	nu: number; // reverse mutation
	'nu-exp': number;

	// Migration
	m: number;
	pm: number;

	// Inbreeding
	F: number;

	// Assortative Mating
	assortMating: number;

	// Bottleneck
	'gen-to-over-start': number;
	'gen-to-over-end': number;
	BNb: number;
}

interface PopGenVariable {
	name: string;
	variable: string;
	variableHTML?: string;
	description: string;
	section: string;
	sliderName?: string;
	order: number;
	min?: number;
	max?: number;
	step?: number;
	defaultValue: number;
}

export const popGenVariables = [
	// BASE SIMULATION INPUTS
	{
		name: VALID_VARIABLES.NUM_GENERATIONS,
		variable: 't',
		description: 'This is the number of generations to be simulated',
		section: VALID_SECTIONS.BASE,
		order: 0,
		defaultValue: 500,
		min: 1,
		max: 10000,
		step: 1,
		sliderName: 'Generations',
	},
	{
		name: VALID_VARIABLES.NUM_REPLICATED,
		variable: 'numSims',
		description: 'temp desc',
		section: VALID_SECTIONS.BASE,
		order: 1,
		defaultValue: 3,
		min: 1,
		max: 50,
		step: 1,
		sliderName: 'Number of Populations',
	},
	{
		name: VALID_VARIABLES.STARTING_ALLELE_FREQ,
		variable: 'p',
		description: 'This is the frequency of the allele of interest, A, at generation 0.',
		section: VALID_SECTIONS.BASE,
		order: 1,
		defaultValue: 0.5,
		min: 0,
		max: 1,
		step: 0.001,
		sliderName: 'Starting Allele Frequency',
	},
	{
		name: VALID_VARIABLES.POPULATION_SIZE,
		variable: 'N',
		description:
			'This is the number of individuals, N, per generation in the simulation. Note, the number of chromosomes is 2N. If this parameter is not enabled, the simulation will model the theoretical infinitely sized population.',
		section: VALID_SECTIONS.FINITE,
		order: 0,
		defaultValue: 500,
		min: 1,
		max: 10000,
		step: 1,
		sliderName: 'Population Size',
	},
	{
		name: VALID_VARIABLES.NUM_OF_POPULATIONS,
		variable: 'Nb',
		description:
			'This is the number of individuals in the population during the event. Note that the number of chromosomes simulated is 2NB',
		section: VALID_SECTIONS.BASE,
		order: 0,
		defaultValue: 1,
		min: 1,
		max: 50,
		step: 1,
		sliderName: 'Number of Populations',
	},

	// SELECTION
	{
		name: VALID_VARIABLES.SELECTION_WAA,
		variable: 'WAA',
		section: VALID_SECTIONS.SELECTION,
		order: 0,
		defaultValue: 1,
		min: 0,
		max: 1,
		step: 0.001,
		sliderName: 'Fitness Coefficient (WAA)',
		description:
			'This describes the relative fitness of individuals with the AA genotype. Higher values represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wAa and waa). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and dominance coefficients, but not both.',
	},
	{
		name: VALID_VARIABLES.SELECTION_WAa,
		variable: 'WAa',
		section: VALID_SECTIONS.SELECTION,
		order: 1,
		defaultValue: 1,
		min: 0,
		max: 1,
		step: 0.001,
		sliderName: 'Fitness Coefficient (WAa)',
		description:
			'This describes the relative fitness of individuals with the Aa genotype. Higher values represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wAA and waa). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and dominance coefficients, but not both.',
	},
	{
		name: VALID_VARIABLES.SELECTION_Waa,
		variable: 'Waa',
		section: VALID_SECTIONS.SELECTION,
		order: 2,
		defaultValue: 1,
		min: 0,
		max: 1,
		step: 0.001,
		sliderName: 'Fitness Coefficient (Waa)',
		description:
			'This describes the relative fitness of individuals with the aa genotype. Higher values represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wAA and wAa). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and dominance coefficients, but not both.',
	},
	{
		name: VALID_VARIABLES.SELECTION_COEFFICIENT,
		variable: 's',
		section: VALID_SECTIONS.SELECTION,
		order: 3,
		defaultValue: 0,
	},
	{
		name: VALID_VARIABLES.SELECTION_DOMINANCE_COEFFICIENT,
		variable: 'h',
		section: VALID_SECTIONS.SELECTION,
		order: 4,
		defaultValue: 1,
	},

	// MUTATION
	{
		name: VALID_VARIABLES.MUTATION_FORWARD_MUTATION,
		variable: 'mu',
		variableHTML: 'μ',
		section: VALID_SECTIONS.MUTATION,
		order: 0,
		sliderName: 'Forward Mutation Rate',
		defaultValue: 0,
		min: 0,
		max: 9.9999,
		step: 0.001,
		description: 'The rate at which allele A mutates to allele a per generation.',
	},
	{
		name: VALID_VARIABLES.MUTATION_BACKWARD_MUTATION,
		variable: 'nu',
		variableHTML: 'v',
		section: VALID_SECTIONS.MUTATION,
		order: 1,
		sliderName: 'Backward Mutation Rate',
		defaultValue: 0,
		min: 0,
		max: 1,
		step: 0.001,
		description: 'The rate at which allele a mutates to allele A per generation',
	},
	{
		name: VALID_VARIABLES.MUTATION_FORWARD_MUTATION_EXPONENT,
		variable: 'mu-exp',
		section: VALID_SECTIONS.MUTATION,
		order: 0,
		sliderName: 'Forward Mutation Exponent',
		defaultValue: -5,
		min: -10,
		max: -1,
		step: 1,
		description: '10 to the nth power (-10 to -1) for forward mutation',
	},
	{
		name: VALID_VARIABLES.MUTATION_BACKWARD_MUTATION_EXPONENT,
		variable: 'nu-exp',
		section: VALID_SECTIONS.MUTATION,
		order: 1,
		sliderName: 'Backward Mutation Exponent',
		defaultValue: -5,
		min: -10,
		max: -1,
		step: 1,
		description: '10 to the nth power (-10 to -1) for backward mutation',
	},

	// Migration
	{
		name: VALID_VARIABLES.MIGRATION_MIGRATION_RATE,
		variable: 'm',
		section: VALID_SECTIONS.MIGRATION,
		sliderName: 'Migration Rate',
		description: 'The rate at which migrant alleles enter the population per generation.',
		order: 0,
		defaultValue: 0,
		min: 0,
		max: 1,
		step: 0.001,
	},
	{
		name: VALID_VARIABLES.MIGRATION_MIGRANT_ALLELE_FREQ,
		variable: 'pm',
		variableHTML: 'P<sub>M</sub>',
		sliderName: 'Migrant Allele Frequency',
		section: VALID_SECTIONS.MIGRATION,
		description: 'The frequency of the A allele among all migrant alleles entering the population.',
		order: 1,
		defaultValue: 0.5,
		min: 0,
		max: 1,
		step: 0.001,
	},

	// Inbreeding
	{
		name: VALID_VARIABLES.INBREEDING_COEFFICIENT,
		variable: 'F',
		section: VALID_SECTIONS.INBREEDING,
		order: 0,
		description:
			'This is the probability that both alleles in a randomly chosen individual in the population are identical‐by‐descent (IBD). A value of F = 0 indicates there is no inbreeding within the population. A value of 1 indicates that there is complete autozygosity such as found in inbred lines of model organisms',
		sliderName: 'Inbreeding Coefficient',
		defaultValue: 0,
		min: 0,
		max: 1,
		step: 0.001,
	},

	// Assort
	{
		name: VALID_VARIABLES.ASSORT_MATING_POSITIVE_FREQ,
		variable: 'assortMating',
		variableHTML: 'α',
		section: VALID_SECTIONS.ASSORT_MATING,
		order: 0,
		description:
			'This is the excess fraction of positive assortative matings in the population where 1 ‐ α is the fraction of random matings. A value of α = 1 indicates 100% positive assortative mating, and a value of α = 0 indicates total random mating.',
		sliderName: 'Positive Assortative Mating Frequency',
		defaultValue: 0,
		min: 0,
		max: 1,
		step: 0.001,
	},

	// Bottleneck
	{
		name: VALID_VARIABLES.BOTTLENECK_GEN_TO_OVERRIDE_START,
		variable: 'gen-to-over-start',
		section: VALID_SECTIONS.BOTTLENECK_GEN,
		order: 0,
		description:
			'These parameters indicate the start and end generations, respectively, of the population bottleneck event.',
		sliderName: 'Generations to Override Start/End',
		defaultValue: 0,
		min: 0,
		max: 500,
		step: 1,
	},
	{
		name: VALID_VARIABLES.BOTTLENECK_GEN_TO_OVERRIDE_END,
		variable: 'gen-to-over-end',
		section: VALID_SECTIONS.BOTTLENECK_GEN,
		order: 0,
		description:
			'These parameters indicate the start and end generations, respectively, of the population bottleneck event.',
		sliderName: 'Generations to Override End',
		defaultValue: 50,
		min: 0,
		max: 500,
		step: 1,
	},
	{
		name: VALID_VARIABLES.BOTTLENECK_POPULATION_SIZE,
		variable: 'BNb',
		variableHTML: 'BN<sub>B</sub>',
		section: VALID_SECTIONS.BOTTLENECK_GEN,
		order: 0,
		description:
			'This is the number of individuals in the population during the bottleneck event. Note that the number of chromosomes simulated is 2NB',
		sliderName: 'Population Size',
		defaultValue: 5000,
		min: 0,
		max: 10000,
		step: 1,
	},
] as PopGenVariable[];

export function getPopGenVariableByName(name: string): PopGenVariable {
	return popGenVariables.find((popgenVar) => popgenVar.name === name);
}

export function getPopGenVariableByVariable(variable: string): PopGenVariable {
	return popGenVariables.find((popgenVar) => popgenVar.variable === variable);
}

export function nameToVariable(name: string): string | null {
	try {
		return getPopGenVariableByName(name).variable;
	} catch (e) {
		console.error('NameToVariable issue for ' + name);
		throw null;
	}
}
