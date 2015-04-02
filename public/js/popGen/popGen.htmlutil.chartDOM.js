/** 
 *	DOM manipulations relating the chart
 *
 */
var popGen = popGen || {};
popGen.htmlutil = popGen.htmlutil || {}; //Should already be defined 
popGen.generations = popGen.generations || {}; //Should already be defined 
popGen.config.chartJQ = popGen.config.chartJQ || {}; //Should already be defined 

popGen.htmlutil.chartDOM = popGen.htmlutil.chartDOM || {
	debug: false, 
	chart: null,        //Hold the chart data here 
	frequencies: Array(),        //Hold the chart data here 
    values: null,      	//Holds all of the user inputed values of the last graphed item 
	nextLine: 0,	       	//0 Means nothing has been graphed 
	highContrast: null 
}; 

popGen.htmlutil.chartDOM.debugData = function(){
	if(this.debug) console.log(this); 
}

popGen.htmlutil.chartDOM.initChart = function(){
    this.chart = $("#graph-canvas").CanvasJSChart();
    this.values = this.seralizeForm($("#variables-form")); 
}


 /**
 * 	Update the graph with new data 
 *      
 *  @param {array<float>} dataPoints an array of datapoints to be graphed 
 *  @param {string} type "redraw" or "add"  
 */
popGen.htmlutil.chartDOM.updateGraph = function(dataPoints, type){
    this.frequencies.push(dataPoints); //Maintain all of the data points

    if(this.debug) {
        console.log("Updating Graph: ",dataPoints, type);
        console.log(popGen.htmlutil.chartDOM.chart); 
    }

    if(type == "newGraph"){
        if(this.debug){
            console.log("New Graph attemping update"); 
            console.log(dataPoints);
        }
        this.clearGraph(); //First clear the graph and data points 
        this.addDataPoints(dataPoints); 
        this.updateLegend(false); 
    }
    else if(type == "addLine"){
        if(this.debug){
            console.log("Add Line attemping update"); 
            console.log(dataPoints);
        }
        this.addDataPoints(dataPoints); 
        this.updateLegend(true); 
    }
    else if(type == "batchTool"){
        if(this.debug){
            console.log("Batch Attempting Update"); 
            console.log(dataPoints);
        }
        var numBatchRuns = parseInt(this.values['batch-tool-runs']); 
        this.addDataPoints(dataPoints);
        this.updateLegend(false, numBatchRuns);

        //Only compute this on the last run 
        if(this.nextLine - 1 == numBatchRuns){ 
        	this.computeBatchStats(); 
        }

    }
    
}


 /**
 * 	Clear the graph 
 *      
 *      
 */
popGen.htmlutil.chartDOM.clearGraph = function(){
    var data = [];
    var dataSeries = {
        type: "line"
    };
    var dataPoints = [];

    dataSeries.dataPoints = dataPoints;
   
    popGen.htmlutil.chartDOM.chart.options.data = data;
    popGen.htmlutil.chartDOM.chart.options.colorSet = "main";
    this.nextLine = 1; 
    this.frequencies = Array(); //Clear the old frequencies 
}

 /**
 *  Add datapoints to the graph and redraw 
 *      
 *  @param {array<float>} dataPoints an array of datapoints to be graphed 
 */
popGen.htmlutil.chartDOM.addDataPoints = function(dataToAdd){
    // console.log(chart);
    if(this.debug){
        console.log("Adding Data Points to Graph"); 
        console.log(popGen.htmlutil.chartDOM.chart); 
        console.log(this.nextLine); //Not working yet 
    }

    //If you are trying to add a line when there isn't there clear the graph first 
    if(this.nextLine == 0){ 
        if(this.debug) console.log("Clearning graph one time"); 
        this.clearGraph();
    }

    var data = popGen.htmlutil.chartDOM.chart.options.data;
    var dataSeries = {
        type: "line"
    };

    var dataPoints = [];
    for (var i = 0; i < dataToAdd.length; i++) {
        dataPoints.push({
            x: i,
            y: dataToAdd[i]
        });
    }


    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);
    popGen.htmlutil.chartDOM.chart.options.data = data;
    this.nextLine++;
}

