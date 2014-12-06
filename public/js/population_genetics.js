/**
 *  Represents the actual population that will be generated.
 *
 *
 */
function population(populationSize, startAlleleFreq) {
    population.VALUE = "A"; //The allele we are directly tracking
    population.VALUE_IMP = "a"; //The allele we are implicity tracking 

    this.populationSize = populationSize; //The size of this population
    this.startAlleleFreq = startAlleleFreq; //The starting allele frequency 
    this.currentAlleleFre = startAlleleFreq; //Current allele frequency 


    this.buildRandomSample = function() {
        var directAlleleCounter = 0;
        var random = 0;
        for (var i = 0; i < this.populationSize; i++) {
            if (this.startAlleleFreq == 1.0 || this.startAlleleFreq == 0.0) break;

            if (Math.random() <= this.startAlleleFreq) {
                directAlleleCounter++;
            }
            this.currentAlleleFre = directAlleleCounter / (i + 1);
        }
    }

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
 *  Represents the population through its changes. Could store each population but not neccessary yet and would require 
 *  a big overhead on large generations. 
 */
function generations(numGenerations, populationSize, startAlleleFreq) {
    this.numGenerations = numGenerations; //Total number of generations
    this.currentGenerationNum = 0; //The generation number we are now on    
    this.populationSize = populationSize; //The population size of each population
    this.startAlleleFreq = startAlleleFreq; //Starting allele frequency
    this.startOtherAlleleFreq = 1 - startAlleleFreq; //The implicit other allele frequency 
    this.currentAlleleFre = startAlleleFreq; //Current allele frequency of the population we just generated 
    this.currentOtherAlleleFre = 1 - startAlleleFreq; //Currrent implicit other allele frequency 
    this.currentGenerationNum = 0;


    this.frequencies = Array(); //An array of each frequency that was generated (Graph data)
    this.populations = Array(); //An array of all of the populations (May take up too much memory)  

    /***********************************************************OPTIONAL VARIABLES***********************************************************/
    //Mutation Variables
    this.mutation = false;
    this.forwardMutationRate = 0.0; //A->a
    this.reverseMutationRate = 0.0; //a->A

    this.setMutation = function(forwardMutationRate, reverseMutationRate) {
        this.mutation = true;
        this.forwardMutationRate = forwardMutationRate;
        this.reverseMutationRate = reverseMutationRate;
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
    this.inbreedingCoefficient = 0.0;

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
     *  Main function that builds random samples for each generation.
     *      -Non Blocking 
     *  
     */
    this.buildRandomSamplesAsync = function(context, finished){
        maxTimePerChunk = 200;

        function now() {
            return new Date().getTime();
        }

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

    //The actual work that is produced
    this.buildRandomSamplesWork = function(){
        // console.log("Working");
        
        //Hardcoded DOM update
        var percentage = (this.currentGenerationNum / this.numGenerations) * 100;
        $("#graph-completion-precent").html((percentage.toFixed(2)) + "%");
        

        this.currentGenerationNum++;

        //Update the starting frequency due to mutation
        if (this.mutation) {
            var partialResult = this.reverseMutationRate / (this.forwardMutationRate + this.reverseMutationRate);
            this.currentAlleleFre = partialResult + (this.startAlleleFreq - partialResult) * Math.pow((1 - this.forwardMutationRate - this.reverseMutationRate), this.currentGenerationNum);
        }

        //Update the starting frequency due to fitness coefficients
        if (this.fitnessCoefficients) {
            var p0 = this.currentAlleleFre; //Might be starting allele 
            var q0 = this.currentOtherAlleleFre; //might be starting 

            var numerator = (Math.pow(p0, 2) * this.wAA) + ((1 * p0 * q0) * this.wAa);
            var denom = (Math.pow(p0, 2) * this.wAA) + ((2 * p0 * q0) * this.wAa) + (Math.pow(q0, 2) * this.waa);

            this.currentAlleleFre = numerator / denom;
        }

        //Update the starting frequency due to the selection/dominance coefficients
        else if (this.selectionDominanceCoe) {
            
            if(!this.fitnessCoefficients){
                this.wAA = 1.0; //See selection documentation
                this.wAa = 1 - (this.selectionCoefficient * this.dominaceCoefficient);
                this.waa = 1 - this.selectionCoefficient;
                this.fitnessCoefficients = true; 
            }
            console.log("wAA = ", this.wAA, "wAa =", this.wAa, "waa = ", this.waa);

            var p0 = this.currentAlleleFre; 
            var q0 = this.currentOtherAlleleFre; 

            var numerator = (Math.pow(p0, 2) * this.wAA) + ((1 * p0 * q0) * this.wAa);
            var denom = (Math.pow(p0, 2) * this.wAA) + ((2 * p0 * q0) * this.wAa) + (Math.pow(q0, 2) * this.waa);

            this.currentAlleleFre = numerator / denom;
        }

        //Update the starting frequency due to migration
        if(this.migration){
            this.currentAlleleFre = this.migrantAlleleFreq + (this.currentAlleleFre - this.migrantAlleleFreq) * Math.pow((1-this.migrationRate),this.currentGenerationNum);
        }

        //Update the starting frequency due to inbreeding 
        if (this.inbreeding) {

        }

        //Update the starting frequency due to Assortative Mating
        if (this.possitiveAssortativeMating) {

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

    this.toString = function(){
        var output = ""; 
        this.populations.forEach(function(data){
            output += data.toString() + "\n";
        })
        return output; 
    }
}
