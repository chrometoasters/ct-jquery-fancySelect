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
        /*global VARNAME:true */
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
                //if ( typeof $.OTHER_fancySelect === undefined ) {
                //    return;
                //}

                // Create settings, regardless of whether they were already set
                var defaults = {
                    // property: value // description
                };

                var settings = $.extend({}, defaults, options);

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
                    $(SOME_ELEMENT).bind('EVENT_NAME.fancySelect', methods.METHOD_NAME);

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

                    // RUN CODE HERE
                    // set up $this
                    $this.fancySelect('_setup');

                });

            },

            // Private methods

            _setup: function() {

                var $this = $(this), // module
                    data = $this.data('fancySelect');

                $this.fancySelect('_METHOD_NAME');
            },

            // called by $(el).fancySelect('_METHOD_NAME') or $(el).fancySelect('_METHOD_NAME', ARGUMENTS);
            //_METHOD_NAME: function(ARGUMENTS) {
                // do something
            //}

            // ADDERS
            // ...

            // SETTERS AND UNSETTERS
            // ...

            // GETTERS
            // ...

            // Public methods

            // CLEANING UP
            destroy: function() {

                return this.each( function() {

                    // Create a jQuery object to use with this individual element
                    var $this = $(this), // module
                        data = $this.data('fancySelect');

                    // Revert HTML
                    if ( data && data.PROPERTY ) {
                        $this.state('_METHOD_NAME');
                    }

                    // Unbind namespaced events
                    $(SOME_ELEMENT).unbind('.fancySelect');

                    // Remove data when deallocating our plugin
                    $this.removeData('fancySelect');

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
