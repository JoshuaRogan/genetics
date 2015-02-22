$(document).ready(function() {
    // var chart; //canvas js var allows to make changes to the chart via a var
    

    if ($("#main").hasClass("page-home")) {
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
        color: color
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
        color: color
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
    chart.render();
}


/**	
 *	Redraw the canvas to make it printer friendly 
 *
 */
function printerFriendly(chart){
	//Change the color of all the lines 
	chart.printerFriendly = true; 

	var black = "rgba(0,0,0,1.0)";
	var darkGray = "rgba(0,0,0,.70)";
	var white = "rgba(255,255,255,1.0)";


	//Change some CSS
	$("#graph_wrapper").css("background-color", "white"); 
	$("#graph_wrapper").css("background-image", "none"); 
	$("#graph_wrapper").css("color", "black"); 

	//Change all of the lines to black 
	for(var i = 0; i < chart.options.data.length; i++){
		chart.options.data[i].color = black;
	}

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
	//Change the color of all the lines  
	chart.printerFriendly = false; 

	var black = "rgba(0,0,0,1.0)";
	var darkGray = "rgba(0,0,0,.70)";
	var white = "rgba(255,255,255,1.0)";

	var lineColor = "rgba(255, 255, 255, 0.75)";
	var lightGray = "rgba(255, 255, 255, 0.2)";
	var clear = "rgba(255, 255, 255, 0)";


	//Change some CS 
	$("#graph_wrapper").css("background-image", "linear-gradient(to bottom, #4b516a 0%, #21232e 100%);"); 
	$("#graph_wrapper").css("color", "#fff"); 

	//Change all of the lines to black 
	for(var i = 0; i < chart.options.data.length; i++){
		chart.options.data[i].color = lineColor;
	}

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
 var num_graphs = 0; 
function updateLegend(values, append) {
    
	// console.log(values); 
    var htmlString = "<ul class='list-inline'>";



    if(isActiveVariable("#population-size")){
    	htmlString += "<li><strong> Population Size: </strong>" + values['population-size'] + "</li>";
    }
    else{
    	htmlString += "<li><strong> Population Size: </strong> <span class='infinite-sym'> &infin; </span> </li>";

    }






    htmlString += "<li><strong> Number Generations: </strong>" + values['generations'] + "<l/i>";
    htmlString += "<li><strong> Starting Allele Frequency: </strong>" + values['starting-allele-frequency'] + "</li>";

    //Only display the active variables in the legend 
    if (isActiveVariable("#fitness-coefficient-waa")) {
        htmlString += "<li><strong> Fitness Coefficient waa: </strong>" + values['fitness-coefficient-waa'] + "</li>";
        htmlString += "<li><strong> Fitness Coefficient wAa: </strong>" + values['fitness-coefficient-wAa'] + "</li>";
        htmlString += "<li><strong> Fitness Coefficient wAA: </strong>" + values['fitness-coefficient-wAA'] + "</li>";
    }

    if (isActiveVariable("#selection-coefficient")) {
        htmlString += "<li><strong> Dominance Coefficient: </strong>" + values['dominance-coefficient'] + "</li>";
        htmlString += "<li><strong> Selection Coefficient: </strong>" + values['selection-coefficient'] + "</li>";
    }

    if (isActiveVariable("#mutation-rate-nu")) {
        htmlString += "<li><strong> Forward Mutation: </strong>" + values['mutation-rate-mu'] + "x10<sup>" + values['mutation-rate-mu-exponent'] + "</sup></li>";
        htmlString += "<li><strong> Reverse Mutation: </strong>" + values['mutation-rate-nu'] + "x10<sup>"+ values['mutation-rate-nu-exponent'] + "</sup></li>";
    }

    if (isActiveVariable("#inbreeding-coefficient")) {
        htmlString += "<li><strong> Inbreeding Coefficient: </strong>" + values['inbreeding-coefficient'] + "</li>";
    }

    if (isActiveVariable("#positive-assortative-mating")) {
        htmlString += "<li><strong> Positive Assortative Mating Frequency: </strong>" + values['positive-assortative-mating'] + "</li>";
    }

    if(isActiveVariable("#migration-rate")){
    	 htmlString += "<li><strong> Migration Rate: </strong>" + values['migration-rate'] + "</li>";
    	 htmlString += "<li><strong> Migrant Allele Frequency: </strong>" + values['migrant-allele-frequency'] + "</li>";
    }

    if(isActiveVariable("#generation-to-override")){
    	htmlString += "<li><strong> Generations to Override: </strong>" + values['generation-to-override-lower'] + " to " + values['generation-to-override-upper'] + "</li>";
    	htmlString += "<li><strong> Override Population Size: </strong>" + values['new-population-size'] + "</li>";
    }




    htmlString += "</ul>";

    if (append) {
        $("#graph_legend").append(htmlString);
    } else {
        $("#graph_legend").html(htmlString);
    }


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

/** 
 *	Make sure that the validation override doesn't exceed the the actual number of generations 
 *
 */
function validateGenOverride(){
	if(isActiveVariable("#generation-to-override")){
		//Validate here 
		var validPopBottleneck = true; 
		var values = seralizeForm($("#variables-form").serializeArray());
		if(parseFloat(values['generation-to-override-lower'].replace(',', '')) > parseFloat(values['generations'].replace(',', ''))){
			validPopBottleneck = false; 
		}
		if(parseFloat(values['generation-to-override-upper'].replace(',', '')) > parseFloat(values['generations'].replace(',', ''))){
			validPopBottleneck = false; 
		}
		
		if(validPopBottleneck){
			$("#population-control .error").html("");
		}
		else{
			$("#population-control .error").html("Make sure you entered generations numbers that don't exceed the actual number of generations!");
		}
	}

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
    updateLegend(values);

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
