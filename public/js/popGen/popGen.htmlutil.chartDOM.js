/** 
 *	DOM manipulations relating the chart
 *
 */

var popGen = popGen || {};
popGen.htmlutil = popGen.htmlutil || {}; //Should already be defined 
popGen.generations = popGen.generations || {}; //Should already be defined 

popGen.htmlutil.chartDOM = popGen.htmlutil.chartDOM || {
	debug: true, 
	chart: null, 	//Hold the chart data here 
	data: null,	 	//Datapoints of the graph 
	currentLine: 0	//The number line just graphed 
}; 

popGen.htmlutil.chartDOM.debugData = function(){
	console.log(this); 
}


 /**
 * 	Update the graph with new data 
 *      
 *  @param {string} type "redraw" or "add"  
 */
popGen.htmlutil.chartDOM.updateGraph = function(type){

}


 /**
 * 	Clear the graph 
 *      
 *      
 */
popGen.htmlutil.chartDOM.clearGraph = function(){

}

/**
 * 	Redraw the graph making it printing friendly 
 *      
 *      
 */
popGen.htmlutil.chartDOM.printerFriendly = function(){

}

/**
 * 	Redraw the graph making it screen friendly (Default State)
 *      
 *      
 */
popGen.htmlutil.chartDOM.screenFriendly = function(){

}

/**
 * 	Get all of the raw data points and open them in a new window
 *      
 *      
 */
popGen.htmlutil.chartDOM.getRawData = function(){

}

/**
 * 	Update the legend 
 *      
 *      
 */
popGen.htmlutil.chartDOM.updateLegend = function(){

}

/**
 * 	Generate one row of the legend 
 *      
 *	@param {string} variable 
 *	@param {string} value 
 *	@param {string} secondValue 
 */
popGen.htmlutil.chartDOM.generateLegendRow = function(variable, value, secondValue){

}



/**
 * 	Runs the population simluation using the "classes" in population_genetics.js
 *      
 *  @param {string} selector form selector 
 *  @param {string} type the format of the graph (redraw, addline, batch) 
 */
popGen.htmlutil.chartDOM.formHandler = function(selector, type){
	var values = this.seralizeForm($("#variables-form"));	//All of the values in the form 
	
	var isValid = true; 
	var errors = []; //Error messages

	//Required Values
    var input_population_size = parseFloat(values['population-size'].replace(',', ''));
    var input_num_generations = parseFloat(values['generations'].replace(',', ''));
    var intput_starting_alele_frequency = parseFloat(values['starting-allele-frequency']);
    var myGenerations = new popGen.generations(input_num_generations, input_population_size, intput_starting_alele_frequency);


    //Selection variables if the coefficient is active 
    if(this.isActiveVariable("#fitness-coefficient-wAA") || this.isActiveVariable("#selection-coefficient")){
    	//Use the fitness coefficients (waa, wAA, wAa)
    	if(this.isActiveVariable("#fitness-coefficient-wAA")){
    		var wAA = parseFloat(values['fitness-coefficient-wAA'].replace(',', ''));
    		var wAa = parseFloat(values['fitness-coefficient-wAa'].replace(',', ''));
    		var waa = parseFloat(values['fitness-coefficient-waa'].replace(',', ''));
			myGenerations.setFitnessCoefficients(wAA, wAa, waa);
    	}
    	//use the Selection/Dominance Coefficient 
    	else{
    		 // this.setSelectionDominanceCoe = function(selectionCoefficient, dominaceCoefficient) 
    		 var selectionCoefficient = parseFloat(values['selection-coefficient'].replace(',', ''));
    		 var dominaceCoefficient = parseFloat(values['dominance-coefficient'].replace(',', ''));
    		 myGenerations.setSelectionDominanceCoe(selectionCoefficient, dominaceCoefficient);
    	}
    }

        //Set the mutation variables if they are active 
    if (this.isActiveVariable("#mutation-rate-mu") || this.isActiveVariable("#mutation-rate-nu")) {
    	var forwardMutationRate = parseFloat(values['mutation-rate-mu']) * Math.pow(10,parseInt(values['mutation-rate-mu-exponent']));
    	var revMutationRate = parseFloat(values['mutation-rate-nu']) * Math.pow(10,parseInt(values['mutation-rate-nu-exponent']));

        myGenerations.setMutation(forwardMutationRate, revMutationRate);
    }

    //Set the Migration Variables if they are active 
    if(this.isActiveVariable("#migration-rate")){
    	var migrationRate = parseFloat(values['migration-rate']);
    	var migrantAlleleFrequency = parseFloat(values['migrant-allele-frequency']);
    	myGenerations.setMigrationRate(migrationRate, migrantAlleleFrequency);
    }

    //Inbreeding Variables 
    if(this.isActiveVariable("#inbreeding-coefficient")){
    	var inbreedingCoe = parseFloat(values['inbreeding-coefficient']);
    	myGenerations.setInbreedingCoefficient(inbreedingCoe);
    }

    //Assortative mating 
    if(this.isActiveVariable("#positive-assortative-mating")){
    	var positiveAssortativeMatingFreq = parseFloat(values['positive-assortative-mating']);
    	myGenerations.setAssortativeMating(positiveAssortativeMatingFreq);
    }

    //Population bottleneck
    if(this.isActiveVariable("#generation-to-override")){
    	var generationStart = parseFloat(values['generation-to-override-lower'].replace(',', ''));
    	var generationEnd = parseFloat(values['generation-to-override-upper'].replace(',', ''));
    	var newPopulationSize = parseFloat(values['new-population-size'].replace(',', ''));
    	
    	//Validate that generationStart and End are within the generation values
    	if(generationStart > input_num_generations){
    		isValid = false; 
    		errors.push("Invalid Generation Start");
    	}
    	if(generationEnd > input_num_generations){
    		isValid = false; 
    		errors.push("Invalid Generation End");
    	}

    	myGenerations.setpopulationBottleneck(generationStart, generationEnd, newPopulationSize);
    }

    //Batch Tool 
    if(this.isActiveVariable("#batch-tool-runs")){ 
        var numBatchRuns = parseFloat(values['batch-tool-runs'].replace(',', ''));
    }




}

/**
 * 	Take a serialized array and change the filed name value to an associative array
 *      
 *  @param {string} formSelector jquery form selector of the ofrm to seralize 
 */
popGen.htmlutil.chartDOM.seralizeForm = function(formSelector){
	var serializeArray = $(formSelector).serializeArray();
	var values = {};
    $.each(serializeArray, function(i, field) {
        values[field.name] = field.value;
    });
    return values;
}

/**
 * 	Check if a variable is currently active 
 *      
 *  @param {string} selector jquery  selector of variable 
 */
popGen.htmlutil.chartDOM.isActiveVariable = function(selector){
	var isActive = false; 
	selector += "-slider"; //Needs to look at the slider 

	//Done this way to make sure it returns exactly true or false
	if($(selector).hasClass("active")){
		isActive = true; 
	}

	return isActive;
}










