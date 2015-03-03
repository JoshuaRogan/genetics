$(document).ready(function() {
    // var chart; //canvas js var allows to make changes to the chart via a var
    CanvasJS.colorSet = [];


 

    if ($("#main").hasClass("page-home")) {

        //Create localStore to save config options 
        if (supports_html5_storage()) {
            if(localStorage.getItem("layout") == "contrast"){
                var chart = $("#graph-canvas").CanvasJSChart();
                printerFriendly(chart);
                console.log("Here"); 
            }
        }

        //The colors that will be graphed 
        CanvasJS.colorSet = 
            [
                 "#1BCDD1",
                 "#EC5657",
                 "#8FAABB",
                 "#B08BEB",
                 "#3EA0DD",
                 "#F5A52A",
                 "#23BFAA",
                 "#FAA586",
                 "#EB8CC6"            
             ];

        CanvasJS.addColorSet("greenShades", CanvasJS.colorSet);


        $('[data-toggle="tooltip"]').tooltip(); //Opt in to bootstrap tooltips 

    	//Automatically select all the text when they click on an input 
        $("input[type='text']").on("click", function() {
            $(this).select(); 
        });

        
        /***********SLIDER CONFIGURATION (MOVED TO A CONFIG FILE)***********/


        /*******************************Generating Helper Text*******************************/
        //Bind on click to the helper text
        $(".variable label a").click(function(event) {
            event.preventDefault();
            $(this).parent().next().toggleClass("hidden");
        });

        //Show All help button
        $("#all-help").click(function(event) {
            event.preventDefault();
            if ($(this).html() == "[Show Help]"){
            	 $(".variable .help-block").removeClass("hidden");
            	 $(this).html("[Hide Help]");
            }
            else{
            	$(".variable .help-block").addClass("hidden");
            	$(this).html("[Show Help]");
            }
        });
        /*******************************End Helper Text*******************************/

        /*******************************Handle Opening & Closing of Sections *******************************/
        //Consider adding a cookie to keep track of these states 
        

        var variable_text = '<i class="fa fa-chevron-down"></i>';
        var alt_variable_text = '<i class="fa fa-chevron-up"></i>';

        //Modify to make it open to start
        $("#main-variables .variable-section-toggle").html(alt_variable_text);

        $(".variable-section-toggle").click(function(event){
        	event.preventDefault();
        	$(this).parent().next().next().toggleClass("hidden");

        	if ($(this).html() == variable_text){
        		$(this).html(alt_variable_text);
        	} 
            else {
            	$(this).html(variable_text);
            }
        });

        //Open all of the sections 
        $("#all-sections").click(function(event) {
            event.preventDefault();

            if ($(this).html() == '[Open All]'){
            	 $(".variables-section").removeClass("hidden");
            	 $(this).html("[Close All]");
            	 $(".variable-section-toggle").html(alt_variable_text);
            }
            else{
            	$(".variables-section").addClass("hidden");
            	$(this).html("[Open All]");
            	$(".variable-section-toggle").html(variable_text);
            }
        });
       	/*******************************Handle Opening & Closing of Sections *******************************/


       	/*******************************Handle Opening & Closing of Active Sections *******************************/
       	$(".variable-activator").click(function(event){
       		event.preventDefault();
       		var state;

       		var parentDiv = $(this).parent().parent().parent();

       		if($(this).hasClass("fa-square-o")){	//Activate the variable 
       			$(this).removeClass("fa-square-o");
       			$(this).addClass("fa-check-square-o");

       			//Check to see if the div is open 
       			if(parentDiv.children(".variables-section").hasClass("hidden")){
       				parentDiv.children(".variables-section").removeClass("hidden");
       			}


       			state = "checked"; 
       		}
       		else{	//Deactive the variable
				$(this).removeClass("fa-check-square-o");
       			$(this).addClass("fa-square-o");
       			state = "unchecked"; 

       			//Check to see if the div is open 
       			if(!(parentDiv.children(".variables-section").hasClass("hidden"))){
       				parentDiv.children(".variables-section").addClass("hidden");
       			}


       		}

       		//Send the correct id i->a->h3->div
       		deactiveActiveOnCheckmark(parentDiv.attr('id'), state);
       		
       	});
       	/*******************************Handle Opening & Closing of Active Sections *******************************/

        /*******************************Handle Opening & Closing of Legend *******************************/


        $("#multiple-legends-container").on('click', ".togglelegend", function(event) {
            event.preventDefault();
            var legend = $(this).parent().parent(); //up one h3, up two div(legend)

            if(legend.hasClass("hidden-legend")){
                legend.removeClass("hidden-legend"); 
                $(this).html("[Hide Legend]");
            }
            else{
                legend.addClass("hidden-legend"); 
                $(this).html("[Show Legend]");
            }



        });



        /*******************************Handle Opening & Closing of Legend *******************************/


        //Handle the submit clicking
        $("#newGraph").on("click", function(event) {
        	var chart = $("#graph-canvas").CanvasJSChart(); 
        	formHandler(chart, "newGraph");
        }); 

        $("#addLine").on("click", function(event) {
        	var chart = $("#graph-canvas").CanvasJSChart(); 
        	formHandler(chart, "addLine");
        }); 

        //Handle clicking printerfriendly 
        $("#printerFriendly").on("click", function(event) {
        	event.preventDefault();
        	var chart = $("#graph-canvas").CanvasJSChart(); 
        	printerFriendly(chart);
        }); 

        //Handle clicking screenFreindly  
        $("#screenFriendly").on("click", function(event) {
        	event.preventDefault();
        	var chart = $("#graph-canvas").CanvasJSChart(); 
        	screenFriendly(chart);
        }); 

        //Handle clicking printerfriendly 
        $("#getRawData").on("click", function(event) {
        	event.preventDefault();
        	var chart = $("#graph-canvas").CanvasJSChart(); 
        	getRawData(chart);
        }); 






        /*************AUTOMATIC PRINTER FRIENDLY VERSION*************/
		// if (window.matchMedia) {
		// 	var mediaQueryList = window.matchMedia('print');

		// 	mediaQueryList.addListener(function(mql) {
		// 	    if (mql.matches) {
		// 	    	// printerFriendly(chart);
		// 	    } 
		// 	    else {
		// 	    	// screenFriendly(chart);
		// 	    }
		// 	});
		// }

		// window.onbeforeprint = printerFriendly(chart);
		// window.onafterprint = screenFriendly(chart);
		/*************AUTOMATIC PRINTER FRIENDLY VERSION*************/


    } ///END PAGE HOME 



}) //Document ready 


// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 *	Redraw the entire graph ignoring previous data and using the first color.
 *
 */
function updateGraph(results, chart) {
    console.log(chart); 

    if(chart.printerFriendly === true){ //WONT WORK HERE
		var color = "rgba(0, 0, 0, 1.0)";
	}
	else{
		var color = "rgba(255, 255, 255, 0.75)";
	}


    var data = [];
    var dataSeries = {
        type: "line",
        // color: color
    };
    var dataPoints = [];
    for (var i = 0; i < results.length; i++) {
        dataPoints.push({
            x: i,
            y: results[i]
        });
    }
    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);
    chart.options.data = data;
    chart.options.colorSet = "greenShades"; 
    chart.render();
}


/**
 *	Add a line to the graph without destorying the other lines. Generate a color by checking what lines have already been
 *	generated and shifting the color.
 *
 */
function addLineToGraph(results, chart, lineColor) {
    var data = chart.options.data;
	
	if(chart.printerFriendly === true){
		var color = "rgba(0, 0, 0, 1.0)";
	}
	else{
		var color = "rgba(255, 255, 255, 0.75)";
	}
	
	var dataSeries = {
        type: "line",
        // color: color
    };
    var dataPoints = [];
    for (var i = 0; i < results.length; i++) {
        dataPoints.push({
            x: i,
            y: results[i]
        });
    }
    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);
    chart.options.data = data;
    chart.options.colorSet = "greenShades";
    chart.render();
}


/**	
 *	Redraw the canvas to make it printer friendly 
 *
 */
function printerFriendly(chart){
	if (supports_html5_storage()) {localStorage.setItem('layout','contrast');}
    //Change the color of all the lines 
	chart.printerFriendly = true; 

	var black = "rgba(0,0,0,1.0)";
	var darkGray = "rgba(0,0,0,.70)";
	var white = "rgba(255,255,255,1.0)";


	//Change some CSS
	$("#graph_wrapper").css("background-color", "white"); 
	$("#graph_wrapper").css("background-image", "none"); 
	$("#graph_wrapper").css("color", "black"); 


	//Change the Label colors 
	chart.options.axisX.labelFontColor = black;  
	chart.options.axisX.titleFontColor = black;  
	chart.options.axisX.gridColor = darkGray;  

	chart.options.axisY.labelFontColor = black; 
	chart.options.axisY.titleFontColor = black;  
	chart.options.axisY.gridColor = darkGray;  

	chart.options.backgroundColor = white; 

	chart.render();
}

