/**
 *	General HTML utilites and DOM manipulations 
 *
 */
popGen.htmlutil = popGen.htmlutil || {
	debug: this.debug, 
	localStore: null, //Needs to be checked then maintained to avoid future checks 
};

popGen.htmlutil.genDOM = popGen.htmlutil.genDOM || {
	debug: this.debug
};

// popGen.htmlutil.chartDOM = popGen.htmlutil.chartDOM || {};

popGen.htmlutil.sliderDOM = popGen.htmlutil.sliderDOM || {
	debug: this.debug
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
	this.genDOM.legendHandler("#multiple-legends-container"); 
	this.genDOM.graphButtonHandler(); 
	this.genDOM.graphExportHandler();
	this.genDOM.activateVelocityVariableSection();
	this.genDOM.bulkSectionOpener(); 
	this.genDOM.activateHelpSections(); 
	this.genDOM.home.iconHandler(); 
	this.genDOM.home.userConfig();
	this.genDOM.activateLeanModal(); 
};

popGen.htmlutil.initFAQ = function(){
	this.genDOM.activateToolTips(false);
};

/**
 * [smoothScrolling description]
 * 
 */
popGen.htmlutil.smoothScrolling = function(){
    $('a[href^="#"]').not('.accordion-toggle').on('click', function(e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function() {
            window.location.hash = target;
        });
    });
};



/*DOM*/

/**
 * Activate the velocity plugin for the variable secions contained in all 
 * of the graphs. 
 */
popGen.htmlutil.genDOM.activateVelocityVariableSection = function(){
	$.each( $('.variable-section-toggle'), function( key, value ) {
		 value = $(value); 
		 var container =  value.parent().next().next();
		 var check = value.parent().find('.fa').not('.fa-chevron-down').not('.fa-chevron-up').not('.fa-default'); 

		 popGen.velocity.verticalSlideSection(value, container, 'easeOutCirc', 300);
		 popGen.velocity.verticalSlideSectionCheck(check, container, 'easeOutCirc', 300);


		 popGen.velocity.sections.push(container); 
	});



};

/**
 * Activate the velocity plugin for the help section contained for each variable. 
 * 
 */
popGen.htmlutil.genDOM.activateHelpSections = function(){


	//Show All help button
	$("#all-help").click(function(event) {
	    event.preventDefault();
	    if ($(this).html() == "[Show Help]"){
	    	 popGen.velocity.showAllHelp();
	    	 $(this).html("[Hide Help]");
	    }
	    else{
	    	popGen.velocity.hideAllHelp();
	    	$(this).html("[Show Help]");
	    }
	});


	$.each( $('.variable label a'), function( key, value ) {
		value = $(value);
		var container = value.parent().next();
		popGen.velocity.verticalSlideSection(value, container, 'easeOutCirc', 300);
		popGen.velocity.help_sections.push(container);
	});

};

/**
 * If there is an active class the chevron should point up. 
 * @param  JQuery element Element that either does or doesn;t have active class 
 * @return Boolean check        the check was the item pressed 
 */
popGen.htmlutil.genDOM.checkSections = function(element, checkItem){
	checkItem = typeof checkItem !== 'undefined' ? checkItem : false;

	var chevron = element.find('.fa');
	var check = element.parent().find('.fa').not('.fa-chevron-down').not('.fa-chevron-up').not('.fa-default');

	if(element.hasClass('active')){
		chevron.removeClass('fa-chevron-down');
    	chevron.addClass('fa-chevron-up');
	}
	else{
		chevron.removeClass('fa-chevron-up');
    	chevron.addClass('fa-chevron-down');
	}

	if(checkItem === true){
		if(check.hasClass('fa-check-square-o')){
			check.removeClass('fa-check-square-o').addClass('fa-square-o');
    		popGen.config.noUISlider.deactiveActiveOnCheckmark(check.parent().parent().parent().attr('id'),'unchecked');
		}
		else if(check.hasClass('fa-square-o')){
			check.removeClass('fa-square-o').addClass('fa-check-square-o');
    		popGen.config.noUISlider.deactiveActiveOnCheckmark(check.parent().parent().parent().attr('id'), 'checked');
		}
	}
};

