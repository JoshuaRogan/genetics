/**
 *  Represents the actual population that will be generated. 
 *		-Computes the actual random sampling by randomly drawing numbers
 *
 */
function population(populationSize, startAlleleFreq) {
    population.VALUE = "A"; //The allele we are directly tracking
    population.VALUE_IMP = "a"; //The allele we are implicitly tracking 

    this.populationSize = populationSize; //The size of this population
    this.startAlleleFreq = startAlleleFreq; //The starting allele frequency 
    this.currentAlleleFre = startAlleleFreq; //Current allele frequency 

    /**
     *	Draws a random number (0-1) and compares it to the starting allele frequency (0-1). 
     *		- If the random number is outside of the range (i.e. greater than) the frequency then it 
     *		it is considered now an implicit allele (i.e. it will count against the new frequency)
     */
    this.buildRandomSample = function() {
        
    	//The number of alleles drawn based on the starting allele frequency 
        var directAlleleCounter = 0;	

        //Perform the random sampling 
        for (var i = 0; i < this.populationSize; i++) {
            if (this.startAlleleFreq == 1.0 || this.startAlleleFreq == 0.0) break;


            if (Math.random() <= this.startAlleleFreq) {
                directAlleleCounter++;
            } 
        }
        //Recompute the currentAllele frequency after random sampling
        this.currentAlleleFre = directAlleleCounter / (i + 1);
    }

    //
    this.toString = function() {
        var output = "";
        output += "\n----------------POPULATION DATA----------------\n";
        output += "Main Value: " + population.VALUE + "\n";
        output += "Implicit Value: " + population.VALUE_IMP + "\n";
        output += "Population Size: " + this.populationSize + "\n";
        output += "Starting Allele Frequency: " + this.startAlleleFreq + "\n";
        output += "Current Allele Frequency: " + this.currentAlleleFre + "\n";
        output += "----------------POPULATION DATA----------------\n";
        return output; 
    }

}

/**
 *  Represents the population through its changes. Primarily used to updated the the startingAlleleFreq so the random 
 *	sampling is correct. Several different optional variables are here with setter functions to keep the class manageable.  
 *	
 *		-Currently storing each population in populations array (could be removed to reduce memory overhead) 
 */
