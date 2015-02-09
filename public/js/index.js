$(document).ready(function() {
    var chart; //This is the chart that holds the data

    

    if ($("#main").hasClass("page-home")) {
        
    	//Automatically select all the text when they click on an input 
        $("input[type='text']").on("click", function() {
            $(this).select(); 
        });

        $('[data-toggle="tooltip"]').tooltip(); //Opt in to tooltips 

        /***********SLIDER CONFIGURATION (MOVE TO A CONFIG FILE)***********/
	        /*****************POPULATION SLIDER*****************/
	        $("#population-size-slider").noUiSlider({
	            start: [500],
	            step: 1,
	            connect: "lower",
	            range: {
	                'min': [1],
	                'max': [10000]
	            },
	            format: wNumb({
	                decimals: 0,
	                thousand: ','
	            })
	        });

	        $("#population-size-slider").Link('lower').to($("#population-size"));
	        // $("#population-size-slider").addClass("active"); //Active by default
	        $("#population-size-slider").on('slide', activatePopulationSlider);
	        $("#population-size-slider").on('change', activatePopulationSlider);
	        $("#population-size-slider").on('set', activatePopulationSlider);

	        /*****************END POPULATION SLIDER*****************/

	        /*****************GENERATIONS SLIDER*****************/
	        $("#generations-slider").noUiSlider({
	            start: [500],
	            step: 1,
	            connect: "lower",
	            range: {
	                'min': [1],
	                'max': [10000]
	            },
	            format: wNumb({
	                decimals: 0,
	                thousand: ','
	            })
	        });

	        $("#generations-slider").Link('lower').to($("#generations"));
	        $("#generations-slider").addClass("active"); //Active by default

	        $("#generations-slider").on('slide', activateGenerationsSlider);
	        $("#generations-slider").on('change', activateGenerationsSlider);
	        $("#generations-slider").on('set', activateGenerationsSlider);
	        /*****************END GENERATIONS SLIDER*****************/




	        /*****************STARTING ALLELE FREQ SLIDER********************/
	        $("#starting-allele-frequency-slider").noUiSlider({
	            start: [.5],
	            step: .0001,
	            connect: "lower",
	            range: {
	                'min': [0],
	                'max': [1]
	            },
	            format: wNumb({
	                decimals: 4,
	                thousand: ','
	            })
	        });

	        $("#starting-allele-frequency-slider").Link('lower').to($("#starting-allele-frequency"));
	        $("#starting-allele-frequency-slider").addClass("active"); //Active by default
	        /*****************END STARTING ALLELE FREQ SLIDER*****************/

	        /*****************Fitness Coeficcient WAA********************/
	        $("#fitness-coefficient-wAA-slider").noUiSlider({
	            start: [1],
	            step: .0001,
	            connect: "lower",
	            range: {
	                'min': [0],
	                'max': [1]
	            },
	            format: wNumb({
	                decimals: 4,
	                thousand: ','
	            })
	        });

	        $("#fitness-coefficient-wAA-slider").Link('lower').to($("#fitness-coefficient-wAA"));

	        //Activate the slider if it was slide, changed or manually set
	        $("#fitness-coefficient-wAA-slider").on('slide', activateFitnessCoefSlider);
	        $("#fitness-coefficient-wAA-slider").on('change', activateFitnessCoefSlider);
	        $("#fitness-coefficient-wAA-slider").on('set', activateFitnessCoefSlider);
	        /*****************Fitness Coeficcient WAA*****************/

	        /*****************Fitness Coeficcient WAa********************/
	        $("#fitness-coefficient-wAa-slider").noUiSlider({
	            start: [1],
	            step: .0001,
	            connect: "lower",
	            range: {
	                'min': [0],
	                'max': [1]
	            },
	            format: wNumb({
	                decimals: 4,
	                thousand: ','
	            })
	        });

	        $("#fitness-coefficient-wAa-slider").Link('lower').to($("#fitness-coefficient-wAa"));

	        //Activate the slider if it was slide, changed or manually set
	        $("#fitness-coefficient-wAa-slider").on('slide', activateFitnessCoefSlider);
	        $("#fitness-coefficient-wAa-slider").on('change', activateFitnessCoefSlider);
	        $("#fitness-coefficient-wAa-slider").on('set', activateFitnessCoefSlider);
	        /*****************Fitness Coeficcient WAa*****************/

	        /*****************Fitness Coeficcient Waa********************/
	        $("#fitness-coefficient-waa-slider").noUiSlider({
	            start: [1],
	            step: .0001,
	            connect: "lower",
	            range: {
	                'min': [0],
	                'max': [1]
	            },
	            format: wNumb({
	                decimals: 4,
	                thousand: ','
	            })
	        });

	        $("#fitness-coefficient-waa-slider").Link('lower').to($("#fitness-coefficient-waa"));

	        //Activate the slider if it was slide, changed or manually set
	        $("#fitness-coefficient-waa-slider").on('slide', activateFitnessCoefSlider);
	        $("#fitness-coefficient-waa-slider").on('change', activateFitnessCoefSlider);
	        $("#fitness-coefficient-waa-slider").on('set', activateFitnessCoefSlider);
	        /*****************Fitness Coeficcient Waa*****************/

	        /*****************selection-coefficient********************/
	        $("#selection-coefficient-slider").noUiSlider({
	            start: [0],
	            step: .0001,
	            connect: "lower",
	            range: {
	                'min': [0],
	                'max': [1]
	            },
	            format: wNumb({
	                decimals: 4,
	                thousand: ','
	            })
	        });

	        $("#selection-coefficient-slider").Link('lower').to($("#selection-coefficient"));

	        //Activate the slider if it was slide, changed or manually set
	        $("#selection-coefficient-slider").on('slide', activateSelectionDomSlider);
	        $("#selection-coefficient-slider").on('change', activateSelectionDomSlider);
	        $("#selection-coefficient-slider").on('set', activateSelectionDomSlider);
	        /*****************selection-coefficient****************/

	        /*****************dominance-coefficient********************/
	        $("#dominance-coefficient-slider").noUiSlider({
	            start: [1],
	            step: .0001,
	            connect: "lower",
	            range: {
	                'min': [0],
	                'max': [1]
	            },
	            format: wNumb({
	                decimals: 4,
	                thousand: ','
	            })
	        });

	        $("#dominance-coefficient-slider").Link('lower').to($("#dominance-coefficient"));

	        //Activate the slider if it was slide, changed or manually set
	        $("#dominance-coefficient-slider").on('slide', activateSelectionDomSlider);
	        $("#dominance-coefficient-slider").on('change', activateSelectionDomSlider);
	        $("#dominance-coefficient-slider").on('set', activateSelectionDomSlider);
	        /*****************dominance-coefficient****************/

	        /*****************Mutation rate mu********************/
	        $("#mutation-rate-mu-slider").noUiSlider({
	            start: [0],
	            step: .00001, //PROBLEM HERE
	            connect: "lower",
	            range: {
	                'min': [0],
	                'max': [9.99999]
	            },
	            format: wNumb({
	                decimals: 5, //Assuming 10^-3
	                thousand: ','
	            })
	        });

	        $("#mutation-rate-mu-slider").Link('lower').to($("#mutation-rate-mu"));

	        //Activate the slider if it was slide, changed or manually set
	        $("#mutation-rate-mu-slider").on('slide', activateMutationSlider);
	        $("#mutation-rate-mu-slider").on('change', activateMutationSlider);
	        $("#mutation-rate-mu-slider").on('set', activateMutationSlider);
	        /*****************mutation rate mu****************/

	        /*****************mutation rate nu********************/
	        $("#mutation-rate-nu-slider").noUiSlider({
	            start: [0],
	            step: .00001, //PROBLEM HERE
	            connect: "lower",
	            range: {
	                'min': [0],
	                'max': [9.99999]
	            },
	            format: wNumb({
	                decimals: 5, //Assuming 10^-3
	                thousand: ','
	            })
	        });

	        $("#mutation-rate-nu-slider").Link('lower').to($("#mutation-rate-nu"));

	        //Activate the slider if it was slide, changed or manually set
	        $("#mutation-rate-nu-slider").on('slide', activateMutationSlider);
	        $("#mutation-rate-nu-slider").on('change', activateMutationSlider);
	        $("#mutation-rate-nu-slider").on('set', activateMutationSlider);
	        /*****************mutation rate nu****************/


	        /*****************Migration Rate********************/
	        $("#migration-rate-slider").noUiSlider({
	            start: [0],
	            step: .0001,
	            connect: "lower",
	            range: {
	                'min': [0],
	                'max': [1]
	            },
	            format: wNumb({
	                decimals: 4,
	                thousand: ','
	            })
	        });

	        $("#migration-rate-slider").Link('lower').to($("#migration-rate"));

	        //Activate the slider if it was slide, changed or manually set
	        $("#migration-rate-slider").on('slide', activateMigrationSlider);
	        $("#migration-rate-slider").on('change', activateMigrationSlider);
	        $("#migration-rate-slider").on('set', activateMigrationSlider);
	        /*****************Migration Rate****************/

	        /*****************Migrant Allele Frequency********************/
	        $("#migrant-allele-frequency-slider").noUiSlider({
	            start: [.5],
	            step: .0001,
	            connect: "lower",
	            range: {
	                'min': [0],
	                'max': [1]
	            },
	            format: wNumb({
	                decimals: 4,
	                thousand: ','
	            })
	        });

	        $("#migrant-allele-frequency-slider").Link('lower').to($("#migrant-allele-frequency"));

	        //Activate the slider if it was slide, changed or manually set
	        $("#migrant-allele-frequency-slider").on('slide', activateMigrationSlider);
	        $("#migrant-allele-frequency-slider").on('change', activateMigrationSlider);
	        $("#migrant-allele-frequency-slider").on('set', activateMigrationSlider);
	        /*****************Migrante Allele Frequency****************/

	        /*****************Migrant Allele Frequency********************/
	        $("#inbreeding-coefficient-slider").noUiSlider({
	            start: [0],
	            step: .0001,
	            connect: "lower",
	            range: {
	                'min': [0],
	                'max': [1]
	            },
	            format: wNumb({
	                decimals: 4,
	                thousand: ','
	            })
	        });

	        $("#inbreeding-coefficient-slider").Link('lower').to($("#inbreeding-coefficient"));

	        //Activate the slider if it was slide, changed or manually set
	        $("#inbreeding-coefficient-slider").on('slide', activateInbreedingSlider);
	        $("#inbreeding-coefficient-slider").on('change', activateInbreedingSlider);
	        $("#inbreeding-coefficient-slider").on('set', activateInbreedingSlider);

	        /*****************Migrante Allele Frequency****************/

	        /*****************Migrant Allele Frequency********************/
	        $("#positive-assortative-mating-slider").noUiSlider({
	            start: [0],
	            step: .0001,
	            connect: "lower",
	            range: {
	                'min': [0],
	                'max': [1]
	            },
	            format: wNumb({
	                decimals: 4,
	                thousand: ','
	            })
	        });

	        $("#positive-assortative-mating-slider").Link('lower').to($("#positive-assortative-mating"));

	        //Activate the slider if it was slide, changed or manually set
	        $("#positive-assortative-mating-slider").on('slide', activateAssortativeMating);
	        $("#positive-assortative-mating-slider").on('change', activateAssortativeMating);
	        $("#positive-assortative-mating-slider").on('set', activateAssortativeMating);
	        /*****************Migrante Allele Frequency****************/

	        /*****************Population Bottleneck********************/

	        $("#generation-to-override-slider").noUiSlider({
	            start: [500, 5000],
	            step: 1,
	            connect: true,
	            range: {
	                'min': [1],
	                'max': [10000]
	            },
	            format: wNumb({
	                decimals: 0,
	                thousand: ','
	            })
	        });

	    	$("#generation-to-override-slider").Link('lower').to($("#generation-to-override-lower"));
	    	$("#generation-to-override-slider").Link('upper').to($("#generation-to-override-upper"));

	        //Activate the slider if it was slide, changed or manually set
	        $("#generation-to-override-slider").on('slide', activatePopulationControl);
	        $("#generation-to-override-slider").on('change', activatePopulationControl);
	        $("#generation-to-override-slider").on('set', activatePopulationControl);
	        /*****************Population Bottleneck****************/

	        /*****************Population Bottleneck********************/
	        $("#new-population-size-slider").noUiSlider({
	            start: [5000],
	            step: 1,
	            connect: "lower",
	            range: {
	                'min': [1],
	                'max': [10000]
	            },
	            format: wNumb({
	                decimals: 0,
	                thousand: ','
	            })
	        });

	    	$("#new-population-size-slider").Link('lower').to($("#new-population-size"));

	        //Activate the slider if it was slide, changed or manually set
	        $("#new-population-size-slider").on('slide', activatePopulationControl);
	        $("#new-population-size-slider").on('change', activatePopulationControl);
	        $("#new-population-size-slider").on('set', activatePopulationControl);
	        /*****************Population Bottleneck****************/




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

    /***********SLIDER CONFIGURATION (MOVE TO A CONFIG FILE)***********/


        /*********************************************************CANVAS JS CONFIG********************************************************/
        if ($('#graph-canvas').length) {
            //Build data for canvasjs
            var data = [];
            var dataSeries = {
                type: "line",
                color: "rgba(255, 255, 255, 0.75)"
            };
            var dataPoints = [];
            for (var i = 0; i < 1; i++) {
                dataPoints.push({
                    x: i,
                    y: 0
                });
            }
            dataSeries.dataPoints = dataPoints;
            data.push(dataSeries);


            chart = new CanvasJS.Chart("graph-canvas", {
                zoomEnabled: true,
                exportEnabled: true,
                backgroundColor: "rgba(200, 54, 54, 0.0)",
                title: {
                    text: "",
                    fontColor: "rgba(255, 255, 255, 0.8)",
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    fontWeight: 300
                },
                axisX: {
                    title: "Generation",
                    titleFontColor: "white", 
                    // titleFontSize: 22, //Automatically calculated for responsive design
                    labelFontColor: "rgba(255, 255, 255, 0.2)",
                    labelFontSize: 14,
                    labelAngle: 0,
                    gridThickness: 1,
                    gridColor: "rgba(255, 255, 255, 0.2)",
                    lineColor: "rgba(255, 255, 255, 0.2)",
                    tickColor: "rgba(255, 255, 255, 0.2)"
                },
                axisY: {
                    title: "Frequency of the A allele", 
                    titleFontColor: "white",
                    // titleFontSize: 22, //Automatically calculated for responsive design
                    labelFontColor: "rgba(255, 255, 255, 0.2)",
                    minimum: 0,
                    maximum: 1,
                    labelFontSize: 14,
                    includeZero: false,
                    gridThickness: 1,
                    gridColor: "rgba(255, 255, 255, 0.2)",
                    lineColor: "rgba(255, 255, 255, 0.2)",
                    tickColor: "rgba(255, 255, 255, 0.2)"
                },
                data: data
            });

            chart.render();


        }
        /*********************************************************CANVAS JS********************************************************/


        //Handle the submit clicking
        $("#newGraph").on("click", function(event) {
        	formHandler(chart, "newGraph");
        }); 

        $("#addLine").on("click", function(event) {
        	formHandler(chart, "addLine");
        }); 

        //Handle clicking printerfriendly 
        $("#printerFriendly").on("click", function(event) {
        	 event.preventDefault();
        	printerFriendly(chart);
        }); 

        //Handle clicking screenFreindly  
        $("#screenFriendly").on("click", function(event) {
        	 event.preventDefault();
        	screenFriendly(chart);
        }); 

        //Handle clicking printerfriendly 
        $("#getRawData").on("click", function(event) {
        	 event.preventDefault();
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



})


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
    if(chart.printerFriendly === true){
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
 *	These functions checks to see if the current slider has been moved yet. Once it is moved change the color of
 *	the slider to the primary color from the inactive color (grayed-out most likely).
 *
 *	TODO: Check the values to make it inactive if the appropriate values are set
 */
function activateGenerationsSlider(){
	//Validate the generation override slider to make sure the new generation number doesn't conflict 
	validateGenOverride();
}

function activatePopulationSlider(){
	$("#population-size-slider").addClass("active");

	//No longer infinite sample size
}

function activateFitnessCoefSlider() {
    //Make these active 
    $("#fitness-coefficient-waa-slider").addClass("active");
    $("#fitness-coefficient-wAa-slider").addClass("active");
    $("#fitness-coefficient-wAA-slider").addClass("active");

    //Make these inactive (Only one or the other can be active)
    $("#selection-coefficient-slider").removeClass("active");
    $("#dominance-coefficient-slider").removeClass("active");

    //Update the activator icon
    $("#selection-variables .variable-activator").removeClass("fa-square-o");
    $("#selection-variables .variable-activator").addClass("fa-check-square-o");
}

function activateSelectionDomSlider() {
    //Make these active 
    $("#selection-coefficient-slider").addClass("active");
    $("#dominance-coefficient-slider").addClass("active");

    //Make these inactive (Only one or the other can be active)
    $("#fitness-coefficient-waa-slider").removeClass("active");
    $("#fitness-coefficient-wAa-slider").removeClass("active");
    $("#fitness-coefficient-wAA-slider").removeClass("active");

    //Update the activator icon
    $("#selection-variables .variable-activator").removeClass("fa-square-o");
    $("#selection-variables .variable-activator").addClass("fa-check-square-o");
}

function activateMutationSlider() {
    //Make these active 
    $("#mutation-rate-mu-slider").addClass("active");
    $("#mutation-rate-nu-slider").addClass("active");

    //Update the activator icon
    $("#mutation-variables .variable-activator").removeClass("fa-square-o");
    $("#mutation-variables .variable-activator").addClass("fa-check-square-o");
}

function activateMigrationSlider() {
    //Make these active 
    $("#migration-rate-slider").addClass("active");
    $("#migrant-allele-frequency-slider").addClass("active");

    //Update the activator icon
    $("#migration-variables .variable-activator").removeClass("fa-square-o");
    $("#migration-variables .variable-activator").addClass("fa-check-square-o");
}

function activateInbreedingSlider() {
    //Make these active
    $("#inbreeding-coefficient-slider").addClass("active");

   	//Update the activator icon
    $("#inbreeding-variables .variable-activator").removeClass("fa-square-o");
    $("#inbreeding-variables .variable-activator").addClass("fa-check-square-o");

}

function activateAssortativeMating() {
    //Make these active 
    $("#positive-assortative-mating-slider").addClass("active");

    //Update the activator icon
    $("#assortative-mating .variable-activator").removeClass("fa-square-o");
    $("#assortative-mating .variable-activator").addClass("fa-check-square-o");
}

//Instead of validating use http://refreshless.com/nouislider/more/ allowing you to rebuild the slider after initializing 
function activatePopulationControl(){
	$("#generation-to-override-slider").addClass("active");
	$("#new-population-size-slider").addClass("active");

	//Update the activator icon
	$("#population-control .variable-activator").removeClass("fa-square-o");
    $("#population-control .variable-activator").addClass("fa-check-square-o");

	//Validate here 
	validateGenOverride();
}

//Deactive the correct sliders based on what checkmark was clicked 
function deactiveActiveOnCheckmark(variableSectionId, state){
	if(variableSectionId == "selection-variables"){
		//Needs to be more intelligent 
		if(state =="unchecked"){
			$("#selection-coefficient-slider").removeClass("active");
    		$("#dominance-coefficient-slider").removeClass("active");
    		$("#fitness-coefficient-waa-slider").removeClass("active");
    		$("#fitness-coefficient-wAa-slider").removeClass("active");
    		$("#fitness-coefficient-wAA-slider").removeClass("active");
		}
	}
	else if(variableSectionId == "population-variable"){
		$("#population-size-slider").toggleClass("active");
	}
	else if(variableSectionId == "mutation-variables"){
		$("#mutation-rate-mu-slider").toggleClass("active");
    	$("#mutation-rate-nu-slider").toggleClass("active");
	}
	else if(variableSectionId == "migration-variables"){
		$("#migration-rate-slider").toggleClass("active");
    	$("#migrant-allele-frequency-slider").toggleClass("active");
	}
	else if(variableSectionId == "assortative-mating"){
    	$("#positive-assortative-mating-slider").toggleClass("active");
	}
	else if(variableSectionId == "inbreeding-variables"){
    	$("#inbreeding-coefficient-slider").toggleClass("active");
	}
	else if(variableSectionId == "population-control"){
		$("#generation-to-override-slider").toggleClass("active");
		$("#new-population-size-slider").toggleClass("active");
	}
}

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