/**
 * 	Activate tooltips 
 *      
 *  @param {boolean} activate all tool tips (including modal workaround)
 */
popGen.htmlutil.genDOM.activateToolTips = function(all){
	$('[data-toggle="tooltip"]').tooltip(); //Opt in to bootstrap tooltips 
    if(all)$('[data-tooltip="true"]').tooltip(); //Workaround for modal &tooltip MIGHT BE ABLE TO CHANGET THIS 
};

/**
 * 	Auto-highlight 
 *      
 */
 popGen.htmlutil.genDOM.autoHighlight = function(){
 	//Automatically select all the text when they click on an input 
    $("input[type='text']").on("click", function() {
        $(this).select(); 
    });
};

/**
 * [bulkSectionOpener description]
 * @return {[type]} [description]
 */
popGen.htmlutil.genDOM.bulkSectionOpener = function(){
	$("#all-sections").click(function(event) {
	    event.preventDefault();

	    if ($(this).html() == '[Open All]'){
	    	 popGen.velocity.showAll(); 
	    	 $(this).html("[Close All]");
	    }
	    else{
	    	popGen.velocity.hideAll(); 
	    	$(this).html("[Open All]");
	    }
	});
};

/**
 * [validatorURL description]
 * @return {[type]} [description]
 */
popGen.htmlutil.genDOM.validatorURL = function(){
	var root = popGen.htmlutil.getRootURL();
	$('.html-validator').attr('href', 'http://validator.w3.org/check?uri=' + root)
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
 *	Saving JPG/PNG background changer
 *
 */
popGen.htmlutil.genDOM.graphExportHandler = function(){
	$(".canvasjs-chart-toolbar div div").on("click", function(event) {
    	event.preventDefault();
    }); 

}


/**
 * 	Bind helper text (hard coded for home page)
 *      
 */
popGen.htmlutil.genDOM.home.helperText = function(){

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
		if(localStorage.getItem("layout") === "contrast"){
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
popGen.htmlutil.genDOM.activateLeanModal = function(){
	// $('.modal-trigger').leanModal();
	$('#getLink').leanModal();
	$('#graph-computing-modal').leanModal();
};

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


/**
 * Get the base URL of the current page. If you are on 'http://melwood.jcubedworld.com/baseball/?type=dog'
 * 	'http://melwood.jcubedworld.com' will be returned. The protocal and domain will be returned. 
 * 
 * @return {String} The base URL of the current page including the protocal. 
 */
popGen.htmlutil.getRootURL = function() {
	if (!location.origin) location.origin = location.protocol + "//" + location.host;
	return location.origin;
};


/**
 * Change the Canvas JS button to the fontawesome icon sets
 * @return {[type]} [description]
 */
popGen.htmlutil.updateCanvasMenu = function(){
	var toolbar = ".canvasjs-chart-toolbar";
	var html_download = "<i class='fa fa-download'></i>";
	var html_reset = "<i class='fa fa-refresh'></i>";
	var html_pan = "<i class='fa fa-arrows'></i>";
	var html_zoom = "<i class='fa fa-search'></i>";

	//Switch the initial items
	if($(toolbar).length){
		$(toolbar + " button[state='menu']").html(html_download); 
		$(toolbar + " button[state='reset']").html(html_reset); 
		$(toolbar + " button[state='pan']").html(html_pan); 
		$(toolbar + " button[state='zoom']").html(html_zoom); 
	}

	//Switch pan and zoom after they are added 
	var $toolbar = $(toolbar);
	if($toolbar.length){
		$toolbar.click(function(){
			$(toolbar + " button[state='zoom']").html(html_zoom); 
			$(toolbar + " button[state='pan']").html(html_pan); 
		});
	}

	//Hide their logo
	$('.canvasjs-chart-credit').hide();
};

