!function(t){"use strict";t.fn.fusionSwitchTabOnLinkClick=function(a){var i,e;e="#_"===(i=a||("#_"===document.location.hash.substring(0,2)?document.location.hash.replace("#_","#"):document.location.hash)).substring(0,2)?i.split("#_")[1]:i.split("#")[1],i&&t(this).find('.nav-tabs li a[href="'+i+'"]').length&&(t(this).find(".nav-tabs li").removeClass("active"),t(this).find('.nav-tabs li a[href="'+i+'"]').parent().addClass("active"),t(this).find(".tab-content .tab-pane").removeClass("in").removeClass("active"),t(this).find('.tab-content .tab-pane[id="'+e+'"]').addClass("in").addClass("active")),i&&t(this).find('.nav-tabs li a[id="'+e+'"]').length&&(t(this).find(".nav-tabs li").removeClass("active"),t(this).find('.nav-tabs li a[id="'+e+'"]').parent().addClass("active"),t(this).find(".tab-content .tab-pane").removeClass("in").removeClass("active"),t(this).find('.tab-content .tab-pane[id="'+t(this).find('.nav-tabs li a[id="'+e+'"]').attr("href").split("#")[1]+'"]').addClass("in").addClass("active"))}}(jQuery),jQuery(document).on("ready fusion-element-render-fusion_tabs",function(t,a){var i=void 0!==a?jQuery('div[data-cid="'+a+'"]').find(".fusion-tabs"):jQuery(".fusion-tabs"),e=void 0!==a?jQuery('div[data-cid="'+a+'"]').find(".nav-tabs li"):jQuery(".nav-tabs li");i.each(function(){jQuery(this).fusionSwitchTabOnLinkClick()}),e.on("click",function(t){var a,i=jQuery(this),e=i.parents(".fusion-tabs"),n=i.find(".tab-link").attr("href"),s=e.find(n);e.find(".nav li").removeClass("active"),e.find(".nav li a").attr("tabindex","-1"),i.children().removeAttr("tabindex"),s.find(".fusion-woo-slider").length&&(a=0,e.hasClass("horizontal-tabs")&&(a=e.find(".nav").height()),e.height(e.find(".tab-content").outerHeight(!0)+a)),setTimeout(function(){jQuery(window).trigger("fusion-dynamic-content-render",s),window.dispatchEvent(new Event("fusion-resize-horizontal",{bubbles:!0,cancelable:!0})),jQuery(window).trigger("fusion-resize-vertical"),jQuery(window).trigger("resize")},350),t.preventDefault()}),void 0!==a&&(e.first().trigger("click"),e.first().addClass("active")),Modernizr.mq("only screen and (max-width: "+fusionTabVars.content_break_point+"px)")&&jQuery(".tabs-vertical").addClass("tabs-horizontal").removeClass("tabs-vertical"),jQuery(window).on("resize",function(){Modernizr.mq("only screen and (max-width: "+fusionTabVars.content_break_point+"px)")?(jQuery(".tabs-vertical").addClass("tabs-original-vertical"),jQuery(".tabs-vertical").addClass("tabs-horizontal").removeClass("tabs-vertical")):jQuery(".tabs-original-vertical").removeClass("tabs-horizontal").addClass("tabs-vertical")})}),jQuery(window).on("load",function(){jQuery(".vertical-tabs").length&&jQuery(".vertical-tabs .tab-content .tab-pane").each(function(){var t;jQuery(this).parents(".vertical-tabs").hasClass("clean")?jQuery(this).css("min-height",jQuery(".vertical-tabs .nav-tabs").outerHeight()-10):jQuery(this).css("min-height",jQuery(".vertical-tabs .nav-tabs").outerHeight()),jQuery(this).find(".video-shortcode").length&&(t=parseInt(jQuery(this).find(".fusion-video").css("max-width").replace("px",""),10),jQuery(this).css({float:"none","max-width":t+60}))}),jQuery(window).on("resize",function(){jQuery(".vertical-tabs").length&&jQuery(".vertical-tabs .tab-content .tab-pane").css("min-height",jQuery(".vertical-tabs .nav-tabs").outerHeight())})});