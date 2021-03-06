// VALIDATION SETTINGS FOR JSHINT.COM
/*jshint browser:true, jquery:true, strict:true, devel:true */
/*global QUnit:true, equal:true, module, test */

// Unit tests for ct-jquery-fancySelect.js
// Author: dan.smith@chrometoaster.com
// equal( test, expected value, string to display in output )
//
// ----------------------------------------------------------------

var testvars = {};

QUnit.begin( function() {

    "use strict";

    testvars.container = '#qunit-fixture';

    //testvars.id = 'TOOD';
    //testvars.target = '#TODO';

});

/*
-------------------------------------------------------------------
Prerequisites
-------------------------------------------------------------------
*/

module("Prerequisites");

test("jQuery", function() {

    "use strict";

    equal(
        typeof jQuery === 'undefined',
        false,
        'loaded'
    );
});

test("jQuery UI", function() {

    "use strict";

    equal(
        typeof $.ui === 'undefined',
        false,
        'loaded'
    );
});

test("jQuery UI Selectmenu", function() {

    "use strict";

    equal(
        typeof $.fn.selectmenu === 'undefined',
        false,
        'loaded'
    );
});

/*
-------------------------------------------------------------------
Set up
-------------------------------------------------------------------
*/

module("Set up", {

    setup: function() {
        "use strict";
        //
    },
    teardown: function() {
        "use strict";
        //
    }
});

/*
test("TODO", function() {
    "use strict";

    // Setup
    // TODO

    equal(
        TODO,
        true,
        ''
    );

});
*/

/*
-------------------------------------------------------------------
Destroy
-------------------------------------------------------------------
*/

/*
module("Destroy", {

    setup: function() {
        "use strict";

        // Setup
        $(testvars.target).fancySelect({
            // options
        });

        // Destroy
        $(testvars.target).fancySelect('destroy');
    },
    teardown: function() {
        "use strict";
        //
    }
});

test("TESTNAME", function() {
    "use strict";

    equal(
        TODO,
        true,
        ''
    );
});
*/