/**	
 *	Redraw the canvas to make it screen friendly (Default state) 
 *
 */
function screenFriendly(chart){
	if (supports_html5_storage()) {localStorage.setItem('layout','default');}

    //Change the color of all the lines  
	chart.printerFriendly = false; 

	var black = "rgba(0,0,0,1.0)";
	var darkGray = "rgba(0,0,0,.70)";
	var white = "rgba(255,255,255,1.0)";

	var lineColor = "rgba(255, 255, 255, 0.75)";
	var lightGray = "rgba(255, 255, 255, 0.2)";
	var clear = "rgba(255, 255, 255, 0)";


	//Change some CSS
	$("#graph_wrapper").css("background-image", "linear-gradient(to bottom, #4b516a 0%, #21232e 100%);"); 
	$("#graph_wrapper").css("color", "#fff"); 

	//Change the Label colors 
	chart.options.axisX.labelFontColor = lightGray;  
	chart.options.axisX.titleFontColor = white;  
	chart.options.axisX.gridColor = lightGray;  

	chart.options.axisY.labelFontColor = lightGray; 
	chart.options.axisY.titleFontColor = white;  
	chart.options.axisY.gridColor = lightGray;  

	chart.options.backgroundColor = clear; 

	chart.render();
}

/**
 *	Print out the raw data that was graphed for all the lines 
 *
 */
 function getRawData(chart){
	var opened = window.open("");

	var chartData = ""; 
	for(var i = 0; i < chart.options.data.length; i++){
		// console.log(chart.options.data[i].dataPoints); 
		for(var j=0; j<chart.options.data[i].dataPoints.length; j++){
			chartData += "(";
			chartData += chart.options.data[i].dataPoints[j].x;
			chartData += ", ";
			chartData += chart.options.data[i].dataPoints[j].y;
			
			if(j == chart.options.data[i].dataPoints.length - 1) chartData += ")";
			else chartData += "), ";
		}
		chartData += "<br/> <br/>";
	}
	opened.document.write("<html><head><title>Graph | Raw Data </title></head><body style='max-width: 100%;'><code>" + chartData + "</code></body></html>");
 }


/**
 *	Update the legend only the the variables that are actually being used. If a line is being added append it to the html
 *	if the graph is being redraw don't append it.
 *
 */
var num_graphs = 1; //Maintain graph number 

