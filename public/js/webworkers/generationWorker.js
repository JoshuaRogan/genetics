// Namespaces
var popGen = popGen || {};
popGen.population = popGen.population || {};
popGen.generations = popGen.generation || {};

importScripts("/js/popGen/popGen.population.js");
importScripts("/js/popGen/popGen.generation.js");
importScripts("/js/lodash/lodash.js"); //Used for cloning the generation

var generation = null; 

onmessage = function(e) {
	var data = e.data; 
	switch(data.cmd){
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
		default: 
			// postMessage("Default Command");  
	};
}

function initGeneration(data){
	generation = new popGen.generations(data.numGenerations, data.populationSize, data.startingFrequency);
	// console.log(generation); 
}


function setVar(data){
	checkGeneration();

	switch(data.varName){
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
	};

	// console.log("Changed Value", generation); 
}


/**
 *	Regular running of the random samples
 *
 */
function run(){
	checkGeneration();
	generation.buildRandomSamples();
	outputResults(generation.frequencies); 
}

/**
 *	Batch run make a copy of the generation that is set and run that giving the results for that 
 *
 */
function batchRun(){
	checkGeneration();
	var generation_clone = _.cloneDeep(generation);
	generation_clone.buildRandomSamples();
	outputResults(generation_clone.frequencies);
}

/**
 *	Regular running of the random samples
 *
 */
function outputResults(frequencies){
	postMessage('{"type":"results", "results":' + JSON.stringify(frequencies) + '}'); 
}


/**
 *	Makes sure that the generation has been initialized
 *
 */
function checkGeneration(){
	if(generation == null) postMessage("{'type': 'error', 'message': 'You must initalize the generation first'");
}


















