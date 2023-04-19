//Namespaces
var popGen = popGen || {};
popGen.population = popGen.population || {};
popGen.generations = popGen.generations || {};


/**
 *  Represents the population through its changes. Primarily used to updated the the startingAlleleFreq so the random
 *	sampling is correct. Several optional variables are here with setter functions to keep the class manageable.
 *
 *		-Currently storing each population in populations array (could be removed to reduce memory overhead)
 */
popGen.generations = function (numGenerations, populationSize, startAlleleFreq) {
	this.numGenerations = parseInt(numGenerations) + 1; 		// Total number of generations
	this.currentGenerationNum = 0; 					// The generation number we are now on
	this.populationSize = populationSize; 		// The population size of each population
	this.startAlleleFreq = startAlleleFreq; 		// Starting allele frequency
	this.startOtherAlleleFreq = 1 - this.startAlleleFreq; 	// The implicit other allele frequency
	this.currentAlleleFre = this.startAlleleFreq; 		// Current allele frequency of the population we just generated
	this.currentOtherAlleleFre = 1 - this.currentAlleleFre; 	// Current implicit other allele frequency
	this.currentGenerationNum = 0;					// The current generation that is being produced
	this.infinitePopulationSize = false; 				// Generate equations instead of random sampling

	this.frequencies = Array(); // An array of each frequency that was generated (These are the values that are graphed)
	this.populations = Array(); // An array of all the populations (Remove with optimized flag)

	this.AA = [];
	this.Aa = [];
	this.aa = [];

	this.optimized = true; // Flag to prevent storing of some variables

	this.startTime = (new Date).getTime();
	this.finishTime = null;
	this.simulationSettings = null;

	//Update the current allele frequency
	this.setCurrentAlleleFre = function (newFreq) {
		this.currentAlleleFre = newFreq;
		this.currentOtherAlleleFre = 1 - this.currentAlleleFre;
	}

	// Activate infinite population size
	this.setInfinitePopulation = function () {
		this.infinitePopulationSize = true;
	}

	this.setSimulationSettings = function (settings) {
		this.simulationSettings = settings;
	}

	this.getSimulationSettings = function () {
		return this.simulationSettings;
	}

	this.getInputs = function () {
		return {
			hasInbreeding: this.inbreeding,
			inbreedingCoefficient: this.inbreedingCoefficient,
			assortMating: this.possitiveAssortativeMating,
			positiveAssortativeFreq: this.positiveAssortativeFreq,
			d_assortativeMating: this.d_assortativeMating,
			h_assortativeMating: this.h_assortativeMating,
			r_assortativeMating: this.r_assortativeMating,
		}
	}


	//Mutation Variables
	this.mutation = false;
	this.forwardMutationRate = 0.0; //A->a
	this.reverseMutationRate = 0.0; //a->A

	this.setMutation = function (forwardMutationRate, reverseMutationRate) {
		this.mutation = true;
		this.forwardMutationRate = forwardMutationRate;
		this.reverseMutationRate = reverseMutationRate; //Always assumed
	}

	//Selection variables
	this.fitnessCoefficients = true;
	this.wAA = 1.0;
	this.wAa = 1.0;
	this.waa = 1.0;

	this.setFitnessCoefficients = function (wAA, wAa, waa) {
		this.fitnessCoefficients = true;
		this.wAA = wAA;
		this.wAa = wAa;
		this.waa = waa;
	}

	//Dominance and Selection
	this.selectionDominanceCoe = false;
	this.selectionCoefficient = 0.0;
	this.dominaceCoefficient = 0.0;

	this.setSelectionDominanceCoe = function (selectionCoefficient, dominaceCoefficient) {
		this.selectionDominanceCoe = true;
		this.selectionCoefficient = selectionCoefficient;
		this.dominaceCoefficient = dominaceCoefficient;
	}

	//Inbreeding
	this.inbreeding = false;
	this.inbreedingCoefficient = 0.0;	//Important Always needs to be set

	this.setInbreedingCoefficient = function (inbreedingCoefficient) {
		this.inbreeding = true;
		this.inbreedingCoefficient = parseFloat(inbreedingCoefficient);
	}

	//Assortative Mating
	this.possitiveAssortativeMating = false;
	this.positiveAssortativeFreq = 0.0;
	this.d_assortativeMating = 0.0;
	this.h_assortativeMating = 0.0;
	this.r_assortativeMating = 0.0;

	this.setAssortativeMating = function (positiveAssortativeFreq) {
		this.possitiveAssortativeMating = true;
		this.positiveAssortativeFreq = positiveAssortativeFreq;

		//Set D0, H0, R0
		this.d_assortativeMating = Math.pow(this.startAlleleFreq, 2); //p0^2
		this.h_assortativeMating = 2 * this.startAlleleFreq * this.currentOtherAlleleFre; //2*p0*q0
		this.r_assortativeMating = Math.pow(this.currentOtherAlleleFre, 2); //q0^2
	}



	//Migration Variables
	this.migration = false;
	this.migrationRate = 0.0;
	this.migrantAlleleFreq = 0.0;

	this.setMigrationRate = function (migrationRate, migrantAlleleFreq) {
		this.migration = true;
		this.migrationRate = migrationRate;
		this.migrantAlleleFreq = migrantAlleleFreq;
	}

	/**
	 *  Population bottleneck
	 *  Modifies the population size for a specific number of generations (startget - endgen)
	 */
	this.populationBottleneck = false;
	this.startGeneration = 0;
	this.endGeneration = 0;
	this.modifiedPopulationSize = 0;

	this.setpopulationBottleneck = function (startGeneration, endGeneration, modifiedPopulationSize) {
		this.populationBottleneck = true;
		this.startGeneration = startGeneration;
		this.endGeneration = endGeneration;
		this.modifiedPopulationSize = modifiedPopulationSize;
	}

	/**
	 *  Simple function that manages the loop for all the random samples.
	 *  This is the function to use to run the generations.
	 *
	 */
	this.buildRandomSamples = function (randomNumbers) {
		this.startTime = (new Date).getTime();
		this.currentAlleleFre = startAlleleFreq; 		// Current allele frequency of the population we just generated
		this.currentGenerationNum = 0;					// The current generation that is being produced

		console.log(this)
		for (var i = 0; i < this.numGenerations; i++) {
			if (i !== 0) {
				this.buildRandomSample(randomNumbers);
			}
			else {
				// Don't compute on the first run
				this.currentGenerationNum++;
				this.setCurrentAlleleFre(this.currentAlleleFre);
				this.frequencies.push(this.currentAlleleFre);

				// TODO Need to add Genotypes here
				this.AA.push(Math.pow(this.currentAlleleFre, 2));
				this.Aa.push(2 * this.currentOtherAlleleFre * (1 - this.currentAlleleFre));
				this.aa.push(Math.pow((1 - this.currentAlleleFre), 2));
			}
		}
		this.finishTime = (new Date).getTime();

	}

	/**
	 *	Sets up the current allele frequency based on the optional variables that are set.
 *
 *
 *
	 */
	this.buildRandomSample = function () {
		this.currentGenerationNum++;

		//The order these operations are performed is very important (Consult the formula last slide pdf)

		//Update the starting frequency due to mutation
		if (this.mutation) {
			this.modifyFreqMutation();
		}

		//Update the starting frequency due to fitness coefficients
		if (this.fitnessCoefficients) {
			this.modifyFreqFitnessCoef();  //Updates with inbreeding too
		}
		//Update the starting frequency due to the selection/dominance coefficients
		else if (this.selectionDominanceCoe) {
			this.modifyFreqSelectAndDomCoef(); //Updates with inbreeding too
		}

		//Update the starting frequency due to the selection/dominance coefficients
		if (this.possitiveAssortativeMating && (this.selectionDominanceCoe || this.fitnessCoefficients)) {
			this.modifyFreqPosAssortMat();
		}

		// Update the starting frequency due to migration
		if (this.migration) {
			this.modifyFreqMigration();
		}

		var bottleneck_generation = false; //Determine if this is an actual bottlneck generation
		//Modifying the population size temporarily if population bottleneck is active
		if (this.populationBottleneck) {
			if (this.currentGenerationNum > this.startGeneration && this.currentGenerationNum < this.endGeneration) {
				var bottleneck_generation = true;
				var actualPopulationSize = this.modifiedPopulationSize; //There is a population bottleneck for this generation
			}
			else {
				var actualPopulationSize = this.populationSize; //THere is a population bottleneck but not for this generation
			}
		}
		else {
			var actualPopulationSize = this.populationSize;
		}

		// Current Allele Freq Calculated here


		// Inbreeding and assortative mating



		// Only do random sampling on non-infinite population sizes
		if (this.infinitePopulationSize && !bottleneck_generation) {
			this.frequencies.push(this.currentAlleleFre);  // This is the value that is being graphed
		}
		else {
			var currentPopulation = new popGen.population(actualPopulationSize, this.currentAlleleFre);
			currentPopulation.buildRandomSample();

			if (!this.optimized) {
				this.populations.push(currentPopulation);
			} // This adds the actual populations to an array for later use.

			// TODO - Set the genotypes results here


			this.frequencies.push(currentPopulation.currentAlleleFre);  //This is the value that is being graphed
			this.setCurrentAlleleFre(currentPopulation.currentAlleleFre);
		}

		p = currentPopulation ? currentPopulation.currentAlleleFre : this.currentAlleleFre;
		if (this.inbreeding && this.possitiveAssortativeMating) {
			var f = this.inbreedingCoefficient;

			var d = this.d_assortativeMating;
			var h = this.h_assortativeMating;
			var r = this.r_assortativeMating;

			this.AA.push(d + f * p * (1 - p));
			this.Aa.push(h - 2 * f * p * (1 - p));
			this.aa.push(r + f * p * (1 - p));
		}
		else if (generation.inbreeding) { // Just inbreeding
			var f = this.inbreedingCoefficient;
			this.AA.push(Math.pow(p, 2) + f * p * (1 - p));
			this.Aa.push((2 * p) * (1 - p) - 2 * f * p * (1 - p));
			this.aa.push(Math.pow((1 - p), 2) + f * p * (1 - p));
		}
		else if (generation.possitiveAssortativeMating) { // Just assortative mating
			var d = this.d_assortativeMating;
			var h = this.h_assortativeMating;
			var r = this.r_assortativeMating;

			this.AA.push(d);
			this.Aa.push(h);
			this.aa.push(r);

		}
		else { //No inbreeding or assortative mating
			this.AA.push(Math.pow(p, 2));
			this.Aa.push(2 * p * (1 - p));
			this.aa.push(Math.pow((1 - p), 2));
		}
	}



	/**
	 * 	Starting allele frequency private modifiers
	 *	These functions modify the starting allele frequency based on what optional variables are set
	 */

	//Update the frequency due to mutation effects
	this.modifyFreqMutation = function () {
		this.currentAlleleFre = this.currentAlleleFre * (1 - this.forwardMutationRate) + (1 - this.currentAlleleFre) * this.reverseMutationRate;
	}

	//Update the frequency due to selection effects and Inbreeding and assortative mating if they are set
	this.modifyFreqSelection = function () {
		// Not necessary
	}

	/**
	 *	Update the frequency due to selection effects from the fitness coefficients (Waa, WAA, WAa)
	 *	-Accounts for inbreeding here (equation when inbreedingCoef = 0 simplifies down to the same without inbreeding)
	 */
	this.modifyFreqFitnessCoef = function () {
		var p0 = this.currentAlleleFre; //Current or starting
		var q0 = this.currentOtherAlleleFre; //Current or starting
		var F = this.inbreedingCoefficient;

		//New equations with inbreeding
		var numerator = ((Math.pow(p0, 2) + (F * p0 * q0)) * this.wAA) + ((1 * p0 * q0) - (F * p0 * q0)) * this.wAa;
		var denom = ((Math.pow(p0, 2) + (F * p0 * q0)) * this.wAA) + ((2 * p0 * q0) - (2 * F * p0 * q0)) * this.wAa + (Math.pow(q0, 2) + (F * p0 * q0)) * this.waa
		this.setCurrentAlleleFre(numerator / denom);
	}

	// Update the frequency due to positiveAssortativeMating
	this.modifyFreqPosAssortMat = function () {
		p0 = this.currentAlleleFre; //The allele frequency at this time
		q0 = 1 - p0;

		//The previous values of d,h,r
		var d0 = this.d_assortativeMating;
		var h0 = this.h_assortativeMating;
		var r0 = this.r_assortativeMating;
		var alpha = this.positiveAssortativeFreq;

		//Specify each numerator first since the denominator is the same between all of them
		var d_numerator = ((1 - alpha) * Math.pow(p0, 2)) + (alpha * (d0 + h0 / 4));
		var h_numerator = (2 * (1 - alpha) * p0 * q0) + (alpha * (h0 / 2));
		var r_numerator = ((1 - alpha) * Math.pow(q0, 2)) + (alpha * (r0 + h0 / 4));
		var commonDenom = d_numerator + h_numerator + r_numerator;


		//Update the d,h,r values
		this.d_assortativeMating = d_numerator / commonDenom;
		this.h_assortativeMating = h_numerator / commonDenom;
		this.r_assortativeMating = r_numerator / commonDenom;


		// Shorthand variables for the new variables
		var d_n = this.d_assortativeMating;
		var h_n = this.h_assortativeMating; 	// Change from d_assortative...
		var r_n = this.r_assortativeMating;		// Changed from r_assortative...

		//New equations with positive mating
		//Default value for wAA, wAa, and waa is 1.0
		var numerator = (d_n * this.wAA) + ((h_n / 2) * this.wAa);
		var denom = (d_n * this.wAA) + (h_n * this.wAa) + (r_n * this.waa);

		this.setCurrentAlleleFre(numerator / denom); //Updates the current allele frequency
	}

	//Update the frequency due to the selection effects from the selection and dominance coefficients
	this.modifyFreqSelectAndDomCoef = function () {
		//Only needs to be calculated once
		if (!this.fitnessCoefficients) {
			this.wAA = 1.0; //See selection documentation
			this.wAa = 1 - (this.selectionCoefficient * this.dominaceCoefficient);
			this.waa = 1 - this.selectionCoefficient;
			this.fitnessCoefficients = true;
		}

		//Once the fitness coefficients are set it is the same equation so just call that
		this.modifyFreqFitnessCoef();
	}

	//Update the frequency due to migration effects
	this.modifyFreqMigration = function () {
		// this.currentAlleleFre = this.migrantAlleleFreq + (this.currentAlleleFre - this.migrantAlleleFreq)
		// 	* Math.pow((1-this.migrationRate),this.currentGenerationNum);

		this.currentAlleleFre = this.currentAlleleFre * (1 - this.migrationRate) + (this.migrantAlleleFreq) * this.migrationRate;
	}





	this.toString = function () {
		var output = "";
		output += "\n----------------POPULATION DATA----------------\n";
		output += "Population Size: " + this.populationSize + "\n";
		output += "Starting Allele Frequency: " + this.startAlleleFreq + "\n";
		output += "Current Allele Frequency: " + this.currentAlleleFre + "\n";
		output += "Number Generations: " + this.numGenerations + "\n";
		output += "Current Generation: " + this.currentGenerationNum + "\n";
		output += "----------------POPULATION DATA----------------\n";
		output += "\n";
		output += "----------------COMPUTATION DATA----------------\n";
		output += "Start Time (ms): " + this.startTime + "\n";
		output += "Finish Time (ms): " + this.finishTime + "\n";
		output += "Time Ran (ms): " + (this.finishTime - this.startTime) + "\n";
		output += "----------------COMPUTATION DATA----------------\n";
		return output;
	}
}
