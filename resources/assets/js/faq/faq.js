popGen.faq = popGen.faq || {};

popGen.faq.init = function() {
    popGen.htmlutil.initFAQ();
    popGen.htmlutil.smoothScrolling();

    var mainAnchors = new AnchorJS({
        placement: 'left',
        class: 'left'
    });
    mainAnchors.add().remove('.question-info-search').remove('.no-anchor');

    var questionAnchors = new AnchorJS({
        placement: 'right',
        class: 'right'
    });
    questionAnchors.add('.question-info-search').remove('.no-anchor');


    $('body').scrollspy({
        target: '.bs-docs-sidebar'
    });
    $('body').scrollspy({
        target: '#mobile-sidebar'
    });
    this.activateFAQSearch("#hideseek-search");
    this.activateLazyLoadImages();
};


popGen.faq.activateFAQSearch = function(selector) {
    if ($(selector).length) {
        $(selector).hideseek({
            copy_to: '#accordian-search-results',
            result_selector: '#num-results',
            highlight: true, 
            nodata: '',
            list: '.question', //All of the ul's
            children_selector: 'li', //All of the ul's lis
            complete: function(query, num_results) {
                $(this.result_selector).html(num_results);
                if (query.length == 0) {
                    $("#search-results h3").velocity("transition.flipXOut", { duration: 200, complete: function() { $(this).removeClass('visib')} });
                    $("#search-results h3").removeClass('in');
                } else {

                    if(!$("#search-results h3.visib").length){
                         $("#search-results h3")
                         $("#search-results h3").velocity("transition.flipXIn", { duration: 200, complete: function() { $(this).addClass('visib')} });
                    }
                   
                    $("#search-results h3 .search-term").html("'" + query + "'");
                }

                if (query.length > 0 && num_results == 0) {
                    if(!$(this.copy_to).next().has('.alert').length){
                        $(this.copy_to).next().html('<div class="alert alert-info lead text-center font-thick" role="alert"> Sorry no results found!</div>')
                        .hide().velocity("transition.slideLeftIn", { duration: 200, stagger: 50, drag: true });
                    }
                }
                else if(num_results > 0){
                    if($(this.copy_to).next().has('.alert').length){
                        $(this.copy_to).next().velocity("transition.slideLeftOut", { duration: 200, stagger: 50, drag: true, complete: function(elements) { $(elements).remove(); } });
                    }
                    $('[data-sid]').velocity("transition.slideLeftIn", { duration: 200, stagger: 50, drag: true });
                }
                else if(num_results == 0){
                }

                //Update the accordian
                $('#accordian-search-results').collapsible();
            },
            first: function(){
                $('[data-sid]').velocity("finish", true);
                $("#search-results h3").hide().removeClass('hidden');
            },
            start: function(){
                $('[data-sid]').velocity("finish", true);
            },
            empty: function(){
                $('[data-sid]').velocity("transition.slideRightOut", { duration: 200, stagger: 50, drag: true, complete: function() {  } });

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