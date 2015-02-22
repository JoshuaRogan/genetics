$(document).ready(function() {
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
}) //Document ready 


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