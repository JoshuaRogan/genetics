//Namespaces
var popGen 					= popGen || {debug: true};

popGen.config 				= popGen.config || {}; 				//Parent config files
popGen.config.chartJQ 		= popGen.config.chartJQ || {}; 		//Chart (Jquery version) config
popGen.config.noUISlider 	= popGen.config.noUISlider || {}; 	//NOUI Slider config 

popGen.generations			= popGen.generations || {};			//Generations class 
popGen.populations			= popGen.populations || {};			//Populations class

popGen.htmlutil 			= popGen.htmlutil || {};
popGen.htmlutil.genDOM		= popGen.htmlutil.genDOM || {};		//General DOM Manipualtions
popGen.htmlutil.chartDOM	= popGen.htmlutil.chartDOM || {};	//DOM manipulations related to the chart
popGen.htmlutil.sliderDOM	= popGen.htmlutil.sliderDOM || {};	//DOM manipulations related to the sliders

$(document).ready(function(){
	// $(".hidden").removeClass('hidden'); 

	// popGen.config.chartJQ.debugData();
	// popGen.config.noUISlider.debugData();
	// popGen.htmlutil.debugData();
	


	popGen.config.chartJQ.initChart("#graph-canvas");
	popGen.config.noUISlider.initSliders();
	popGen.htmlutil.initHome();


	popGen.htmlutil.chartDOM.debugData();
	


	
});