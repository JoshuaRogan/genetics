var  = popGen || {};
popGen.htmlUtilities = popGen.htmlUtilities || {}; 
popGen.population = popGen.population || {};

/**
 *  Represents the actual population that will be generated. 
 *		-Computes the actual random sampling by randomly drawing numbers
 *
 */
popGen.population = function(populationSize, startAlleleFreq) {
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
        for (var i = 0; i < (this.populationSize * 2); i++) {
            if (this.currentAlleleFre == 1.0 || this.currentAlleleFre == 0.0) break;

            var rand = Math.floor(Math.random() * (1 - 0)) + 0;

            if (Math.random() <= this.currentAlleleFre) {
                directAlleleCounter++;
            } 
        }
        //Recompute the currentAllele frequency after random sampling
        if(i != 0) this.currentAlleleFre = directAlleleCounter / (i);
        
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