function generations(numGenerations, populationSize, startAlleleFreq) {
    this.numGenerations = numGenerations; //Total number of generations
    this.currentGenerationNum = 0; //The generation number we are now on    
    this.populationSize = populationSize; //The population size of each population
    this.startAlleleFreq = startAlleleFreq; //Starting allele frequency
    this.startOtherAlleleFreq = 1 - startAlleleFreq; //The implicit other allele frequency 
    this.currentAlleleFre = startAlleleFreq; //Current allele frequency of the population we just generated 
    this.currentOtherAlleleFre = 1 - startAlleleFreq; //Curr rent implicit other allele frequency 
    this.currentGenerationNum = 0;

    this.frequencies = Array(); //An array of each frequency that was generated (Graph data)
    this.populations = Array(); //An array of all of the populations (May take up too much memory)  



    //Genotype Data (Inbreeding and Assortative Mating)
    this.genoTypeFrequencies = Array(); //An array of each frequency that was generated of the genotype (Graph Data)





    /***********************************************************OPTIONAL VARIABLES***********************************************************/
    //Mutation Variables
    this.mutation = false;
    this.forwardMutationRate = 0.0; //A->a
    this.reverseMutationRate = 0.0; //a->A

    this.setMutation = function(forwardMutationRate, reverseMutationRate) {
        this.mutation = true;
        this.forwardMutationRate = forwardMutationRate * Math.pow(10, -3); //Always assumed
        this.reverseMutationRate = reverseMutationRate * Math.pow(10, -3); //Always assumed
    }


    //Selection variables
    this.fitnessCoefficients = false;
    this.wAA = 0.0;
    this.wAa = 0.0;
    this.waa = 0.0;

    this.setFitnessCoefficients = function(wAA, wAa, waa) {
        this.fitnessCoefficients = true;
        this.wAA = wAA;
        this.wAa = wAa;
        this.waa = waa;
    }

    //Dominance and Selection 
    this.selectionDominanceCoe = false;
    this.selectionCoefficient = 0.0;
    this.dominaceCoefficient = 0.0;

    this.setSelectionDominanceCoe = function(selectionCoefficient, dominaceCoefficient) {
        this.selectionDominanceCoe = true;
        this.selectionCoefficient = selectionCoefficient;
        this.dominaceCoefficient = dominaceCoefficient;
    }

    //Inbreeding
    this.inbreeding = false;
    this.inbreedingCoefficient = 0.0;	//Important Always needs to be set 

    this.setInbreedingCoefficient = function(inbreedingCoefficient) {
        this.inbreeding = true;
        this.inbreedingCoefficient = inbreedingCoefficient;
    }

    //Assortative Mating
    this.possitiveAssortativeMating = false;
    this.positiveAssortativeFreq = 0.0;

    this.setAssortativeMating = function(positiveAssortativeFreq) {
        this.possitiveAssortativeMating = true;
        this.positiveAssortativeFreq = positiveAssortativeFreq;
    }

    //Migration Variables 
    this.migration = false;
    this.migrationRate = 0.0;
    this.migrantAlleleFreq = 0.0;

    this.setMigrationRate = function(migrationRate, migrantAlleleFreq) {
        this.migration = true;
        this.migrationRate = migrationRate;
        this.migrantAlleleFreq = migrantAlleleFreq;
    }

    /**
     *  Population bottleneck
     *  Modfies the population size for a specfic number of generations (startget - endgen)
     */
    this.populationBottleneck = false; 
    this.startGeneration = 0;
    this.endGeneration = 0; 
    this.modifiedPopulationSize = 0;

    this.setpopulationBottleneck = function(startGeneration, endGeneration, modifiedPopulationSize){
        this.populationBottleneck = true; 
        this.startGeneration = startGeneration;
        this.endGeneration = endGeneration; 
        this.modifiedPopulationSize = modifiedPopulationSize;
    }



    /***********************************************************OPTIONAL VARIABLES***********************************************************/

    /**
     *  Non blocking function that takes in a context (the generations class) and a finished function 
     *	callback when all iterations are finished. 
     *      - Non Blocking implementation 
     *		-
     *  
     */
    this.buildRandomSamplesAsync = function(context, finished){
        maxTimePerChunk = 200;

        function now() {
            return new Date().getTime();
        }

        /**	
         *	REASON WHY FOR THE ASYNCHRONOUS FUNCTION
         *	Splits the work up into chunks based on long each chunk has been running. This allows the system to have short 
         *	timeouts where other work such as updating the dom can be performed. (Allows me to calculate the percentage of 
         *	work completed). Also frees up the computation so it doesn't seem like the browser is frozen. 
         */
        function doChunk() {
            var startTime = now();

            while (context.currentGenerationNum < context.numGenerations && (now() - startTime) <= maxTimePerChunk) {
                context.buildRandomSamplesWork();
            }
            if (context.currentGenerationNum < context.numGenerations) {
                setTimeout(doChunk, 1);
            }
            else{
                finished.call(window); 
            }
        }

        doChunk(); 
    }

    /**
     *	Sets up the current allele frequency based on the optional variables that are set. 
     *	Then makes the call to the population to generate a random sample with the modified allele frequency. 
     *	This gets called by buildRandomSamplesAsync() every time there is an open slot to do work until all of the generations 
     *	have been randomly sampled. 
     */
    this.buildRandomSamplesWork = function(){
        // console.log("Working");
        
        //Hardcoded DOM update
        var percentage = (this.currentGenerationNum / this.numGenerations) * 100;
        $("#graph-completion-precent").html((percentage.toFixed(2)) + "%");
        $("#graph-computing-title").html("Computing Generation Number <strong>" + this.currentGenerationNum + "</strong> of " + this.numGenerations);
        
        this.currentGenerationNum++;

        //The order these operations are performed is very important (Consult the formulae last slide)

        //Update the starting frequency due to mutation
        if (this.mutation) {	
        	this.modifyFreqMutation();
        }

        //Update the starting frequency due to fitness coefficients
        if (this.fitnessCoefficients) {
        	this.modifyFreqFitnessCoef();
        }
        //Update the starting frequency due to the selection/dominance coefficients
        else if (this.selectionDominanceCoe) {
        	this.modifyFreqSelectAndDomCoef(); 
        }
        //Update the starting frequency due to migration
        if(this.migration){
        	this.modifyFreqMigration(); 
        }


        //Modifying the population size temporarily 
        if(this.populationBottleneck){
            if(this.currentGenerationNum > this.startGeneration && this.currentGenerationNum < this.endGeneration){
                var actualPopulationSize = this.modifiedPopulationSize; //There is a population bottle neck for this generation
            }
            else{
                var actualPopulationSize = this.populationSize; //THere is a population bottleneck but not for this generation
            }
        }
        else{
            var actualPopulationSize = this.populationSize;
        }



        var currentPopulation = new population(actualPopulationSize, this.currentAlleleFre);
        currentPopulation.buildRandomSample();

        this.populations.push(currentPopulation); //This adds the actual populations to an array for later use. 
        this.frequencies.push(currentPopulation.currentAlleleFre);  //This is the value that is being graphed

        this.currentAlleleFre = currentPopulation.currentAlleleFre; //Update the new frequency after the random sampling
        this.currentOtherAlleleFre = 1 - this.currentAlleleFre; //This is the implicit value of the other allele. Only used for clarity 

    }



    /**
     * 	Starting allele frequency private modifiers 
     *	These functions modify the starting allele frequency based on what optional variables are set 
     */

    //Update the frequency due to mutation effects 
    this.modifyFreqMutation = function (){
    	var partialResult = this.reverseMutationRate / (this.forwardMutationRate + this.reverseMutationRate);

        this.currentAlleleFre = partialResult + (this.startAlleleFreq - partialResult) 
        	* Math.pow((1 - this.forwardMutationRate - this.reverseMutationRate), this.currentGenerationNum);
    }

    //Update the frequency due to selection effects and Inbreeding and assortative mating if they are set 
    this.modifyFreqSelection = function(){ 

    }

    //Update the frequency due to selection effects from the fitness coefficients (Waa, WAA, WAa)
    this.modifyFreqFitnessCoef = function(){
    	var p0 = this.currentAlleleFre; //Might be starting allele 
		var q0 = this.currentOtherAlleleFre; //might be starting 

		var numerator = (Math.pow(p0, 2) * this.wAA) + ((1 * p0 * q0) * this.wAa);
		var denom = (Math.pow(p0, 2) * this.wAA) + ((2 * p0 * q0) * this.wAa) + (Math.pow(q0, 2) * this.waa);

		this.currentAlleleFre = numerator / denom;
    }

    //Update the frequency due to the selection effects from the selection and dominance coefficients 
    this.modifyFreqSelectAndDomCoef = function(){
		if(!this.fitnessCoefficients){
			this.wAA = 1.0; //See selection documentation
			this.wAa = 1 - (this.selectionCoefficient * this.dominaceCoefficient);
			this.waa = 1 - this.selectionCoefficient;
			this.fitnessCoefficients = true; 
		}

		var p0 = this.currentAlleleFre; 
		var q0 = this.currentOtherAlleleFre; 

		if(this.possitiveAssortativeMating){
			var numerator = 0;
			var denom = 1; 
		}
		else{
			var numerator = ((Math.pow(p0, 2)  + (this.inbreedingCoefficient *p0 * q0)) * this.wAA) + ((1 * p0 * q0 - (this.inbreedingCoefficient *p0 * q0)) * this.wAa);
			var denom = ((Math.pow(p0, 2) + (this.inbreedingCoefficient *p0 * q0))* this.wAA) + ((2 * p0 * q0 - (2 * this.inbreedingCoefficient *p0 * q0)) * this.wAa) + ((Math.pow(q0, 2) + (this.inbreedingCoefficient *p0 * q0)) * this.waa);

		}
		this.currentAlleleFre = numerator / denom;
    }

    //Update the frequency due to migration effects 
    this.modifyFreqMigration = function(){ 
		this.currentAlleleFre = this.migrantAlleleFreq + (this.currentAlleleFre - this.migrantAlleleFreq) 
			* Math.pow((1-this.migrationRate),this.currentGenerationNum);
    }







    this.toString = function(){
        var output = ""; 
        this.populations.forEach(function(data){
            output += data.toString() + "\n";
        })
        return output; 
    }
}