/**
 *  Update the legend 
 *      
 *  @param {bool} isAppend Append or erase the previous legends 
 *  @param {int} numBatchRuns optional      
 */
popGen.htmlutil.chartDOM.updateLegend = function(isAppend, numBatchRuns){
    if(this.debug){
        console.log("Updating Legend", this.values); 
    }

    var values = this.values; 
    var graphNum = (this.nextLine - 1)
    var lineColor = popGen.config.chartJQ.colorSet[(graphNum - 1) % popGen.config.chartJQ.colorSet.length]; 
    var graphId = "graph-" + graphNum + "-legend";  //HTML id for this legend 
    var colorBlock = "<i class='fa fa-square' style='color: " + lineColor +"'></i>"; //Small color block of the line that is generated 
    var htmlString = " <div class='legend row' id='" + graphId + "'>" +
         "<h3><i class='fa fa-line-chart'></i> <strong>Graph " + graphNum + " " + colorBlock + "</strong><a href='#' class='pull-right togglelegend'>[Hide Legend]</a></p></h3>" +
             "<ul class='legend-variables list-unstyled block-center'>";

    if(numBatchRuns !== undefined){
        htmlString = " <div class='legend row' id='" + graphId + "'>" +
         "<h3><i class='fa fa-line-chart'></i> <strong>Graphs 1-" + numBatchRuns +  "</strong><a href='#' class='pull-right togglelegend'>[Hide Legend]</a></p></h3>" +
             "<ul class='legend-variables list-unstyled block-center'>";
    }

    //Add items to the graph if they are set 
    htmlString += this.generateLegendRow("numGenerations", values['generations']);

    if(this.isActiveVariable("#population-size")){
        // htmlString += "<li><strong> Population Size: </strong>" + values['population-size'] + "</li>";
        htmlString += this.generateLegendRow("populationSize", values['population-size']);
    }
    else{ //Infinite (may need to change the css to fit infinite symbol) class='infinite-sym'
         htmlString += "<li class='col-xs-12 col-sm-6 col-md-4'><span class='legend-var'>Population Size:</span><span class='legend-symbol'>N</span>" +
            "<span class='legend-val'><span > &infin; </span></span><span data-toggle='tooltip' title='Default Value' class='legend-warning'></span></li>";
    }

    htmlString += this.generateLegendRow("startAlleleFreq", values['starting-allele-frequency']);

    //Only display the active variables in the legend 
    if (this.isActiveVariable("#fitness-coefficient-waa")) {
        htmlString += this.generateLegendRow("fitnessWAA", values['fitness-coefficient-wAA']);
        htmlString += this.generateLegendRow("fitnessWAa", values['fitness-coefficient-wAa']);
        htmlString += this.generateLegendRow("fitnessWaa", values['fitness-coefficient-waa']);
    }
    else if (this.isActiveVariable("#selection-coefficient")) {
        htmlString += this.generateLegendRow("dominanceCoef", values['dominance-coefficient']);
        htmlString += this.generateLegendRow("selectionCoef", values['selection-coefficient']);
    }

    if (this.isActiveVariable("#mutation-rate-nu")) {
        htmlString += this.generateLegendRow("forMutation", values['mutation-rate-mu'], values['mutation-rate-mu-exponent']);
        htmlString += this.generateLegendRow("revMutation", values['mutation-rate-nu'], values['mutation-rate-nu-exponent']);
    }

    if (this.isActiveVariable("#inbreeding-coefficient")) {
        htmlString += this.generateLegendRow("inbreedCoef", values['inbreeding-coefficient']);
    }

    if (this.isActiveVariable("#positive-assortative-mating")) {
        htmlString += this.generateLegendRow("assortMating", values['positive-assortative-mating']);
    }

    if(this.isActiveVariable("#migration-rate")){
         htmlString += this.generateLegendRow("migrationRate", values['migration-rate']);
         htmlString += this.generateLegendRow("migrantAllelFreq", values['migrant-allele-frequency']);
    }

    if(this.isActiveVariable("#generation-to-override")){
        htmlString += this.generateLegendRow("gensToOverride", values['generation-to-override-lower'], values['generation-to-override-upper']);
        htmlString += this.generateLegendRow("newPopSize", values['new-population-size']);
    }

    if(this.isActiveVariable("#batch-tool-runs")){
        htmlString += this.generateLegendRow("batchTool", values['batch-tool-runs']);
    }

    htmlString += "</ul></div>";

    if (isAppend) {
        //Hide other graphs 
        $("#multiple-legends-container .legend").addClass("hidden-legend"); 
        $("#multiple-legends-container .togglelegend").html("[Show Legend]"); 

        $("#multiple-legends-container").append(htmlString);

    } 
    else {
        $("#multiple-legends-container").html(htmlString);
    }

    //Regenerate the tooltips 
    $('[data-toggle="tooltip"]').tooltip();

}