function updateLegend(values, append) {
    //Determine the color of the line 
    if(!append) var lineColor = CanvasJS.colorSet[0]; //new Graph use the first color 
    else var lineColor = CanvasJS.colorSet[(num_graphs) % CanvasJS.colorSet.length];   


    //Update graph count 
    if(append) num_graphs++;
    else num_graphs = 1;
    var graphId = "graph-" + num_graphs + "-legend"; 

    //Use fa icon to add a color block 
    var colorBlock = "<i class='fa fa-square' style='color: " + lineColor +"'></i>";

    var htmlString = " <div class='legend row' id='" + graphId + "'>" +
         "<h3><i class='fa fa-line-chart'></i> <strong>Graph " + num_graphs + " " + colorBlock + "</strong><a href='#' class='pull-right togglelegend'>[Hide Legend]</a></p></h3>" +
             "<ul class='legend-variables list-unstyled block-center'>";

    // htmlString += "<li><strong> Number Generations: </strong>" + values['generations'] + "<li/>";
    htmlString += generateLegendRow("numGenerations", values['generations']);

    if(isActiveVariable("#population-size")){
        // htmlString += "<li><strong> Population Size: </strong>" + values['population-size'] + "</li>";
        htmlString += generateLegendRow("populationSize", values['population-size']);
    }
    else{ //Infinite (may need to change the css to fit infinite symbol) class='infinite-sym'
         htmlString += "<li class='col-xs-12 col-sm-6 col-md-4'><span class='legend-var'>Population Size:</span><span class='legend-symbol'>N</span>" +
            "<span class='legend-val'><span > &infin; </span></span><span data-toggle='tooltip' title='Default Value' class='legend-warning'><i class='fa fa-recycle'></i></span></li>";
    }

    htmlString += generateLegendRow("startAlleleFreq", values['starting-allele-frequency']);

    //Only display the active variables in the legend 
    if (isActiveVariable("#fitness-coefficient-waa")) {
        htmlString += generateLegendRow("fitnessWAA", values['fitness-coefficient-wAA']);
        htmlString += generateLegendRow("fitnessWAa", values['fitness-coefficient-wAa']);
        htmlString += generateLegendRow("fitnessWaa", values['fitness-coefficient-waa']);
    }
    else if (isActiveVariable("#selection-coefficient")) {
        htmlString += generateLegendRow("dominanceCoef", values['dominance-coefficient']);
        htmlString += generateLegendRow("selectionCoef", values['selection-coefficient']);
    }

    if (isActiveVariable("#mutation-rate-nu")) {
        htmlString += generateLegendRow("forMutation", values['mutation-rate-mu'], values['mutation-rate-mu-exponent']);
        htmlString += generateLegendRow("revMutation", values['mutation-rate-nu'], values['mutation-rate-nu-exponent']);
    }

    if (isActiveVariable("#inbreeding-coefficient")) {
        htmlString += generateLegendRow("inbreedCoef", values['inbreeding-coefficient']);
    }

    if (isActiveVariable("#positive-assortative-mating")) {
        htmlString += generateLegendRow("assortMating", values['positive-assortative-mating']);
    }

    if(isActiveVariable("#migration-rate")){
         htmlString += generateLegendRow("migrationRate", values['migration-rate']);
         htmlString += generateLegendRow("migrantAllelFreq", values['migrant-allele-frequency']);
    }

    if(isActiveVariable("#generation-to-override")){
        htmlString += generateLegendRow("gensToOverride", values['generation-to-override-lower'], values['generation-to-override-upper']);
        htmlString += generateLegendRow("newPopSize", values['new-population-size']);
    }

    htmlString += "</ul></div>";

    if (append) {
        //Hide other graphs 
        $("#multiple-legends-container .legend").addClass("hidden-legend"); 
        $("#multiple-legends-container .togglelegend").html("[Show Legend]"); 



        $("#multiple-legends-container").append(htmlString);

    } else {
        $("#multiple-legends-container").html(htmlString);
    }

    //Regenerate the tooltips 
    $('[data-toggle="tooltip"]').tooltip();
}

/**
 *  Generate one variable <li> string 
 *
 */
function generateLegendRow(variable, value, secondValue){
    value = parseFloat(value.replace(',', ''));
    var row = "<li class='col-xs-12 col-sm-6 col-md-4'>"; //The entire row that will be returned 
    var toolTip = ""; //Build the tooltip 
    var defaults = {numGenerations: 500, populationSize: 500, startAlleleFreq: .5, fitnessWaa: 1, fitnessWAa: 1, fitnessWAA: 1,dominanceCoef:1, selectionCoef:0, forMutation:0, revMutation:0, inbreedCoef: 0, assortMating:0, migrationRate:0, migrantAllelFreq:.5, newPopSize: 5000 }; // Default values for rows to used to generate default symbol 
    var performanceLimit = {numGenerations: 3000, populationSize: 3000}; // Performance max values to generate warning symbol 
    var unusualInput = []; // Unusual inputs to generate warning symbol 


    //Add warnings if neccessary 
    if(value == defaults[variable]) toolTip += "<span data-toggle='tooltip' title='Default Value' class='legend-warning'><i class='fa fa-recycle'></i></span>";
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

    }

    row += toolTip + "</li>"; //Add the tool tip and end the list 

    return row;
}


//Take a serialized array and change the filed name value to an associative array
//TODO: Validate the numbers here
function seralizeForm(serializeArray) {
    var values = {};
    $.each(serializeArray, function(i, field) {
        values[field.name] = field.value;
    });

    return values;
}

//Returns true if the variable is in active state variable id should be a string of the id of the variable
function isActiveVariable(variableId){
	var isActive = false; 
	variableId += "-slider"; 

	//Done this way to make sure it returns exactly true or false
	if($(variableId).hasClass("active")){
		isActive = true; 
	}

	return isActive;
}





//Updates the upper limit on the generation override slider 
function updateGenOverride(){

}

/**
 *	Runs the population simluation using the "classes" in population_genetics.js
 *	
 *
 */
