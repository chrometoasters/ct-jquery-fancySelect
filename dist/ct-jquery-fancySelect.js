/*
 * File name: ct-jquery-fancySelect.js
 * Plugin name: fancySelect
 * Project name: OB (2013)
 *
 * Summary:
 * Markup:
 * Usage:
 *
 * Plugin architecture:
 * http://docs.jquery.com/Plugins/Authoring
 * + read: http://stackoverflow.com/questions/5162120/sharing-settings-across-methods-in-namespaced-jquery-plugin
 * + read: http://extraordinarythoughts.com/2011/08/20/understanding-jquery-plugins/
 * + read: http://blog.kevinchisholm.com/javascript/javascript-immediate-functions-basics/
 * + read: http://www.learningjquery.com/2007/10/a-plugin-development-pattern
 * + read: http://jqfundamentals.com/chapter/jquery-basics
 * TO READ: http://www.virgentech.com/blog/2009/10/building-object-oriented-jquery-plugin.html
 *
*/

    // IMMEDIATE FUNCTION
    // (function($) {..}(jQuery))
    //
    // This 'immediate' function aka IIFE (Immediately Invoked Function Expression)
    // executes as soon as it is defined; it is followed by (), then wrapped in ();
    //
    // The enclosure in parenthesis makes everything inside the function run within a local scope.
    // This means that public variables like 'jQuery' are inaccessible, so we pass this in as an argument,
    // and map it to '$' (valid names in JavaScript can be pretty much anything, as long as they don't begin with a number and don't include a hyphen),
    // so it can't be overwritten by another library (such as Prototype) in the scope of its execution.
    //
    // Wrapping the entire plugin definition in a function create a closure,
    // allowing us to define private functions, without cluttering the namespace and without exposing the implementation.
    // aka In JavaScript, if you use the function keyword inside another function, you are creating a closure.

    (function($) {

        // VALIDATION SETTINGS FOR JSHINT.COM
        // This file
        /*jshint browser:true, jquery:true, strict:true, devel:true */

        // Allow specified vars from other files
        //global VARNAME:true
        "use strict";

        // NAMESPACING:
        // This type of plugin architecture allows you to encapsulate all of your methods
        // in the plugin's parent closure, and call them by first passing the string name
        // of the method, and then passing any additional parameters you might need for that method.
        // This type of method encapsulation and architecture is a standard in the jQuery plugin community
        // and it used by countless plugins, including the plugins and widgets in jQueryUI.
        //
        // Define a JSON object 'methods' to store public methods.
        var methods = {

            // called with $(el).fancySelect()
            init : function( options ) {

                // Dependencies

                // jQuery UI
                if ( typeof $.ui === 'undefined' ) {
                    return;
                }

                // jQuery UI Selectmenu
                if ( typeof $.fn.selectmenu === 'undefined' ) {
                    return;
                }

                // Create settings, regardless of whether they were already set
                var defaults = {
                    exclusions: [
                         $('html').hasClass('ios'),
                         $('html').hasClass('lt-ie9'),
                         $('body').hasClass('woocommerce-checkout') // woocommerce has its own solution
                    ],
                    parent_form_selector: 'form',
                    focus_class: 'is-focussed',
                    invalid_class: 'not-valid',
                    required_class: 'is-required',
                    dropdown_max_height_px: (46 * 5 )
                };

                var settings = $.extend({}, defaults, options);

                // Exclusions
                var exclude = false;

                // check that none of the exclusion conditions are met
                $.each( settings.exclusions, function(i, exclusion) {
                    if ( exclusion ) {
                        exclude = true; // 'return' failed to exit the script
                    }
                });

                if ( exclude ) {
                    return;
                }

                // Requirements
                //if ( settings.PROPERTY === '' ) {
                //    return;
                //}

                // Create any dynamic properties
                // settings.OTHER_PROPERTY = 'STRING_' + settings.PROPERTY;

                // MAINTAIN CHAINABILITY by returning 'this'
                // Within the function called by 'each()', the individual element being processed
                // can be referenced in the local scope by 'this' and used as a jQuery object by '$(this)'
                return this.each( function() {

                    // Create a jQuery object to use with this individual element
                    var $this = $(this);

                    // EVENT BINDINGS
                    // Namespace bound events to fancySelect
                    // so we can safely unbind plugin events without accidentally
                    // unbinding events that may have been bound outside of the plugin.
                    //$(SOME_ELEMENT).bind('EVENT_NAME.fancySelect', methods.METHOD_NAME);

                    // DATA
                    // it's best to use a single object literal to house all of your variables, and access that object by a single data namespace.
                    // Attempt to grab saved settings, if they don't exist we'll get 'undefined'.
                    // Note: this is the alternative approach to define an 'options' variable with/before 'methods'
                    // so that it is available to other functions inside the closure.
                    //
                    // To set data:
                    // 1.  $context.data('fancySelect').NEW_PROPERTY_NAME = 'VALUE';
                    // 2a. $context.data('fancySelect').NEW_PROPERTY_SET = {};
                    // 2b. $context.data('fancySelect').PROPERTY_SET.NEW_PROPERTY_NAME = 'BAR';
                    //
                    // To retrieve data:
                    // 1.  $context.data('fancySelect').EXISTING_PROPERTY_NAME
                    // 2a. $context.data('fancySelect').EXISTING_PROPERTY_SET;
                    // 2b. $context.data('fancySelect').EXISTING_PROPERTY_SET.EXISTING_PROPERTY_NAME;

                    // Save our newly created settings with each element
                    $this.data('fancySelect', settings);

                    // Also store the data with the form
                    $(settings.parent_form_selector).data('fancySelect', settings);

                    // RUN CODE HERE
                    // set up $this
                    $this.fancySelect('_setup');

                    $this.fancySelect('_setup_label_focus');
                    $this.fancySelect('_setup_label_required');

                });

            },

            // Private methods

            _setup: function() {

                var $this = $(this), // module
                    data = $this.data('fancySelect'),
                    $parent_form = $(data.parent_form_selector).eq(0),
                    w = $this.parent().width() - 2; // this is sometimes miscalculated OB #5102

                // TEST
                //$this.after('<p>' + w + '</p>');

                $this.selectmenu({
                    style: 'dropdown',
                    width: 'inherit',
                    menuWidth: w, // width less borders, to match parent .col
                    positionOptions: {
                        my: "left top",
                        at: "left bottom",
                        offset: null,
                        collision: "none"
                    },
                    // when the dropdown menu is opened
                    open: function(e, object){
                        // toggle .is-focussed class on label
                        var $original_select = $(object.option.parentNode); // this is also $(e.target)
                        var $fancy_select_dropdown = $('#' + $original_select.attr('id') + '-menu' );
                        w = $original_select.parent().width() - 2;

                        // update width as it may have been miscalculated (#5102),
                        // or the layout may have changed via a viewport resize or with a media query
                        $fancy_select_dropdown.css('width', w );

                        // style the label when the faux select is focussed
                        // this is retained until another element receives focus
                        $original_select.prev('label, .label').fancySelect('_focus', $parent_form); // TODO

                        // style the dropdown when the select is invalid
                        if ( $original_select.attr('aria-invalid') === 'true' ) {
                            $fancy_select_dropdown.fancySelect('_invalid', $parent_form);
                        }

                        /*
                            // this resizing solution was unresolved..

                            var iframe_height = $('body').outerHeight(true);
                            var $fancy_select = $(e.currentTarget);
                            var fancy_select_top = $fancy_select.position().top;
                            var fancy_select_height = $fancy_select_dropdown.height();
                            var fancy_select_visible_height = iframe_height - fancy_select_top;
                            var fancy_select_offscreen_by = fancy_select_visible_height - fancy_select_height;
                            var resize_addition = 0;

                            // if some of the menu is obscured offscreen
                            if ( fancy_select_offscreen_by < 0 ) {
                                //resize_addition = -1 * fancy_select_offscreen_by; // make positive

                                // set a max height for the menu
                                // TODO: this crops the menu at the iframe,
                                // but the iframe could be taller than the viewport so this is still messy:
                                $fancy_select_dropdown.css('max-height', fancy_select_visible_height);
                                // we could probably resolve this by using postmessage but it's a fiddle
                            }
                            else {
                                $fancy_select_dropdown.css('max-height', 'none');
                            }

                            // this didn't always fire for some reason:

                            if ( typeof CT_UI.resize_iframe !== 'undefined' ) {
                                CT_UI.resize_iframe( resize_addition );
                                // this action sometimes closes the select, if this happens then reopen it
                                if ( ! $fancy_select_dropdown.hasClass('ui-selectmenu-open') ) {
                                    $fancy_select.click();
                                }
                            }
                        */

                        // this was the alternate easy fix..
                        $fancy_select_dropdown.css('max-height', data.dropdown_max_height_px + 'px');
                    },
                    // when the dropdown menu is closed
                    close: function(e, object){
                        var $original_select = $(object.option.parentNode);

                        // style the dropdown when the select is valid
                        if ( $original_select.attr('aria-invalid') === 'false' ) {
                            var $fancy_select_dropdown = $('#' + $original_select.attr('id') + '-menu' );
                            $fancy_select_dropdown.fancySelect('_valid', $parent_form);
                        }

                        //if ( typeof CT_UI.resize_iframe !== 'undefined' ) {
                        //    CT_UI.resize_iframe();
                        //}
                    }
                });

                // clicking a label highlights the faux select, but this also opens the faux select:
                // while this is not normal behaviour for selects, it is as per the plugin and the designer likes this behaviour
                // refer #5118
                $this.prev('label, .label').click( function() {
                    var $target = $('#' + $(this).attr('for') );
                    $target.selectmenu('open');
                });

                //$this.fancySelect('_METHOD_NAME');
            },

            _setup_label_focus: function() {

                var $this = $(this), // module
                    data = $this.data('fancySelect'),
                    $parent_form = $(data.parent_form_selector).eq(0),
                    focus_class = data.focus_class;

                if ( ! $parent_form.length ) {
                    return;
                }

                var $select = $parent_form.find('select');

                if ( ! $select.length ) {
                    return;
                }

                //$(SOME_ELEMENT).bind('EVENT_NAME.fancySelect', methods.METHOD_NAME); // ??

                $parent_form
                    // when a form element is focussed, style its label
                    .on('focus.fancySelect', 'select', function() {
                        $(this).prev('label, .label').fancySelect('_focus', $parent_form);
                    })
                    // when a form element is blurred, style its label
                    .on('blur.fancySelect', 'select', function() {
                        $(this).prev('label, .label').fancySelect('_blur', $parent_form);
                    })
                    // when a select element is focussed, style its label
                    .on('focus.fancySelect', '.ui-selectmenu', function() { // note: this fires before the menu close callback
                        // when the select menu is closed, the focus is moved to A.ui-selectmenu

                        // when a select is closed by clicking on another select
                        // update the style of any previously selected select's label
                        $('.' + focus_class).fancySelect('_blur', $parent_form);

                        // update the style of this select's label
                        $(this).parent().prev().prev('label, .label').fancySelect('_focus', $parent_form);
                    })
                    // when a select element is blurred, style its label
                    .on('blur.fancySelect', '.ui-selectmenu', function() {
                        // when the user tabs off the select menu, the focus is lost
                        // update the style of this select's label
                        $(this).parent().prev().prev('label, .label').fancySelect('_blur', $parent_form);

                        $(this).fancySelect('_focus', $parent_form);
                    });
            },

            _setup_label_required: function() {

                var $this = $(this), // module
                    data = $this.data('fancySelect'),
                    $parent_form = $this.parents(data.parent_form_selector).eq(0);

                if ( ! $parent_form.length ) {
                    return;
                }

                // style labels for required elements
                $parent_form.find('[aria-required="true"]').prev('label, .label, .m-form--label').fancySelect('_required', $parent_form);

                // style labels for invalid elements
                $parent_form.find('[aria-invalid="true"]').prev('label, .label').fancySelect('_invalid', $parent_form);
            },

            // ADDERS
            // ...

            // SETTERS AND UNSETTERS

            _focus: function($parent_form) {

                var $this = $(this), // module
                    data = $parent_form.data('fancySelect'),
                    focus_class = data.focus_class;

                    $this.addClass(focus_class);
            },

            _blur: function($parent_form) {

                var $this = $(this), // module
                    data = $parent_form.data('fancySelect'),
                    focus_class = data.focus_class;

                    $this.removeClass(focus_class);
            },

            _invalid: function($parent_form) {

                var $this = $(this), // module
                    data = $parent_form.data('fancySelect'),
                    invalid_class = data.invalid_class;

                    $this.addClass(invalid_class);
            },

            _valid: function($parent_form) {

                var $this = $(this), // module
                    data = $parent_form.data('fancySelect'),
                    invalid_class = data.invalid_class;

                    $this.removeClass(invalid_class);
            },

            _required: function($parent_form) {

                var $this = $(this), // module
                    data = $parent_form.data('fancySelect'),
                    required_class = data.required_class;

                    $this.addClass(required_class);
            },

            // GETTERS
            // ...

            // Public methods

            // CLEANING UP
            destroy: function() {

                return this.each( function() {

                    // Create a jQuery object to use with this individual element
                    var $this = $(this), // module
                        data = $this.data('fancySelect'),
                        $parent_form = $(data.parent_form_selector).eq(0);

                    // TODO: revert HTML on destroy
                    //if ( data && data.PROPERTY ) {
                    //    $this.state('_METHOD_NAME');
                    //}

                    // Unbind namespaced events
                    $this.unbind('.fancySelect');
                    $parent_form.unbind('.fancySelect');

                    // Remove data when deallocating our plugin
                    $(data.parent_form_selector).removeData('fancySelect');

                    $this.removeData('fancySelect');

                    // remove the jQuery UI selectmenu
                    $this.selectmenu('destroy');

                    // no, REALLY remove it
                    $this.next('span').remove();

                    //$parent_form -- use for data
                });
            }

        }; // end methods

        // Add a new (public) function property named 'fancySelect' to the jQuery.fn object:
        // $.fn.fancySelect = function(){ .. }
        //
        // Every jQuery plugin is essentially a large function we add to jQuery's protected 'fn' namespace.
        // We could easily assign our function using “jQuery.pluginName = function”, but then our plugin’s code wouldn’t be protected.
        // So we use “jQuery.fn” as a shortcode to “jQuery.prototype”, meaning it can only be read (and not modified)
        // when using the jQuery namespace to access it.
        $.fn.fancySelect = function( method ) {

            // Method calling logic from http://docs.jquery.com/Plugins/Authoring
            if ( methods[method] ) {
                return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            }
            else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, arguments );
            }
            else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.fancySelect' );
            }

        };

    })(jQuery);
