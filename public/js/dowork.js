//Namespaces
var popGen = popGen || {};
popGen.population = popGen.population || {};

onmessage = function(e) {
  console.log('Message received from main script');
  var population = new popGen.population(10,.700); 
  population.buildRandomSample(); 
  postMessage(population.toString());
  console.log('Finished Working');
}



/**
 *  Represents the actual population that will be generated. 
 *		-Computes the actual random sampling by randomly drawing numbers
 *
 */
popGen.population = function(populationSize, startAlleleFreq) {
    popGen.population.VALUE = "A"; //The allele we are directly tracking
    popGen.population.VALUE_IMP = "a"; //The allele we are implicitly tracking 

    this.populationSize = populationSize; //The size of this population
    this.startAlleleFreq = startAlleleFreq; //The starting allele frequency 
    this.currentAlleleFre = startAlleleFreq; //Current allele frequency 

    this.timeStarted = (new Date).getTime();
    this.timeFinished = null; 

    /**
     *	Draws a random number (0-1) and compares it to the starting allele frequency (0-1). 
     *		- If the random number is outside of the range (i.e. greater than) the frequency then it 
     *		it is considered now an implicit allele (i.e. it will count against the new frequency)
     */
    this.buildRandomSample = function() {
        
    	//The number of alleles drawn based on the starting allele frequency 
        var directAlleleCounter = 0;	

        //Perform the random sampling 
        for (var i = 0; i < (this.populationSize * 2); i++) {
            if (this.currentAlleleFre == 1.0 || this.currentAlleleFre == 0.0) break;

            var rand = Math.floor(Math.random() * (1 - 0)) + 0;

            if (Math.random() <= this.currentAlleleFre) {
                directAlleleCounter++;
            } 
            // postMessage(directAlleleCounter); 
        }
        //Recompute the currentAllele frequency after random sampling
        if(i != 0) this.currentAlleleFre = directAlleleCounter / (i);
        
        this.timeFinished = (new Date).getTime();
    }


    /**
     *	Consider pre generating all of the random numbers somwhere 
     *
     */
    this.generateRandoms = function(){

    }

    this.toString = function() {
        var output = "";
        output += "\n----------------POPULATION DATA----------------\n";
        output += "Main Value: " + popGen.population.VALUE + "\n";
        output += "Implicit Value: " + popGen.population.VALUE_IMP + "\n";
        output += "Population Size: " + this.populationSize + "\n";
        output += "Starting Allele Frequency: " + this.startAlleleFreq + "\n";
        output += "Current Allele Frequency: " + this.currentAlleleFre + "\n";
        output += "----------------POPULATION DATA----------------\n";
        output += "\n";
        output += "----------------COMPUTATION DATA----------------\n";
        output += "Time Started: " + this.timeStarted + "\n";
        output += "Time Finished: " + this.timeFinished + "\n";
        output += "Difference (ms): " + (this.timeFinished - this.timeStarted) + "\n";
        output += "----------------COMPUTATION DATA----------------\n";
        return output; 
    }
}

