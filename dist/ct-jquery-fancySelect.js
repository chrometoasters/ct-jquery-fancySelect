 /**
  * @file jQuery Fancy Select
  * @copyright Chrometoaster 2013
  * @author chrometoaster.com
  */

/*
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

/** @namespace
 * @name methods
 */

        // NAMESPACING:
        // This type of plugin architecture allows you to encapsulate all of your methods
        // in the plugin's parent closure, and call them by first passing the string name
        // of the method, and then passing any additional parameters you might need for that method.
        // This type of method encapsulation and architecture is a standard in the jQuery plugin community
        // and it used by countless plugins, including the plugins and widgets in jQueryUI.
        //
        // Define a JSON object 'methods' to store public methods.
        var methods = {

/** @method
 * @name init
 * @memberof methods
 *
 * @summary Checks for dependencies, stores settings with the select menu, runs setup on the select menu if the exclusion conditions are not met
 *
 * @returns {Boolean} - true if successful
 */

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

                    //console.log('$this', $this);

                    // Save our newly created settings with each element
                    $this.data('fancySelect', settings);

                    // RUN CODE HERE
                    // set up $this
                    $this.fancySelect('_setup');

                });

            },

// Private methods

/** @method
 * @name _setup
 * @memberof methods
 *
 * @summary Applies the selectmenu plugin, sets the fancy select width and menu height, applies an invalid hook to the menu if the select is invalid
 *
 * @returns {Boolean} - true if successful
 */

            _setup: function() {

                var $this = $(this), // module
                    data = $this.data('fancySelect'),
                    w = $this.parent().width() - 2; // this is sometimes miscalculated OB #5102

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
                    open: function(e, object) {
                        var $original_select = $(object.option.parentNode); // this is also $(e.target)
                        var $fancy_select_dropdown = $('#' + $original_select.attr('id') + '-menu' );
                        w = $original_select.parent().width() - 2;

                        // update width as it may have been miscalculated (#5102),
                        // or the layout may have changed via a viewport resize or with a media query
                        $fancy_select_dropdown.css('width', w );

                        // workaround for buggy iframe resizing
                        $fancy_select_dropdown.css('max-height', data.dropdown_max_height_px + 'px');

                        if ( $original_select.attr('aria-invalid') === 'true' ) {
                            $fancy_select_dropdown
                                .attr('aria-invalid', true)
                                .addClass('not-valid');
                        }
                    },
                    close: function(e, object) {
                        var $original_select = $(object.option.parentNode); // this is also $(e.target)
                        var $fancy_select_dropdown = $('#' + $original_select.attr('id') + '-menu' );

                        $fancy_select_dropdown
                            .removeAttr('aria-invalid')
                            .removeClass('not-valid');
                    }
                });

                $this.fancySelect('_bind_to_label');
            },

/** @method
 * @name _bind_to_label
 * @memberof methods
 *
 * @summary Binds all label elements to this select
 *
 * @returns {Boolean} - true if successful
 */

            _bind_to_label: function() {

                // select
                var $select = $(this); // module
                var select_id = $select.attr('id');

                // label
                var $label = $('label[for="' + select_id + '"]');

                if ( ! $label.attr('id') ) {
                    $label.attr('id', select_id + '-label');
                }

                var label_id = $label.attr('id');

                // faux select
                var $faux_select_elements = $();
                var $faux_select = $('#' + select_id + '-button');
                var $faux_select_internals = $faux_select.find('span');
                var $faux_select_wrapper = $faux_select.parent('span');
                var $faux_select_menu_wrapper = $('#' + select_id + '-menu').parent('.ui-selectmenu-menu');
                var $faux_select_menu_options = $faux_select_menu_wrapper.find('div, ul, li, a, span');

                $faux_select_wrapper.attr('tabindex', -1);
                $faux_select_elements = $faux_select_elements
                                            .add( $select )
                                            .add( $faux_select )
                                            .add( $faux_select_internals )
                                            .add( $faux_select_wrapper )
                                            .add( $faux_select_menu_wrapper )
                                            .add( $faux_select_menu_options );

                $faux_select_elements.attr('data-labelledby', label_id);

                return label_id;
            },

// Public methods

/** @method
 * @name destroy
 * @memberof methods
 *
 * @summary Reverts a fancy select element to its previous state: remove the jQuery UI selectmenu, remove data and unbind custom events
 *
 * @returns {Boolean} - true if successful
 *
 * @example
 * // revert fancy select to their previous state
 *    var $selects = $container.find('select');
 *
 *    $selects.each( function(i, select) {
 *        var $select = $(select);
 *
 *        if ( $select.data('fancySelect') ) {
 *            $select.fancySelect('destroy');
 *        }
 *    });
 */

            // CLEANING UP
            destroy: function() {

                return this.each( function() {

                    // Create a jQuery object to use with this individual element
                    var $this = $(this), // module
                        data = $this.data('fancySelect');

                    // Unbind namespaced events
                    $this.unbind('.fancySelect');

                    $this.removeData('fancySelect');

                    // remove the jQuery UI selectmenu
                    $this.selectmenu('destroy');

                    // no, REALLY remove it
                    $this.next('span').remove();
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
