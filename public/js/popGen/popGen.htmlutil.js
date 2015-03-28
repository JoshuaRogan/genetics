/**
 *	General HTML utilites and DOM manipulations 
 *
 */
var popGen = popGen || {};
popGen.htmlutil = popGen.htmlutil || {
	debug: true, 
	localStore: null, 
};

popGen.htmlutil.genDOM = popGen.htmlutil.genDOM || {
	debug: true
};

//Home page specific 
popGen.htmlutil.genDOM.home = popGen.htmlutil.genDOM.home || {};
popGen.htmlutil.genDOM.faq = popGen.htmlutil.genDOM.faq || {};

popGen.htmlutil.chartDOM = popGen.htmlutil.chartDOM || {
	debug: true
};

popGen.htmlutil.sliderDOM = popGen.htmlutil.sliderDOM || {
	debug: true
};

popGen.htmlutil.debugData = function(){
	console.log(this);  
}

popGen.htmlutil.initHome = function(){
	this.genDOM.activateToolTips(true); 
	this.genDOM.autoHighlight(); 
	this.genDOM.home.helperText(); 
	this.genDOM.sectionHandler(); 
	this.genDOM.legendHandler("#multiple-legends-container"); 
	this.genDOM.graphButtonHandler(); 
	this.genDOM.home.iconHandler(); 
}

popGen.htmlutil.initFAQ = function(){
	this.genDOM.activateToolTips(false);
}








/*DOM*/

/**
 * 	Activate tooltips 
 *      
 *  @param {boolean} activate all tool tips (including modal workaround)
 */
popGen.htmlutil.genDOM.activateToolTips = function(all){
	$('[data-toggle="tooltip"]').tooltip(); //Opt in to bootstrap tooltips 
    if(all)$('[data-tooltip="true"]').tooltip(); //Workaround for modal &tooltip MIGHT BE ABLE TO CHANGET THIS 
}

/**
 * 	Auto-highlight 
 *      
 */
 popGen.htmlutil.genDOM.autoHighlight = function(){
 	//Automatically select all the text when they click on an input 
    $("input[type='text']").on("click", function() {
        $(this).select(); 
    });
}





/**
 *	Hanldes the opening and closes of the variable sections 
 *
 */
popGen.htmlutil.genDOM.sectionHandler = function(){
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


	//Active Sections TOO HACKY 
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
}

/**	
 *	Handle displaying of the legend 
 *
 */
popGen.htmlutil.genDOM.legendHandler = function(selector){
	$(selector).on('click', ".togglelegend", function(event) {
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
}

popGen.htmlutil.genDOM.graphButtonHandler = function(){
    //Handle the submit clicking
    $("#newGraph").on("click", function(event) {
    	var chart = $("#graph-canvas").CanvasJSChart(); 
    	formHandler(chart, "newGraph");
    }); 

    $("#addLine").on("click", function(event) {
    	var chart = $("#graph-canvas").CanvasJSChart(); 
    	formHandler(chart, "addLine");
    }); 
}








/**
 * 	Bind helper text (hard coded for home page)
 *      
 */
popGen.htmlutil.genDOM.home.helperText = function(){
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
}


popGen.htmlutil.genDOM.home.iconHandler = function(){
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
}

/*END DOM*/


/*Misc. Functions*/

/** 
 *	Returns a random integer between min (included) and max (excluded)
 *	Using Math.round() will give you a non-uniform distribution!
 */
popGen.htmlutil.getRandomInt = function(min,max){
	return Math.floor(Math.random() * (max - min)) + min;
}