/**
 *  Generate one row of the legend 
 *      
 *  @param {string} variable the name of the variable
 *  @param {string} value   the value of the variable 
 *  @param {string} secondValue if there are multiple values (e.g Generations overide)
 */
popGen.htmlutil.chartDOM.generateLegendRow = function(variable, value, secondValue){
    value = parseFloat(value.replace(',', ''));
    var row = "<li class='col-xs-12 col-sm-6 col-md-4'>"; //The entire row that will be returned 
    var toolTip = ""; //Build the tooltip 
    var defaults = {numGenerations: 500, populationSize: 500, startAlleleFreq: .5, fitnessWaa: 1, fitnessWAa: 1, fitnessWAA: 1,dominanceCoef:1, selectionCoef:0, forMutation:0, revMutation:0, inbreedCoef: 0, assortMating:0, migrationRate:0, migrantAllelFreq:.5, newPopSize: 5000, batchTool: 25 }; // Default values for rows to used to generate default symbol 
    var performanceLimit = {numGenerations: 3000, populationSize: 3000, batchTool: 35}; // Performance max values to generate warning symbol 
    var unusualInput = []; // Unusual inputs to generate warning symbol 


    //Add warnings if neccessary 
    if(value != defaults[variable]) row += "<span data-toggle='tooltip' title='Modified Value' class='legend-warning modified-value'>";
    else if(value >= performanceLimit[variable]) toolTip += "<span data-toggle='tooltip' title='Possible Slow Graphing' class='legend-warning'><i class='fa fa-tachometer'></i></span>"; 

    //Add the value and formatting 
    switch (variable){
        case "numGenerations":
            row += "<span class='legend-var'>Generations:</span><span class='legend-symbol'>t</span>" +
                "<span class='legend-val'>" + value + "</span>"; 
            break;
        case "populationSize":
            row += "<span class='legend-var'>Population Size:</span><span class='legend-symbol'>N</span>" +
                "<span class='legend-val'>" + value + "</span>";
            break;
        case "startAlleleFreq": 
            row += "<span class='legend-var'>Starting Allele Frequency:</span><span class='legend-symbol'>p</span>" +
                "<span class='legend-val'>" + value + "</span>";
            break; 
        case "fitnessWaa":
            row += "<span class='legend-var'>Fitness Coefficient:</span><span class='legend-symbol'>W<sub>aa</sub></span>" +
                "<span class='legend-val'>" + value + "</span>";        
            break; 
        case "fitnessWAa":
            row += "<span class='legend-var'>Fitness Coefficient:</span><span class='legend-symbol'>W<sub>Aa</sub></span>" +
                "<span class='legend-val'>" + value + "</span>";
            break;  
        case "fitnessWAA":
            row += "<span class='legend-var'>Fitness Coefficient:</span><span class='legend-symbol'>W<sub>AA</sub></span>" +
                "<span class='legend-val'>" + value + "</span>";
            break;
        case "dominanceCoef":
            row += "<span class='legend-var'>Dominance Coefficient:</span><span class='legend-symbol'>h</span>" +
                "<span class='legend-val'>" + value + "</span>";
            break;
        case "selectionCoef":
            row += "<span class='legend-var'>Selection Coefficient:</span><span class='legend-symbol'>s</span>" +
                "<span class='legend-val'>" + value + "</span>";
            break;

        case "forMutation":
            row += "<span class='legend-var'>Forward Mutation:</span><span class='legend-symbol'>μ</span>" +
                "<span class='legend-val'>" + value + "x10<sup>" + secondValue + "</sup></span>";
            break;
        case "revMutation":
            row += "<span class='legend-var'>Reverse Mutation:</span><span class='legend-symbol'>ν</span>" +
                "<span class='legend-val'>" + value + "x10<sup>" + secondValue + "</sup></span>";
            break;        
        case "inbreedCoef":
            row += "<span class='legend-var'>Inbreeding Coefficient:</span><span class='legend-symbol'>F</span>" +
                "<span class='legend-val'>" + value + "</span>";
            break;        
        case "assortMating":
            row += "<span class='legend-var'>Positive Assortative Mating Frequency:</span><span class='legend-symbol'>α</span>" +
                "<span class='legend-val'>" + value + "</span>";
            break;        
        case "migrationRate":
            row += "<span class='legend-var'>Migration Rate:</span><span class='legend-symbol'>m</span>" +
                "<span class='legend-val'>" + value + "</span>";
            break;
        case "migrantAllelFreq":
            row += "<span class='legend-var'>Migrant Allele Frequency:</span><span class='legend-symbol'>p<sub>M</sub></span>" +
                "<span class='legend-val'>" + value + "</span>";
            break;
        case "gensToOverride":
            row += "<span class='legend-var'>Generations to Override:</span><span class='legend-symbol'></span>" +
                "<span class='legend-val'>" + value + " to " + secondValue + "</span>";
            break; 
        case "newPopSize":
            row += "<span class='legend-var'>Override Population Size:</span><span class='legend-symbol'>N<sub>B</sub></span>" +
                "<span class='legend-val'>" + value + "</span>";
            break;
        case "batchTool":
            row += "<span class='legend-var'>Batch Runs:</span><span class='legend-symbol'></span>" +
                "<span class='legend-val'>" + value + "</span>";
            break; 

    }

    if(value != defaults[variable]) row += "</span>"; //Close the span opened by non-default value 
    row += toolTip + "</li>"; //Add the tool tip and end the list 

    return row;
}

