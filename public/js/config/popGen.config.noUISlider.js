/**
 *	TODO: Fix population bottlneck sync
 *
 */
//Namespaces
var popGen = popGen || {};
popGen.config = popGen.config || {}; 
popGen.config.noUISlider = popGen.config.noUISlider || {
	debug: false, 
	selectors: { //Not currenlty using or probably useful
		populationSize: {
			slider: "#population-size-slider",
			input: 	"#population-size"
		}

	}

}

/**
 * 	Initialize all of the sliders
 *      
 *  @param {string} selector JQuery selctor for the slider element 
 */
popGen.config.noUISlider.initSliders = function(selector){


	//Initalize each slider
	this.initPopulationSlider(this.selectors);
	this.initGenerationSlider(this.selectors);
	this.initStartingFreqSlider(this.selectors);	
	this.initwAASlider(this.selectors);
	this.initwAaSlider(this.selectors);
	this.initwaaSlider(this.selectors);
	this.initSelectionSlider(this.selectors);
	this.initDominanceSlider(this.selectors);
	this.initMUSlider(this.selectors);
	this.initNUSlider(this.selectors);
	this.initMigrationSlider(this.selectors);
	this.initMigrantAlleleSlider(this.selectors);
	this.initInbreedingSlider(this.selectors);
	this.initAssortMatingSlider(this.selectors);
	this.initBottleNeckGensSlider(this.selectors);
	this.initBottleNeckPopSlider(this.selectors);
	this.initBatchSlider(this.selectors);


	this.addBookmarkValues();
}

popGen.config.noUISlider.debugData = function(){
	console.log(this); 
}



/**
 * 	Individual funtions to initalize sliders
 *      
 *  @param {string} selector JQuery selctor for the slider element 
 */

 popGen.config.noUISlider.initPopulationSlider = function(selector){
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
	$("#population-size-slider").on('slide', this.activatePopulationSlider);
	$("#population-size-slider").on('change', this.activatePopulationSlider);
	$("#population-size-slider").on('set', this.activatePopulationSlider);
 }

popGen.config.noUISlider.initGenerationSlider = function(selector){
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
	// $("#generations-slider").Link('lower').to($("#generation-to-override-upper"));
	$("#generations-slider").addClass("active"); //Active by default

	$("#generations-slider").on('slide', this.activateGenerationsSlider);
	$("#generations-slider").on('change', this.activateGenerationsSlider);
	$("#generations-slider").on('set', this.activateGenerationsSlider);
 }


popGen.config.noUISlider.initStartingFreqSlider = function(selector){
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
}

popGen.config.noUISlider.initwAASlider = function(selector){
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
	$("#fitness-coefficient-wAA-slider").on('slide', this.activateFitnessCoefSlider);
	$("#fitness-coefficient-wAA-slider").on('change', this.activateFitnessCoefSlider);
	$("#fitness-coefficient-wAA-slider").on('set', this.activateFitnessCoefSlider);
}

popGen.config.noUISlider.initwAaSlider = function(selector){
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
	$("#fitness-coefficient-wAa-slider").on('slide', this.activateFitnessCoefSlider);
	$("#fitness-coefficient-wAa-slider").on('change', this.activateFitnessCoefSlider);
	$("#fitness-coefficient-wAa-slider").on('set', this.activateFitnessCoefSlider);
}

popGen.config.noUISlider.initwaaSlider = function(selector){
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
	$("#fitness-coefficient-waa-slider").on('slide', this.activateFitnessCoefSlider);
	$("#fitness-coefficient-waa-slider").on('change', this.activateFitnessCoefSlider);
	$("#fitness-coefficient-waa-slider").on('set', this.activateFitnessCoefSlider);	
}

popGen.config.noUISlider.initSelectionSlider = function(selector){
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
	$("#selection-coefficient-slider").on('slide', this.activateSelectionDomSlider);
	$("#selection-coefficient-slider").on('change', this.activateSelectionDomSlider);
	$("#selection-coefficient-slider").on('set', this.activateSelectionDomSlider);
}

popGen.config.noUISlider.initDominanceSlider = function(selector){
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
	$("#dominance-coefficient-slider").on('slide', this.activateSelectionDomSlider);
	$("#dominance-coefficient-slider").on('change', this.activateSelectionDomSlider);
	$("#dominance-coefficient-slider").on('set', this.activateSelectionDomSlider);	
}

popGen.config.noUISlider.initMUSlider = function(selector){
	$("#mutation-rate-mu-slider").noUiSlider({
	    start: [0],
	    step: .00001, 
	    connect: "lower",
	    range: {
	        'min': [0],
	        'max': [9.99999]
	    },
	    format: wNumb({
	        decimals: 5, 
	        thousand: ','
	    })
	});

	$("#mutation-rate-mu-slider").Link('lower').to($("#mutation-rate-mu"));

	//Activate the slider if it was slide, changed or manually set
	$("#mutation-rate-mu-slider").on('slide', this.activateMutationSlider);
	$("#mutation-rate-mu-slider").on('change', this.activateMutationSlider);
	$("#mutation-rate-mu-slider").on('set', this.activateMutationSlider);	
}

