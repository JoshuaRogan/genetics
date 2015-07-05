popGen.velocity = popGen.velocity || {
    sections: Array(),
    help_sections: Array(),
    duration: 400,
    easing: 'ease'
};
/**
 * [verticalSlide description]
 * @param  {[type]} element   [description]
 * @param  {[type]} container [description]
 * @param  {[type]} easing    [description]
 * @param  {[type]} duration  [description]
 * @return {[type]}           [description]
 */
popGen.velocity.verticalSlideSection = function(element, container, easing, duration) {
    //Init
    var active = element.hasClass('active'); // store active state
    popGen.htmlutil.genDOM.checkSections(element);
    if (!active) {
        container.addClass('hidden');
    }
    element.on('click', function(e) {
        active = element.hasClass('active'); // store active state
        container.removeClass('hidden');
        e.preventDefault();
        element.toggleClass('active'); // set click target to active
        popGen.htmlutil.genDOM.checkSections(element);
        container.velocity(active ? 'slideUp' : 'slideDown', { // test and init command
            duration: duration, // duration set in function call params
            easing: easing, // easing set in function call params
        });
    });
};
/**
 * [verticalSlideSectionCheck description]
 * @param  {[type]} element   [description]
 * @param  {[type]} container [description]
 * @param  {[type]} easing    [description]
 * @param  {[type]} duration  [description]
 * @return {[type]}           [description]
 */
popGen.velocity.verticalSlideSectionCheck = function(element, container, easing, duration) {
    element.on('click', function(e) {
        var var_section = element.parent().next();
        var active = var_section.hasClass('active'); // store active state
        container.removeClass('hidden');
        e.preventDefault();
        if (element.hasClass('fa-square-o')) {
            if (!active) {
                container.velocity('slideDown', { // test and init command
                    duration: duration, // duration set in function call params
                    easing: easing, // easing set in function call params
                });
            }
            var_section.addClass('active'); // set click target to active
        } else {
            if (active) {
                container.velocity('slideUp', { // test and init command
                    duration: duration, // duration set in function call params
                    easing: easing, // easing set in function call params
                });
            }
            var_section.removeClass('active'); // set click target to active
        }
        popGen.htmlutil.genDOM.checkSections(var_section, true);
    });
};
/**
 * Hide all of the sections 
 * 
 */
popGen.velocity.hideAll = function() {
    $.each(this.sections, function(key, value) {
        value.velocity('slideUp', { // test and init command
            duration: this.duration, // duration set in function call params
            easing: this.easing, // easing set in function call params
        });
        $('.variable-section-toggle').removeClass('active').not('default');
    });
    $('.fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
};
/**
 * Show all of the sections 
 * 
 */
popGen.velocity.showAll = function() {
    $.each(this.sections, function(key, value) {
        value.removeClass('hidden');
        $('.variable-section-toggle').addClass('active').not('default');
        value.velocity('slideDown', { // test and init command
            duration: this.duration, // duration set in function call params
            easing: this.easing, // easing set in function call params
        });
    });
    $('.fa-chevron-down').removeClass('fa-chevron-down').addClass('fa-chevron-up');
};
/**
 *
 * 
 * [showHideVelocity description]
 * @param  {[type]} element   [description]
 * @param  {[type]} container [description]
 * @return {[type]}           [description]
 */
popGen.velocity.showHideVelocity = function(element, container) {
    $(element).on('click', function(e) {
        e.preventDefault();
        $(element).toggleClass("active");
        var active = $(element).hasClass('active'),
            close = "0",
            open = "250px",
            duration = 900,
            easing = "easeOutCirc";
        $(container).velocity({
            height: active ? open : close
        }, {
            duration: duration,
            easing: easing,
        });
    });
};
/**
 * [verticalSlideHelp description]
 * @param  {[type]} element   [description]
 * @param  {[type]} container [description]
 * @param  {[type]} easing    [description]
 * @param  {[type]} duration  [description]
 * @return {[type]}           [description]
 */
popGen.velocity.verticalSlideHelp = function(element, container, easing, duration) {
    var active = element.hasClass('active'); // store active state
    element.on('click', function(e) {
        active = element.hasClass('active'); // store active state
        container.removeClass('hidden');
        e.preventDefault();
        element.toggleClass('active'); // set click target to active
        popGen.htmlutil.genDOM.checkSections(element);
        container.velocity(active ? 'slideUp' : 'slideDown', { // test and init command
            duration: duration, // duration set in function call params
            easing: easing, // easing set in function call params
        });
    });
};
/**
 * [showAllHelp description]
 * @return {[type]} [description]
 */
popGen.velocity.showAllHelp = function() {
    $.each(this.help_sections, function(key, value) {
        value.removeClass('hidden');
        value.addClass('active');
        value.velocity('slideDown', { // test and init command
            duration: this.duration, // duration set in function call params
            easing: this.easing, // easing set in function call params
        });
    });
};
/**
 * [hideAllHelp description]
 * @return {[type]} [description]
 */
popGen.velocity.hideAllHelp = function() {
    $.each(this.help_sections, function(key, value) {
        value.removeClass('active');
        value.velocity('slideUp', { // test and init command
            duration: this.duration, // duration set in function call params
            easing: this.easing, // easing set in function call params
        });
    });
};