function formHandler(chart, type){
    var values = seralizeForm($("#variables-form").serializeArray());
    
    if(type == "newGraph") updateLegend(values, false);
    else updateLegend(values, true);
   

	var isValid = true; //Validation check 
	var errors = []; //Error messages 

    //Required Values
    var input_population_size = parseFloat(values['population-size'].replace(',', ''));
    var input_num_generations = parseFloat(values['generations'].replace(',', ''));
    var intput_starting_alele_frequency = parseFloat(values['starting-allele-frequency']);
    var myGenerations = new generations(input_num_generations, input_population_size, intput_starting_alele_frequency);
    

    //Selection variables if the coefficient is active 
    if(isActiveVariable("#fitness-coefficient-wAA") || isActiveVariable("#selection-coefficient")){
    	//Use the fitness coefficients (waa, wAA, wAa)
    	if(isActiveVariable("#fitness-coefficient-wAA")){
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
    if (isActiveVariable("#mutation-rate-mu") || isActiveVariable("#mutation-rate-nu")) {
    	var forwardMutationRate = parseFloat(values['mutation-rate-mu']) * Math.pow(10,parseInt(values['mutation-rate-mu-exponent']));
    	var revMutationRate = parseFloat(values['mutation-rate-nu']) * Math.pow(10,parseInt(values['mutation-rate-nu-exponent']));

        myGenerations.setMutation(forwardMutationRate, revMutationRate);
    }

    //Set the Migration Variables if they are active 
    if(isActiveVariable("#migration-rate")){
    	var migrationRate = parseFloat(values['migration-rate']);
    	var migrantAlleleFrequency = parseFloat(values['migrant-allele-frequency']);
    	myGenerations.setMigrationRate(migrationRate, migrantAlleleFrequency);
    }

    //Inbreeding Variables 
    if(isActiveVariable("#inbreeding-coefficient")){
    	var inbreedingCoe = parseFloat(values['inbreeding-coefficient']);
    	myGenerations.setInbreedingCoefficient(inbreedingCoe);
    }

    //Assortative mating 
    if(isActiveVariable("#positive-assortative-mating")){
    	var positiveAssortativeMatingFreq = parseFloat(values['positive-assortative-mating']);
    	myGenerations.setAssortativeMating(positiveAssortativeMatingFreq);
    }

    //Population bottleneck
    if(isActiveVariable("#generation-to-override")){
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

    //Actually perform the work
    if(isValid){
    	var finishedComputingPartial = partial(finishedComputing, myGenerations, chart, type)
    	
    	//Open the Modal for long calculations
    	if(input_num_generations > 1000 || input_population_size > 1000){
    		$('#graph-computing-modal').modal('show');
    	}

    	//Call a different function if infinite sample sizes is set both functions set myGenerations.frequencies 
    	if(!isActiveVariable("#population-size")){
    		myGenerations.setInfinitePopulation();
    	}
    	
    	myGenerations.buildRandomSamplesAsync(myGenerations, finishedComputingPartial);
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
 *	This will get called when the asynchronous building of random samples is actually finished
 *
 */
function finishedComputing(myGenerations, chart, type){
	//Close the modal
	$('#graph-computing-modal').modal('hide');

	console.log(myGenerations);
	var results = myGenerations.frequencies;	//The frequencies is what is being graphed

	if(type =="newGraph"){
        updateGraph(results, chart);
        
    }
    else{
        addLineToGraph(results, chart);
    }

    var d = new Date();
    $("#alerts-container").html(buildAlert("alert-success", "")); 

}

/**
 *	Able to pass arguments as a parameter 
 *	Source: http://stackoverflow.com/questions/321113/how-can-i-pre-set-arguments-in-javascript-function-call-partial-function-appli
 */
function partial(func /*, 0..n args */) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var allArguments = args.concat(Array.prototype.slice.call(arguments));
    return func.apply(this, allArguments);
  };
}


/**
 *	Build an alert div returing the string
 *	Types: alert-success, alert-info, alert-warning, alert-danger (From bootstrap)
 */
function buildAlert(className, message){
	var text = ""; 
	var html = ""; 
	var d = new Date();	

	if(className == "alert-success"){
		text = "Graph successfully created "
	}
	else if(className = "alert-danger"){ 
		text = message + " - Graph failed to be created "; 
	}

	html = "<div class='alert " + className + "' role='alert'>" + "<strong>" + text + "</strong> on " + d + "</div";  

	return html; 
}


function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}