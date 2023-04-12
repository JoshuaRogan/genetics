// Namespaces
var popGen = popGen || {};
popGen.population = popGen.population || {};
popGen.generations = popGen.generation || {};

importScripts("/workers/popGen/popGen.population.js");
importScripts("/workers/popGen/popGen.generation.js");
importScripts("/workers/lodash/lodash.js"); //Used for cloning the generation TODO - Update and limit size

var generation = null;
var genotypeGraph = false;

onmessage = function (e) {
	var data = e.data;
	switch (data.cmd) {
		case 'initGeneration':
			initGeneration(data);
			break;
		case 'setVar':
			setVar(data)
			break;
		case 'run':
			run();
			break;
		case 'batchRun':
			batchRun();
			break;
		case 'genotypeGraph':
			genotypeGraph = true;
			break;
		default:
		// postMessage("Default Command");
	}
}

function initGeneration(data) {
	generation = new popGen.generations(data.numGenerations || 5000, data.populationSize || 1000, data.startingFrequency || .5);

	if (data.populationSize === false) {
		generation.setInfinitePopulation();
	}

	// console.log(generation);
}


function setVar(data) {
	checkGeneration();

	switch (data.varName) {
		case 'inifinite-pop':
			generation.setInfinitePopulation();
			break;
		case 'selection-W':
			generation.setFitnessCoefficients(data.wAA, data.wAa, data.waa);
			break;
		case 'selection-DS':
			generation.setSelectionDominanceCoe(data.selectionCoef, data.dominaceCoef);
			break;
		case 'mutation':
			generation.setMutation(data.mu, data.nu);
			break;
		case 'migration':
			generation.setMigrationRate(data.migrationRate, data.migrantAlleleFreq);
			break;
		case 'inbreeding':
			generation.setInbreedingCoefficient(data.inbreedCoef);
			break;
		case 'assortative-mating':
			generation.setAssortativeMating(data.matingFreq);
			break;
		case 'population-bottleneck':
			generation.setpopulationBottleneck(data.generationStart, data.generationEnd, data.newPopulationSize);
			break;
		default:
			postMessage("Variable Name not found");
	}

	// console.log("Changed Value", generation);
}


/**
 *	Regular running of the random samples
 *
 */
function run() {

	postMessage(JSON.stringify({ status: "running"}));
	if (checkGeneration()) {
		if (!genotypeGraph) {
			var settings_short = generation.getInputs();
			generation.buildRandomSamples();
			const genotypeFreqs = {
				AA: generation.AA,
				Aa: generation.Aa,
				aa: generation.aa,
			}
			outputResultsAllele(generation.frequencies, genotypeFreqs);
		}
		else { //Geno type run
			genotypeRun();
		}
	}
	postMessage(JSON.stringify({ status: "complete"}));
}

/**
 *	Batch run make a copy of the generation that is set and run that giving the results for that
 *
 */
function batchRun() {
	if (checkGeneration()) {
		var generation_clone = _.cloneDeep(generation);
		var settings_short = generation.getInputs();
		generation_clone.buildRandomSamples();

		outputResultsAllele(generation_clone.frequencies, settings_short);
	}
}

/**
 *	Results for genotype graphs
 *
 */
function genotypeRun(randomNumberArray) {
	var AA = Array();
	var Aa = Array();
	var aa = Array();

	//Current Allele Freq
	var p = 0.0;

	//Inbreeding coef
	var f = 0.0;

	//Assort Mating
	var d = 0.0;
	var h = 0.0;
	var r = 0.0;


	// Need to get data on every new random sample so needs to be ran one sample at a time
	for (var i = 0; i < generation.numGenerations; i++) {
		p = generation.currentAlleleFre;

		// Inbreeding and assortative mating
		if (generation.inbreeding && generation.possitiveAssortativeMating) {
			f = generation.inbreedingCoefficient;

			d = generation.d_assortativeMating;
			h = generation.h_assortativeMating;
			r = generation.r_assortativeMating;

			AA.push(d + f * p * (1 - p));
			Aa.push(h - 2 * f * p * (1 - p));
			aa.push(r + f * p * (1 - p));
		}
		else if (generation.inbreeding) { // Just inbreeding
			f = generation.inbreedingCoefficient;
			AA.push(Math.pow(p, 2) + f * p * (1 - p));
			Aa.push((2 * p) * (1 - p) - 2 * f * p * (1 - p));
			aa.push(Math.pow((1 - p), 2) + f * p * (1 - p));
		}
		else if (generation.possitiveAssortativeMating) { // Just assortative mating
			d = generation.d_assortativeMating;
			h = generation.h_assortativeMating;
			r = generation.r_assortativeMating;

			AA.push(d);
			Aa.push(h);
			aa.push(r);

		}
		else { //No inbreeding or assortative mating
			AA.push(Math.pow(p, 2));
			Aa.push(2 * p * (1 - p));
			aa.push(Math.pow((1 - p), 2));
		}

		//Remove this and put into the else statement


		generation.buildRandomSample(randomNumberArray); // TODO - If used only pass in the one number
	}

	outputResultsGenotype(AA, Aa, aa);
}



/**
 *	Output the an array of frequency data in JSON format
 *
 */
function outputResultsAllele(frequencies, genoTypeFreq) {
	postMessage('{"type":"results-allele", "results":' + JSON.stringify(frequencies) + ', "genotypeFreqs": ' + JSON.stringify(genoTypeFreq || '{}') + '}');
}

/**
 *	Output the an array of frequency data in JSON format
 *
 */
function outputResultsGenotype(AA, Aa, aa) {
	//postMessage('{"type":"results-genotype", "AA":' + JSON.stringify(AA) +  '}');
	postMessage('{"type":"results-genotype", "AA":' + JSON.stringify(AA) + ', "Aa":' + JSON.stringify(Aa) + ', "aa":' + JSON.stringify(aa) + '}')
}


/**
 *	Makes sure that the generation has been initialized
 *
 */
function checkGeneration() {
	if (generation == null) {
		postMessage('{"type": "error", "message": "You must initalize the generation first"}');
		return false;
	}

	return true;
}


















