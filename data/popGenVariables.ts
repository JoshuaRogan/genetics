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
			'The number of individuals per generation in the simulation. The range of population sizes are from 1 to 10,000. The default assumption is a population of infinite size. The number of alleles in the model is 2N because each individual has two copies of each allele.',
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
		description: 'The number of generations to be simulated. A grandparent, parent, child represent three generations.',
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
		variable: 'p',
		description:
			' The frequency of the allele of interest, A₁, at the beginning of the simulation. The beginning of the simulation is generation 0.',
		section: VALID_SECTIONS.BASE,
		order: 1,
		defaultValue: 0.5,
		min: 0,
		max: 1,
		step: 0.001,
		sliderName: 'Starting Frequency for Allele A₁',
	},

	{
		name: VALID_VARIABLES.NUM_OF_POPULATIONS,
		variable: 'Nb',
		description:
			'This is the number of individuals in the population during the event. When “Number of Populations in a Simulation” is greater than one, you get multiple populations each represented by their own lines from the same simulation setting when clicking “Run Simulation”. Each line is a simulated population generated from the same settings. Clicking “Run Simulation” will replace the current set of lines with a newer set of lines.',
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
		variable: 'WAA',
		section: VALID_SECTIONS.SELECTION,
		order: 0,
		defaultValue: 1,
		min: 0,
		max: 1,
		step: 0.001,
		sliderName: 'Relative fitness of the A₁ A₁ genotype (WA₁ A₁)',
		description:
			// 'This describes the relative fitness of individuals with the A₁ A₁ genotype. Higher values represent greater fitness. This coefficient is used in conjunction with the fitness coefficients of the other genotype groups (i.e., wA₁A₂ and wA₂A₂). Note, selection can be defined in terms of the three fitness coefficients or in terms of the selection and dominance coefficients, but not both.',
			'The relative probability that an individual with an A₁ A₁ genotype reproduces. This is also called the WA₁ A₁ fitness coefficient. Typically one or more of the three fitness coefficients is set equal to 1 to serve as a reference, and the others are expressed as a fraction relative to the reference.',
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
			'The rate at which allele A₁ mutates to allele a per generation. The rate can be entered using a negative exponent with a base of 10. For example, 10-1 is the same as 1/10 or 0.1 mutations per generation.  10-2 represents 1/102 = 1/100 = 0.01 mutations per generation. The mutation rate per site per generation for the human genome is about 1.1×10−8 or 0.00000001 mutations per site per generation.',
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
			'The rate at which allele A₂ mutates to allele A₁ per generation. See forward mutation rate to learn about negative exponents.',
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
		description: 'The rate at which alleles from a different population enter the simulated population per generation.',
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
			'The frequency of the A₁ allele among all alleles from another population that migrate into the simulated population.',
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
			'The probability that both alleles in a randomly chosen individual in the population were inherited from the same common ancestor. A value of 0 indicates there is no inbreeding within the population. A value of 1 indicates all the alleles in the population came from the same ancestor, an extreme form of inbreeding found in model organisms that are specifically inbred to remove all genetic variation.',
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
			'Assortative mating is the tendency of individuals to choose mates with similar (or dissimilar) genotypes. A value of 1 indicates 100% positive assortative mating, meaning that individuals will only mate with other individuals of the same genotype. A value of 0 indicates total random mating. A value of 0.5 indicates that 50% of the time individuals will mate with others of the same genotype and the other 50% of the time at random.',
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
			'A population bottleneck is a time period over which there is a sudden decrease in population size but the population later recovers. Input the generation at which the bottleneck started and when it ended.',
		sliderName: 'Timing of bottleneck generations',
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
		description: 'The number of individuals in the population during the bottleneck event.',
		sliderName: 'Population Size During Bottleneck',
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
