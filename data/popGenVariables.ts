import { PopGenVariable, VALID_SECTIONS, VALID_VARIABLES } from '../types';

export const popGenVariables: PopGenVariable[] = [
	{
		name: VALID_VARIABLES.NUM_REPLICATED,
		variable: 'numSims',
		description: 'temp desc',
		section: VALID_SECTIONS.BASE,
		order: 1,
		defaultValue: 1,
		min: 1,
		max: 50,
		step: 1,
		sliderName: 'Number of Populations',
	},

	// BASE SIMULATION INPUTS
	{
		name: VALID_VARIABLES.POPULATION_SIZE,
		variable: 'N',
		description:
			'The number of individuals in the population. The range of population sizes is from 1 to 10,000, with an option to select a population of infinite size. The number of alleles in the model is 2N because each individual has two copies of each allele.',
		section: VALID_SECTIONS.FINITE,
		order: 0,
		defaultValue: 500,
		min: 1,
		max: 10000,
		step: 1,
		sliderName: 'Population Size',
	},
	{
		name: VALID_VARIABLES.NUM_GENERATIONS,
		variable: 't',
		description: 'The number of generations that will be simulated. The starting generation is Generation 0.',
		section: VALID_SECTIONS.BASE,
		order: 0,
		defaultValue: 500,
		min: 1,
		max: 10000,
		step: 1,
		sliderName: 'Generations',
	},
	{
		name: VALID_VARIABLES.STARTING_ALLELE_FREQ,
		variable: 'p₀',
		description:
			'The frequency of allele A₁ (the allele of interest) in the starting generation. ',
		section: VALID_SECTIONS.BASE,
		order: 1,
		defaultValue: 0.5,
		min: 0,
		max: 1,
		step: 0.001,
		sliderName: 'Starting Frequency of Allele A₁',
	},

	{
		name: VALID_VARIABLES.NUM_OF_POPULATIONS,
		variable: 'Nb',
		description:
			'This is the number of individuals in the population during the event. When this value is greater than 1, multiple simulations with the same settings are run simultaneously. Each simulation is an independent, replicated population with its own data.',
		section: VALID_SECTIONS.BASE,
		order: 0,
		defaultValue: 1,
		min: 1,
		max: 50,
		step: 1,
		sliderName: 'Number of Populations in a Simulation',
	},

	// SELECTION
	{
		name: VALID_VARIABLES.SELECTION_WAA,
		variable: 'WA₁ A₁',
		variableHTML: 'W<sub>A1A1</sub>',
		section: VALID_SECTIONS.SELECTION,
		order: 0,
		defaultValue: 1,
		min: 0,
		max: 1,
		step: 0.001,
		sliderName: 'Fitness Coefficient for A₁A₁',
		description:
			// 'This describes the relative fitness of individuals with the A₁ A₁ genotype. Higher values represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wA₁A₂ and wA₂A₂). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and dominance coefficients, but not both.',
			'The probability (from 0 to 1) that an individual with the A₁A₁ genotype reproduces relative to individuals with other genotypes.',
	},
	{
		name: VALID_VARIABLES.SELECTION_WAa,
		variable: 'WA₁ A₂',
		variableHTML: 'W<sub>A1A2</sub>',
		section: VALID_SECTIONS.SELECTION,
		order: 1,
		defaultValue: 1,
		min: 0,
		max: 1,
		step: 0.001,
		sliderName: 'Fitness Coefficient for A₁A₂',
		description:
			'The probability (from 0 to 1) that an individual with the A₁A₂ genotype reproduces relative to individuals with other genotypes.',
	},
	{
		name: VALID_VARIABLES.SELECTION_Waa,
		variable: 'WA₂ A₂',
		variableHTML: 'W<sub>A2A2</sub>',
		section: VALID_SECTIONS.SELECTION,
		order: 2,
		defaultValue: 1,
		min: 0,
		max: 1,
		step: 0.001,
		sliderName: 'Fitness Coefficient for A₂A₂',
		description:
			'The probability (from 0 to 1) that an individual with the A₂A₂ genotype reproduces relative to individuals with other genotypes.',
	},
	{
		name: VALID_VARIABLES.SELECTION_COEFFICIENT,
		sliderName: 'Selection Coefficient (s)',
		description: null,
		variable: 's',
		section: VALID_SECTIONS.SELECTION,
		order: 3,
		min: 1,
		max: 10,
		step: 1,
		defaultValue: 0,
	},
	{
		name: VALID_VARIABLES.SELECTION_DOMINANCE_COEFFICIENT,
		sliderName: 'Selection Coefficient (s)',
		description: null,
		variable: 'h',
		section: VALID_SECTIONS.SELECTION,
		order: 4,
		min: 1,
		max: 10,
		step: 1,
		defaultValue: 0,
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
		max: 10,
		step: 0.001,
		description:
			'The probability that allele A₁ changes into A₂ per generation. Enter this probability as a number multiplied by a negative exponent with a base of 10. For example, 1 X 10⁻² = 0.01 mutations per generation.',
	},
	{
		name: VALID_VARIABLES.MUTATION_BACKWARD_MUTATION,
		variable: 'nu',
		variableHTML: 'v',
		section: VALID_SECTIONS.MUTATION,
		order: 1,
		sliderName: 'Reverse Mutation Rate',
		defaultValue: 0,
		min: 0,
		max: 10,
		step: 0.001,
		description:
			'The probability that allele A₂ changes into A₁ per generation. Enter this probability as a number multiplied by a negative exponent with a base of 10. For example, 1 X 10⁻² = 0.01 mutations per generation.',
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
		description: 'The proportion of alleles (from 0 to 1) coming from an outside population per generation.',
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
		description:
			'The frequency of allele A₁ in the alleles coming from an outside population.',
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
			'The probability that both alleles of a random individual in the population were inherited from the same common ancestor. If F = 0, there is no inbreeding in the population. If F = 1, all alleles in the population came from the same ancestor. ',
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
			'The proportion of individuals in the population that choose mates with the same genotype. If α = 0, individuals always mate randomly. If α = 1, individuals always mate with other individuals that have the same genotype.',
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
		variableHTML: '',
		section: VALID_SECTIONS.BOTTLENECK_GEN,
		order: 0,
		description:
			'The generations over which the bottleneck takes place. Input the generation at which the bottleneck started and the generation at which it ended.',
		sliderName: 'Bottleneck Generations',
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
		variableHTML: 'N<sub>B</sub>',
		section: VALID_SECTIONS.BOTTLENECK_GEN,
		order: 0,
		description: 'The number of individuals in the population during the bottleneck.',
		sliderName: 'Bottleneck Population Size',
		defaultValue: 500,
		min: 0,
		max: 10000,
		step: 1,
	},
];

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
