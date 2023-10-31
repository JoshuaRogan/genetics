import store from '../redux/store';

export type RootState = {
	popGenVars: Settings;
	activeSections: Record<string, boolean>;
	alleleResults: string[];
	genoTypeResults: Object[];
	settingResults: Settings[];
	activeSectionsResults: Record<string, boolean>[];
};

export type StoreState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type FAQItem = {
	type: 'text' | 'image' | 'list' | 'video' | 'math';
	value: string | string[];
	alt?: string;
};

export type FAQ = {
	question: string;
	answer: string | FAQItem[];
};

export type GenoTypeFrequency = {
	AA: number[];
	Aa: number[];
	aa: number[];
};

export type Settings = {
	t: number;
	p: number;
	N: number;
	Nb: number;
	numSims: number;

	// selection
	WAA: number;
	WAa: number;
	Waa: number;
	s: number;
	h: number;

	// Mutation
	mu: number;
	'mu-exp': number;
	nu: number;
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
	nB: number;
};

export type PopGenVariable = {
	name: string;
	variable: string;
	variableHTML?: string;
	description: string;
	section: string;
	sliderName: string;
	order: number;
	min: number;
	max: number;
	step: number;
	defaultValue: number;
};

export enum VALID_SECTIONS {
	BASE = 'Base Simulation',
	FINITE = 'Finite Population',
	SELECTION = 'Selection',
	MUTATION = 'Mutation',
	MIGRATION = 'Migration',
	INBREEDING = 'Inbreeding',
	ASSORT_MATING = 'Assortative Mating',
	BOTTLENECK_GEN = 'Bottleneck Generations',
}

export enum VALID_VARIABLES {
	NUM_GENERATIONS = 'number-of-generations',
	STARTING_ALLELE_FREQ = 'starting-allele-frequency',
	POPULATION_SIZE = 'population-size',
	NUM_REPLICATED = 'number-replicated',
	NUM_OF_POPULATIONS = 'number-of-populations',

	SELECTION_WAA = 'selection-wAA',
	SELECTION_WAa = 'selection-WAa',
	SELECTION_Waa = 'selection-Waa',
	SELECTION_COEFFICIENT = 'selection-coefficient',
	SELECTION_DOMINANCE_COEFFICIENT = 'selection-dominance-coefficient',

	MUTATION_FORWARD_MUTATION = 'mutation-forward',
	MUTATION_BACKWARD_MUTATION = 'mutation-backward',
	MUTATION_FORWARD_MUTATION_EXPONENT = 'mutation-forward-exponent',
	MUTATION_BACKWARD_MUTATION_EXPONENT = 'mutation-backward-exponent',

	MIGRATION_MIGRATION_RATE = 'migration-rate',
	MIGRATION_MIGRANT_ALLELE_FREQ = 'migration-migrant-allele-freq',

	INBREEDING_COEFFICIENT = 'inbreeding-coeff',

	ASSORT_MATING_POSITIVE_FREQ = 'positive-assortative-mating-frequency',

	BOTTLENECK_GEN_TO_OVERRIDE_START = 'bottle-neck-gen-to-override-start',
	BOTTLENECK_GEN_TO_OVERRIDE_END = 'bottle-neck-gen-to-override-end',
	BOTTLENECK_POPULATION_SIZE = 'bottle-neck-population-size',
}