popGen.config.noUISlider.initNUSlider = function(selector){
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
	$("#mutation-rate-nu-slider").on('slide', this.activateMutationSlider);
	$("#mutation-rate-nu-slider").on('change', this.activateMutationSlider);
	$("#mutation-rate-nu-slider").on('set', this.activateMutationSlider);
}

popGen.config.noUISlider.initMigrationSlider = function(selector){
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
	$("#migration-rate-slider").on('slide', this.activateMigrationSlider);
	$("#migration-rate-slider").on('change', this.activateMigrationSlider);
	$("#migration-rate-slider").on('set', this.activateMigrationSlider);
}

popGen.config.noUISlider.initMigrantAlleleSlider = function(selector){
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
	$("#migrant-allele-frequency-slider").on('slide', this.activateMigrationSlider);
	$("#migrant-allele-frequency-slider").on('change', this.activateMigrationSlider);
	$("#migrant-allele-frequency-slider").on('set', this.activateMigrationSlider);
}

popGen.config.noUISlider.initInbreedingSlider = function(selector){
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
	$("#inbreeding-coefficient-slider").on('slide', this.activateInbreedingSlider);
	$("#inbreeding-coefficient-slider").on('change', this.activateInbreedingSlider);
	$("#inbreeding-coefficient-slider").on('set', this.activateInbreedingSlider);
}
popGen.config.noUISlider.initAssortMatingSlider = function(selector){
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
	$("#positive-assortative-mating-slider").on('slide', this.activateAssortativeMating);
	$("#positive-assortative-mating-slider").on('change', this.activateAssortativeMating);
	$("#positive-assortative-mating-slider").on('set', this.activateAssortativeMating);	
}
popGen.config.noUISlider.initBottleNeckGensSlider = function(selector){
	$("#generation-to-override-slider").noUiSlider({
	    start: [50, 500],
	    step: 1,
	    connect: true,
	    range: {
	        'min': [1],
	        'max': [500]
	    },
	    format: wNumb({
	        decimals: 0,
	        thousand: ','
	    })
	}, true);

	$("#generation-to-override-slider").Link('lower').to($("#generation-to-override-lower"));
	$("#generation-to-override-slider").Link('upper').to($("#generation-to-override-upper"));

	//Activate the slider if it was slide, changed or manually set
	$("#generation-to-override-slider").on('slide', this.activatePopulationControl);
	$("#generation-to-override-slider").on('change', this.activatePopulationControl);
	$("#generation-to-override-slider").on('set', this.activatePopulationControl);	
}
popGen.config.noUISlider.initBottleNeckPopSlider = function(selector){
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
	$("#new-population-size-slider").on('slide', this.activatePopulationControl);
	$("#new-population-size-slider").on('change', this.activatePopulationControl);
	$("#new-population-size-slider").on('set', this.activatePopulationControl);
}

popGen.config.noUISlider.initBatchSlider = function(selector){
	$("#batch-tool-runs-slider").noUiSlider({
	    start: [3],
	    step: 1,
	    connect: "lower",
	    range: {
	        'min': [0],
	        'max': [50]
	    },
	    format: wNumb({
	        decimals: 0,
	        thousand: ','
	    })
	});

	$("#batch-tool-runs-slider").Link('lower').to($("#batch-tool-runs"));

	//Activate the slider if it was slide, changed or manually set
	$("#batch-tool-runs-slider").on('slide', this.activateBatchTool);
	$("#batch-tool-runs-slider").on('change', this.activateBatchTool);
	$("#batch-tool-runs-slider").on('set', this.activateBatchTool);
}


/**
 *	These functions checks to see if the current slider has been moved yet. Once it is moved change the color of
 *	the slider to the primary color from the inactive color (grayed-out most likely).
 *
 *	TODO: Check the values to make it inactive if the appropriate values are set
 */
popGen.config.noUISlider.activateGenerationsSlider = function(){
	popGen.config.noUISlider.validateGenOverride();
}

popGen.config.noUISlider.activatePopulationSlider = function(){
	$("#population-size-slider").addClass("active");
}

