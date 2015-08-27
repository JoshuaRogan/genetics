var popGen = popGen || {
    debug: false,
    transition_time: 250 //Time for CSS transition in ms
};

popGen.config = popGen.config || {}; //Parent config files
popGen.config.chartJQ = popGen.config.chartJQ || {}; //Override this file with the correct config 

//Genotype Graph Configuration 
popGen.config.genotype = popGen.config.genotype || {};
popGen.config.genotype.chartJQ = popGen.config.genotype.chartJQ || {};

//Allele Graph Configuration Files 
popGen.config.allele = popGen.config.allele || {};
popGen.config.allele.chartJQ = popGen.config.allele.chartJQ || {};

//Html Utitlies 
popGen.htmlutil = popGen.htmlutil || {};
popGen.htmlutil.genDOM = popGen.htmlutil.genDOM || {}; //General DOM Manipualtions
popGen.htmlutil.chartDOM = popGen.htmlutil.chartDOM || {}; //DOM manipulations related to the chart
popGen.htmlutil.sliderDOM = popGen.htmlutil.sliderDOM || {}; //DOM manipulations related to the sliders

$(document).ready(function() {

    $.material.init();
    popGen.htmlutil.genDOM.validatorURL();
    
    if ($('.page-graph').length) {
        if (popGen.debug) console.log("Graph Page");
        if ($('.graph-genotype').length) {
            if (popGen.debug) console.log("Genotype Graph");           
            popGen.config = popGen.config.genotype;
            popGen.config.chartJQ.initChart("#graph-canvas");
            popGen.config.noUISlider.initSliders();

        } else if ($('.graph-allele').length) {
            if (popGen.debug) console.log("Allele Graph");
            popGen.config = popGen.config.allele;
            popGen.config.chartJQ.initChart("#graph-canvas");
            popGen.config.noUISlider.initSliders();

        }
        popGen.htmlutil.initHome(); 
        popGen.htmlutil.updateCanvasMenu();
    }
    else if($('.page-faq').length){
        popGen.faq.init();
    }
});