/**
 *  After running through the batch runs compute various stats on all of the runs
 *   
 */
 popGen.htmlutil.chartDOM.computeBatchStats = function (){
    //Clean up the legends too (Remove all but one and change it to Graph 1-50 since they are all the same vars)
    console.log(this.frequencies); 

    var numHit0 = 0;    //Number of populations that hit 0 frequency 
    var numHit1 = 0;    //Number of populations that hit 1 frequency 

    var gensTo0 = 0;    //Add the generation number each time it hits 0 
    var gensTo1 = 0;    //Add the generation number each time it hits 1 


    //Loop Through all of the results 
    for(var i=0; i<this.frequencies.length; i++){
        for(var j=0; j<this.frequencies[i].length; j++){
            if(this.frequencies[i][j] == 0){
                numHit0++;
                gensTo0 += j; 
                break; 
            }
            else if(this.frequencies[i][j] == 1){
                numHit1++;
                gensTo1 += j; 
                break; 
            }
        }
    }

    //Compute Averages 
    if(numHit0 > 0) var stringTo0 = (gensTo0/numHit0).toFixed(2);
    else var stringTo0 = "Never Hit 0.0";
    
    if(numHit1 > 0) var stringTo1 = (gensTo1/numHit1).toFixed(2);
    else var stringTo1 = "Never Hit 1.0";



    //Update the graph_stats and make it visible 
    $("#graph_stats").removeClass("hidden"); 
    $("#timeto0").html(stringTo0);
    $("#timeto1").html(stringTo1);

 }