popGen.config.noUISlider.activateFitnessCoefSlider = function(){
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

popGen.config.noUISlider.activateSelectionDomSlider = function(){
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

popGen.config.noUISlider.activateMutationSlider = function(){
    //Make these active 
    $("#mutation-rate-mu-slider").addClass("active");
    $("#mutation-rate-nu-slider").addClass("active");

    //Update the activator icon
    $("#mutation-variables .variable-activator").removeClass("fa-square-o");
    $("#mutation-variables .variable-activator").addClass("fa-check-square-o");
}

popGen.config.noUISlider.activateMigrationSlider = function(){
    //Make these active 
    $("#migration-rate-slider").addClass("active");
    $("#migrant-allele-frequency-slider").addClass("active");

    //Update the activator icon
    $("#migration-variables .variable-activator").removeClass("fa-square-o");
    $("#migration-variables .variable-activator").addClass("fa-check-square-o");
}

popGen.config.noUISlider.activateInbreedingSlider = function(){
    //Make these active
    $("#inbreeding-coefficient-slider").addClass("active");

   	//Update the activator icon
    $("#inbreeding-variables .variable-activator").removeClass("fa-square-o");
    $("#inbreeding-variables .variable-activator").addClass("fa-check-square-o");
}

popGen.config.noUISlider.activateAssortativeMating = function(){
    //Make these active 
    $("#positive-assortative-mating-slider").addClass("active");

    //Update the activator icon
    $("#assortative-mating .variable-activator").removeClass("fa-square-o");
    $("#assortative-mating .variable-activator").addClass("fa-check-square-o");
}

popGen.config.noUISlider.activatePopulationControl = function(){
	$("#generation-to-override-slider").addClass("active");
	$("#new-population-size-slider").addClass("active");

	//Update the activator icon
	$("#population-control .variable-activator").removeClass("fa-square-o");
    $("#population-control .variable-activator").addClass("fa-check-square-o");
}

popGen.config.noUISlider.activateBatchTool = function(){
	//Make these active
    $("#batch-tool-runs-slider").addClass("active");

   	//Update the activator icon
    $("#batch-tool .variable-activator").removeClass("fa-square-o");
    $("#batch-tool .variable-activator").addClass("fa-check-square-o");
}






//Deactive the correct sliders based on what checkmark was clicked 
popGen.config.noUISlider.deactiveActiveOnCheckmark = function(variableSectionId, state){
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
	else if(variableSectionId == "batch-tool"){
		$("#batch-tool-runs-slider").toggleClass("active");
	}
}


/** 
 *	Make sure that the validation override doesn't exceed the the actual number of generations 
 *
 */
popGen.config.noUISlider.validateGenOverride = function(){

	//Validate here 
	var validPopBottleneck = true; 
	var values = popGen.htmlutil.chartDOM.seralizeForm($("#variables-form"));
	var numberOfGens = parseFloat(values['generations'].replace(',', '')); 

	var removeActive = false; 
	if(!$("#generation-to-override-slider").hasClass("active")){
		removeActive = true; 
	}


	$('#generation-to-override-slider').noUiSlider({
		range: {
			'min':0,
			'max': Number(numberOfGens)
		}
    }, true);

	// Class is automatically added due to the update 
	if(removeActive){
		$("#generation-to-override-slider").removeClass("active");
		$("#new-population-size-slider").removeClass("active");

		$("#population-control .variable-activator").removeClass("fa-check-square-o");
   	 	$("#population-control .variable-activator").addClass("fa-square-o");
	} 
    
}

/**
 *	Look at the hidden fields in the page and attempt to add them to the slider
 *		-Validation occurs automatically with noui slider
 */
popGen.config.noUISlider.addBookmarkValues = function(){

	var bookmarkform = $("#bookmarking-values");

	if(bookmarkform.length){
		var bookmarks = bookmarkform.serializeArray(); 
		
		//Go through each bookmark and try set the value
		for(var i=0; i<bookmarks.length; i++){
			
			if(bookmarks[i].name == "bookmarking-generations") 			$("#generations-slider").val(bookmarks[i].value);
			else if(bookmarks[i].name == "bookmarking-startfreq") 		$("#starting-allele-frequency-slider").val(bookmarks[i].value);
			else if(bookmarks[i].name == "bookmarking-population") 		$("#population-size-slider").val(bookmarks[i].value);
			else if(bookmarks[i].name == "bookmarking-wAA") 			$("#fitness-coefficient-wAA-slider").val(bookmarks[i].value);
			else if(bookmarks[i].name == "bookmarking-wAa") 			$("#fitness-coefficient-wAa-slider").val(bookmarks[i].value);
			else if(bookmarks[i].name == "bookmarking-waa") 			$("#fitness-coefficient-waa-slider").val(bookmarks[i].value);
			else if(bookmarks[i].name == "bookmarking-selection") 		$("#selection-coefficient-slider").val(bookmarks[i].value);
			else if(bookmarks[i].name == "bookmarking-dominance") 		$("#dominance-coefficient-slider").val(bookmarks[i].value);
		}
	} 
	else{
		if(this.debug) console.log(bookmarkform);
	}
}