popGen.faq = popGen.faq || {};

popGen.faq.init = function() {
    // popGen.htmlutil.initFAQ();
    // popGen.htmlutil.smoothScrolling();

    // var mainAnchors = new AnchorJS({
    //     placement: 'left',
    //     class: 'left'
    // });
    // mainAnchors.add().remove('.panel-title').remove('.no-anchor');
    // var questionAnchors = new AnchorJS({
    //     placement: 'right',
    //     class: 'right'
    // });
    // questionAnchors.add('.panel-title').remove('.no-anchor');
    // $('body').scrollspy({
    //     target: '.bs-docs-sidebar'
    // });
    // $('body').scrollspy({
    //     target: '#mobile-sidebar'
    // });
    // this.activateFAQSearch("#hideseek-search");
    // this.activateLazyLoadImages();
};


popGen.faq.activateFAQSearch = function(selector) {
    if ($(selector).length) {
        $(selector).hideseek({
            copy_to: '#accordian-search-results',
            result_selector: '#num-results',
            nodata: '',
            complete: function(query, num_results) {
                $(this.result_selector).html(num_results);
                if (query.length === 0) {
                    $("#search-results h3").addClass('hidden');
                } else {
                    $("#search-results h3").removeClass('hidden');
                    $("#search-results h3 .search-term").html("'" + query + "'");
                }
                if (query.length > 0 && num_results == 0) {
                    $(this.copy_to).html('<div class="alert alert-info lead text-center font-thick" role="alert"> Sorry no results found!</div>');
                }
            }
        });
    }
};

popGen.faq.activateLazyLoadImages = function() {
    // try http://sjwilliams.github.io/laziestloader/
    var layzr = new Layzr({
        selector: '[data-original]',
        attr: 'data-original',
        bgAttr: 'data-layzr-bg',
        threshold: 20,
        callback: function() { //Remove the image loader
            if(popGen.debug) console.log("loaded");
            console.log("test");
            $(this).next().remove();
            $(this).attr('data-isLoaded', 'true');
        }
    });
};