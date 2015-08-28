/**
 * HideSeek jQuery plugin
 *
 * @copyright Copyright 2015, Dimitris Krestos
 * @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link      http://vdw.staytuned.gr
 * @version   v0.6.2
 *
 * Dependencies are include in minified versions at the bottom:
 * 1. Highlight v4 by Johann Burkard
 *
 */
/* Sample html structure

<input name="search" placeholder="Start typing here" type="text" data-list=".list">
<ul class="list">
  <li>item 1</li>
  <li>...</li>
  <li><a href="#">item 2</a></li>
</ul>

or

<input name="search" placeholder="Start typing here" type="text" data-list=".list">
<div class="list">
  <span>item 1</span>
  <span>...</span>
  <span>item 2</span>
</div>

or any similar structure...

*/
;
(function($, window, undefined) {
    "use strict";
    $.fn.hideseek = function(options) {
        var defaults = {
            list: '.hideseek-data',
            nodata: '',
            attribute: 'text',
            highlight: false,
            ignore: '',
            navigation: false,
            ignore_accents: false,
            hidden_mode: false,
            copy_to: false,
            result_selector: false,
            complete: false, //callback upcon completio, 
            first: false, //callback on first run
            start: false, //callback on the start  run
            empty: false, //callback on the no results
            children_selector: '',
            result_prefix: '', //The resuling elements id prefix
        };
        var options = $.extend(defaults, options);
        return this.each(function() {
            var $this = $(this);
            $this.opts = [];
            $.map(['list', 'nodata', 'attribute', 'highlight', 'ignore', 'navigation', 'ignore_accents', 'hidden_mode', 'copy_to', 'result_selector', 'complete', 'first', 'start', 'empty', 'children_selector'], function(val, i) {
                $this.opts[val] = $this.data(val) || options[val];
            });
            var $list = $($this.opts.list);
            if ($this.opts.navigation) $this.attr('autocomplete', 'off');
            if ($this.opts.hidden_mode) $list.children().hide();
            var valid = {};

            function add_valid(index, item) {}

            function remove_valid(index, item) {}
            $this.keyup(function(e) {
                if (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 13) {
                    if ($this.opts.first) {
                        $this.opts.first();
                        $this.opts.first = false;
                    }
                    if ($this.opts.start) {
                        $this.opts.start();
                    }
                    var q = $this.val().toLowerCase();
                    if (q.length) {
                        $this.results_loc = $($this.opts.copy_to);
                        // $this.results_loc.empty();
                        //Iterate through each item
                        $list.children($this.opts.children_selector).each(function(ind, li_element) {
                            var h4_id = $(li_element).find('h4.question-info-search').attr('id');
                            var data_sid = "result-" + h4_id;
                            var clone = $(li_element).clone(true);
                            // clone.find().each(function(){
                            //   $(this).removeAttr("id");
                            // });
                            clone.find('.anchorjs-link').remove();
                            clone.attr('data-sid', data_sid);
                            var selector = "[data-sid='" + data_sid + "']";
                            var data = clone.find('.seo')
                            data = $.trim(data.text().toLowerCase().replace(/\s\s+/g, ' '.removeAccents(true)));
                            var contains = data.indexOf(q) != -1;
                            if (!contains) {
                                $(selector).removeClass('search-current-result');
                                $(selector).velocity("transition.slideLeftOut", {
                                    duration: 200,
                                    stagger: 50,
                                    drag: true,
                                    complete: function(elements) {
                                        $(elements).remove();
                                    }
                                });
                                $(selector).remove();
                                $this.trigger('_after_each');
                            } else {
                                if ($this.opts.highlight) {
                                    $(selector).removeHighlight().highlight(q);
                                    clone.removeHighlight().highlight(q);
                                }
                                if ($(selector).length == 0) {
                                    clone.hide();
                                    clone.addClass('search-current-result');
                                    clone.appendTo($this.results_loc);
                                } else {}
                                $this.trigger('_after_each');
                            }
                        });
                    } else {
                        if ($this.opts.empty) {
                            $this.opts.empty();
                        }
                    }
                    // No results message
                    if ($this.opts.nodata) {
                        // $list.find('.no-results').remove();
                        // if (!$list.children(':not([style*="display: none"])').length) {
                        //     $list.children().first().clone().removeHighlight().addClass('no-results').show().prependTo($this.opts.list).text($this.opts.nodata);  
                        // }
                    }
                    if ($this.opts.complete) {
                        // $this.opts.complete(q, $this.result_length, results_loc);
                        if (q.length) {
                            $this.opts.complete(q, $this.results_loc.find('.search-current-result').length);
                        } else {
                            $this.opts.complete('', 0);
                        }
                    }
                    $this.trigger('_after');
                };
                // Navigation
                function current(element) {
                    return element.children('.selected:visible');
                };

                function prev(element) {
                    return current(element).prevAll(":visible:first");
                };

                function next(element) {
                    return current(element).nextAll(":visible:first");
                };
                if ($this.opts.navigation) {
                    if (e.keyCode == 38) {
                        if (current($list).length) {
                            prev($list).addClass('selected');
                            current($list).last().removeClass('selected');
                        } else {
                            $list.children(':visible').last().addClass('selected');
                        };
                    } else if (e.keyCode == 40) {
                        if (current($list).length) {
                            next($list).addClass('selected');
                            current($list).first().removeClass('selected');
                        } else {
                            $list.children(':visible').first().addClass('selected');
                        };
                    } else if (e.keyCode == 13) {
                        if (current($list).find('a').length) {
                            document.location = current($list).find('a').attr('href');
                        } else {
                            $this.val(current($list).text());
                        };
                    };
                };
            });
        });
    };
    $(document).ready(function() {
        $('[data-toggle="hideseek"]').hideseek();
    });
})(jQuery);
/*

highlight v4

Highlights arbitrary terms.

<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/
jQuery.fn.highlight = function(t) {
    function e(t, i) {
        var n = 0;
        if (3 == t.nodeType) {
            var a = t.data.removeAccents(true).toUpperCase().indexOf(i);
            if (a >= 0) {
                var s = document.createElement("mark");
                s.className = "highlight";
                var r = t.splitText(a);
                r.splitText(i.length);
                var o = r.cloneNode(!0);
                s.appendChild(o), r.parentNode.replaceChild(s, r), n = 1
            }
        } else if (1 == t.nodeType && t.childNodes && !/(script|style)/i.test(t.tagName))
            for (var h = 0; h < t.childNodes.length; ++h) h += e(t.childNodes[h], i);
        return n
    }
    return this.length && t && t.length ? this.each(function() {
        e(this, t.toUpperCase())
    }) : this
}, jQuery.fn.removeHighlight = function() {
    return this.find("mark.highlight").each(function() {
        with(this.parentNode.firstChild.nodeName, this.parentNode) replaceChild(this.firstChild, this), normalize()
    }).end()
};
// Ignore accents
String.prototype.removeAccents = function(enabled) {
    if (enabled) return this.replace(/[áàãâä]/gi, "a").replace(/[éè¨ê]/gi, "e").replace(/[íìïî]/gi, "i").replace(/[óòöôõ]/gi, "o").replace(/[úùüû]/gi, "u").replace(/[ç]/gi, "c").replace(/[ñ]/gi, "n");
    return this;
}