/**
 * 	Redraw the graph making it printing friendly 
 *      
 *      
 */
popGen.htmlutil.chartDOM.highContrastMode = function(){
	this.initChart(); 

	if (popGen.htmlutil.supportsHTML5LocalStorage()) {localStorage.setItem('layout','contrast');}
    //Change the color of all the lines 
	this.highContrast = true; //Not sure why I need this ATM

	var black = "rgba(0,0,0,1.0)";
	var darkGray = "rgba(0,0,0,.70)";
	var white = "rgba(255,255,255,1.0)";


	//Change some CSS
	$("#graph_wrapper").css("background-color", "white"); 
	$("#graph_wrapper").css("background-image", "none"); 
	$("#graph_wrapper").css("color", "black"); 


	//Change the Label colors 
	this.chart.options.axisX.labelFontColor = black;  
	this.chart.options.axisX.titleFontColor = black;  
	this.chart.options.axisX.gridColor 		= darkGray;  
	this.chart.options.axisY.labelFontColor = black; 
	this.chart.options.axisY.titleFontColor = black;  
	this.chart.options.axisY.gridColor 		= darkGray;  
	this.chart.options.backgroundColor 		= white; 

	this.chart.render();

	//Swap out the icons 
}

/**
 * 	Redraw the graph making it screen friendly (Default State)
 *      
 *      
 */
popGen.htmlutil.chartDOM.defaultLayout = function(){
	this.initChart();
	if (popGen.htmlutil.supportsHTML5LocalStorage()) {localStorage.setItem('layout','default');} 

	this.highContrast = false; //Not sure why I need this ATM

	var black 		= "rgba(0,0,0,1.0)";
	var darkGray 	= "rgba(0,0,0,.70)";
	var white 		= "rgba(255,255,255,1.0)";
	var lineColor 	= "rgba(255, 255, 255, 0.75)";
	var lightGray 	= "rgba(255, 255, 255, 0.2)";
	var clear 		= "rgba(255, 255, 255, 0.0)";

	//Change some CSS
	$("#graph_wrapper").css("background-image", "linear-gradient(to bottom, #4b516a 0%, #21232e 100%)"); 
	$("#graph_wrapper").css("color", "#fff"); 
	$("#graph_wrapper").css("background-color", "inherit"); 

	//Change the Label colors 
	this.chart.options.axisX.labelFontColor 	= lightGray;  
	this.chart.options.axisX.titleFontColor 	= white;  
	this.chart.options.axisX.gridColor 			= lightGray;  
	this.chart.options.axisY.labelFontColor 	= lightGray; 
	this.chart.options.axisY.titleFontColor 	= white;  
	this.chart.options.axisY.gridColor 			= lightGray;  
	this.chart.options.backgroundColor 			= clear; 
	this.chart.render();
}

/**
 * 	Get all of the raw data points and open them in a new window
 *      
 *      
 */
popGen.htmlutil.chartDOM.getRawData = function(){
    this.initChart(); 

    var opened = window.open("");

    var chartData = ""; 
    for(var i = 0; i < this.chart.options.data.length; i++){
        // console.log(chart.options.data[i].dataPoints); 
        for(var j=0; j<this.chart.options.data[i].dataPoints.length; j++){
            chartData += "(";
            chartData += this.chart.options.data[i].dataPoints[j].x;
            chartData += ", ";
            chartData += this.chart.options.data[i].dataPoints[j].y;
            
            if(j == this.chart.options.data[i].dataPoints.length - 1) chartData += ")";
            else chartData += "), ";
        }
        chartData += "<br/> <br/>";
    }
    opened.document.write("<html><head><title>Graph | Raw Data </title></head><body style='max-width: 100%;'><code>" + chartData + "</code></body></html>");

}





