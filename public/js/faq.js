//Namespaces
var popGen = popGen || {
    debug: true
};
popGen.config = popGen.config || {}; //Parent config files
popGen.config.chartJQ = popGen.config.chartJQ || {}; //Chart (Jquery version) config
popGen.config.noUISlider = popGen.config.noUISlider || {}; //NOUI Slider config 
popGen.generations = popGen.generations || {}; //Generations class 
popGen.populations = popGen.populations || {}; //Populations class
popGen.htmlutil = popGen.htmlutil || {};
popGen.htmlutil.genDOM = popGen.htmlutil.genDOM || {}; //General DOM Manipualtions
popGen.htmlutil.chartDOM = popGen.htmlutil.chartDOM || {}; //DOM manipulations related to the chart
popGen.htmlutil.sliderDOM = popGen.htmlutil.sliderDOM || {}; //DOM manipulations related to the sliders
$(document).ready(function() {
    popGen.htmlutil.initFAQ();
    smoothScrolling();
    var mainAnchors = new AnchorJS({
        placement: 'left',
        class: 'left'
    });
    mainAnchors.add().remove('.panel-title').remove('.no-anchor');
    var questionAnchors = new AnchorJS({
        placement: 'right',
        class: 'right'
    });
    questionAnchors.add('.panel-title').remove('.no-anchor');

    $('body').scrollspy({
        target: '.bs-docs-sidebar'
    });

    $('body').scrollspy({
        target: '#mobile-sidebar'
    });

    activateFAQSearch("#hideseek-search");
});

function smoothScrolling() {
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

function activateFAQSearch(selector) {
    if ($(selector).length) {

        $(selector).hideseek({
            copy_to: '#accordian-search-results', 
            result_selector: '#num-results',
            nodata: '',
            complete: function(query, num_results){
            	$(this.result_selector).html(num_results);

            	if(query.length === 0){
            		$("#search-results h3").addClass('hidden');
            	}
            	else{
            		$("#search-results h3").removeClass('hidden');
            	}
            	
            	if(query.length > 0 && num_results == 0){
               		$(this.copy_to).html('<div class="alert alert-info lead text-center font-thick" role="alert"> Sorry no results found!</div>');
                }



            }
        });
    }
};