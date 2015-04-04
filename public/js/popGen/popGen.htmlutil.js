/**
 *	General HTML utilites and DOM manipulations 
 *
 */
var popGen = popGen || {};
popGen.htmlutil = popGen.htmlutil || {
	debug: true, 
	localStore: null, //Needs to be checked then maintained to avoid future checks 
};

popGen.htmlutil.genDOM = popGen.htmlutil.genDOM || {
	debug: true
};

// popGen.htmlutil.chartDOM = popGen.htmlutil.chartDOM || {};

popGen.htmlutil.sliderDOM = popGen.htmlutil.sliderDOM || {
	debug: true
};

//Page Specific 
popGen.htmlutil.genDOM.home = popGen.htmlutil.genDOM.home || {};
popGen.htmlutil.genDOM.faq = popGen.htmlutil.genDOM.faq || {};

popGen.htmlutil.debugData = function(){
	console.log(this);  
}

popGen.htmlutil.initHome = function(){
	this.genDOM.activateToolTips(true); 
	this.genDOM.autoHighlight(); 
	this.genDOM.sectionHandler(); 
	this.genDOM.legendHandler("#multiple-legends-container"); 
	this.genDOM.graphButtonHandler(); 
	
	this.genDOM.home.helperText(); 
	this.genDOM.home.iconHandler(); 
	this.genDOM.home.userConfig(); 
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
		popGen.config.noUISlider.deactiveActiveOnCheckmark(parentDiv.attr('id'), state);
		
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

/**	
 *	Handle the graphing buttons 
 *
 */
popGen.htmlutil.genDOM.graphButtonHandler = function(){
    //Handle the submit clicking
    $("#newGraph").on("click", function(event) {
    	var chart = $("#graph-canvas").CanvasJSChart(); 
    	popGen.htmlutil.chartDOM.formHandler(chart, "newGraph");
    }); 

    $("#addLine").on("click", function(event) {
    	var chart = $("#graph-canvas").CanvasJSChart(); 
    	popGen.htmlutil.chartDOM.formHandler(chart, "addLine");
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


/**
 * 	Bind helper text (hard coded for home page)
 *      
 */
popGen.htmlutil.genDOM.home.iconHandler = function(){
    


    //Handle clicking printerfriendly icon
    $("#printerFriendly").on("click", function(event) {
    	event.preventDefault();
    	popGen.htmlutil.chartDOM.highContrastMode();
    	$("#screenFriendly").removeClass('hidden'); 
    	$("#printerFriendly").addClass('hidden'); 
    }); 

    //Handle clicking screenFreindly icon
    $("#screenFriendly").on("click", function(event) {
    	event.preventDefault(); 
    	popGen.htmlutil.chartDOM.defaultLayout();
    	$("#printerFriendly").removeClass('hidden'); 
    	$("#screenFriendly").addClass('hidden');
    }); 

    //Handle clicking printerfriendly icon
    $("#getRawData").on("click", function(event) {
    	event.preventDefault();
    	popGen.htmlutil.chartDOM.getRawData(); 
    });     

    //Handle the get bookmark link icon 
    $("#getLink").on("click", function(event) {
    	event.preventDefault();
    	var url = popGen.htmlutil.chartDOM.genBookmarkLink(); 
    	$("#bookmark-link .bookmark-link").html(url); 
    	$("#bookmark-link .bookmark-link").attr("href", url);
    }); 


}


/**
 * 	Check the local store for any settings to activate 
 *      
 */
popGen.htmlutil.genDOM.home.userConfig = function(){
	if(popGen.htmlutil.supportsHTML5LocalStorage()){
		//Change to correct layout 
		if(localStorage.getItem("layout") == "contrast"){
		    popGen.htmlutil.chartDOM.highContrastMode();
		    $("#printerFriendly").addClass('hidden'); 
	    	$("#screenFriendly").removeClass('hidden');
		}
		else{//Default view
			$("#printerFriendly").removeClass('hidden'); 
	    	$("#screenFriendly").addClass('hidden');
		}
	}



}


/*END DOM*/


/*Misc. Functions*/
/** 
 *	Returns a random integer between min (included) and max (excluded)
 *	Using Math.round() will give you a non-uniform distribution!
 *  @param {int} min min value to generate
 *  @param {int} max max value to generate 
 */
popGen.htmlutil.getRandomInt = function(min,max){
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 *	Build an alert div returing the html string
 *  @param {String} className the type of alert: 
 *		alert-success, alert-info, alert-warning, alert-danger (From bootstrap)
 *  @param {String} message the message in the aler
 */
popGen.htmlutil.buildAlert = function(className, message){
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


 /**
 *	Able to pass arguments as a parameter 
 *	Source: http://stackoverflow.com/questions/321113/how-can-i-pre-set-arguments-in-javascript-function-call-partial-function-appli
 *  @param {...}  *		
 */
popGen.htmlutil.partial = function(func /*, 0..n args */) {
	var args = Array.prototype.slice.call(arguments, 1);
	return function() {
		var allArguments = args.concat(Array.prototype.slice.call(arguments));
		return func.apply(this, allArguments);
	};
}



 /**
 *	Determines if local storage is avaible for this user 
 *	
 *  	
 */
popGen.htmlutil.supportsHTML5LocalStorage = function(func /*, 0..n args */) {
	  try {
	    return 'localStorage' in window && window['localStorage'] !== null;
	  } catch (e) {
	    return false;
	  }
}