/**
 * 	Runs the population simluation using the "classes" in population_genetics.js
 *      
 *  @param {string} selector form selector 
 *  @param {string} type the format of the graph (redraw, addline, batch) 
 */
popGen.htmlutil.chartDOM.formHandler = function(selector, type){
	this.initChart(); //Set the basic vars if they aren't already set
	var values = this.values; 

	var isValid = true; 
	var errors = []; //Error messages

	//Required Values
    var input_population_size = parseFloat(values['population-size'].replace(',', ''));
    var input_num_generations = parseFloat(values['generations'].replace(',', ''));
    var intput_starting_alele_frequency = parseFloat(values['starting-allele-frequency']);
    var myGenerations = new popGen.generations(input_num_generations, input_population_size, intput_starting_alele_frequency);
    // console.log(myGenerations); 

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

    // console.log(myGenerations);

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

    //Actually perform the work
    if(isValid){

        //Allows you to pass these args (Prob not a good name)
        
        //Open the Modal for long calculations
        if(input_num_generations > 1000 || input_population_size > 1000){
            $('#graph-computing-modal').modal('show');
        }

        //Call a different function if infinite sample sizes is set both functions set myGenerations.frequencies 
        if(!this.isActiveVariable("#population-size")){
            myGenerations.setInfinitePopulation(); 
        }

        //Special case for batch runs (Consider finishedComputingpartial var)
        if(this.isActiveVariable("#batch-tool-runs")){
            var allGenerations = []; 
            var allPartials = []; 
            
            this.clearGraph();

            type = "batchTool"; //Change type to not screw up the legend updating 

            //Create copies for each generation 
            for(var i=0; i<numBatchRuns; i++){
                allGenerations[i] = jQuery.extend(true, {}, myGenerations);
                allPartials[i] = popGen.htmlutil.partial(this.finishedComputing, allGenerations[i], type); 
            }

            //Run all of the copies 
            for(var i=0; i<numBatchRuns; i++){
                allGenerations[i].buildRandomSamplesAsync(allGenerations[i], allPartials[i]);
            }

        }
        else{ //Just one run 
            var finishedComputingFunction = popGen.htmlutil.partial(this.finishedComputing, myGenerations, type); 
            myGenerations.buildRandomSamplesAsync(myGenerations, finishedComputingFunction);
        }
    }
    else{
        //Clear the errors 
        $("#alerts-container").html(""); 

        errors.forEach(function(error){
            $("#alerts-container").append(buildAlert("alert-danger", error));
        });

        //Add a modal too 
    }
    
    if(errors.length > 0) console.log(errors);
    
    $("#results_panel #results").html("Check the console for better data \n" + myGenerations.toString());


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


/**
 *  This will get called when the asynchronous building of random samples is actually finished
 *	-Don't use this here
 */
popGen.htmlutil.chartDOM.finishedComputing = function(myGenerations, type){
    //Close the modal
    $('#graph-computing-modal').modal('hide');

    //Check to see if the last graph was a batch auto reset it 
    if(!$("#graph_stats").hasClass("hidden") && type !="batchTool" ){
        // clearChart(chart); 
        $("#graph_stats").addClass("hidden");
    }

    popGen.htmlutil.chartDOM.updateGraph(myGenerations.frequencies, type); //Update the graph with the new frequencies 
    popGen.htmlutil.chartDOM.chart.render(); //Only render here 

    var d = new Date();
    $("#alerts-container").html(popGen.htmlutil.buildAlert("alert-success", "")); 
}



