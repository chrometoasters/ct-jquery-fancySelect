# ct-jquery-fancySelect

A wrapper for https://github.com/fnagel/jquery-ui/tree/selectmenu.

__Please note: this plugin is optimised for internal Chrometoaster use. YMMV.__

## Development

To update this plugin:

    npm install
    grunt

## Installation

1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`
1. `bower install https://github.com/chrometoasters/ct-jquery-fancySelect.git#~v2 --save`

Note: if you wish to customise where Bower puts installed components, you may add a `.bowerrc` file into this folder:

        {
            "directory" : "PATH/TO/COMPONENTS"
        }

## Usage

### Dependencies

Ensure that the following assets are loaded by your page:

#### CSS

Either import the precompiled CSS:

1. `dist/ct-jquery-fancySelect.css` (this plugin, bundled)

Or the uncompiled SCSS:

1. `dev/ct-jquery-fancySelect.scss` (this plugin, bundled)

Note that the latter has various dependencies - see `bower.json`.

#### JavaScript

1. `jquery/jquery.min.js` (dependency, via Bower)
1. `jquery-ui/ui/jquery.ui.core.js` (dependency, via Bower)
1. `jquery-ui/ui/jquery.ui.widget.js` (dependency, via Bower)
1. `jquery-ui/ui/jquery.ui.position.js` (dependency, via Bower)
1. `jquery-ui/ui/jquery.ui.selectmenu.js` (dependency, via Bower)
1. `dist/ct-jquery-fancySelect.min.js` (this plugin, bundled)

### Set up

#### HTML

The minimum required markup is:

    <div class="FORM_CLASS">
        <label for="FIELD_ID">Field name</label>
        <select aria-required="TRUE_OR_FALSE" aria-invalid="TRUE_OR_FALSE_OR_OMIT" id="FIELD_ID">
            <option value="" selected="selected">TEASER TEXT</option>
            <option value="VALUE">OPTION NAME</option>
        </select>
    </div>

You should of course add `form`, `fieldset` etc elements as necessary to create an accessible page.

#### Styles

Styles may be customised by importing the uncompiled `.scss`, and preceding this import with the customised map:

    $fancySelect: (
        selectHeight: 50px,
        arrowColor: #141414,
        arrowFontSizePx: 15px,
        arrowDividerColor: #dfdfdf,
        arrowCode: "\2193",
        arrowFont: sans-serif,
        arrowFontSizePx: 18px,

        ffDefault: #{Arial, "Helvetica Neue", Helvetica, sans-serif},
        fsDefault: 18px,
        fwDefault: normal,
        fcActive: black !important,
        fcContent: black !important,
        fcDefault: black !important,
        fcError: black !important,
        fcHeader: black !important,
        fcHighlight: black !important,
        fcHover: black !important,

        bgColorActive: white,
        bgColorContent: white,
        //bgColorDefault: white,
        bgColorError: white,
        bgColorHeader: white,
        bgColorHighlight: white,
        bgColorHover: white,

        borderColorActive: green,
        borderColorContent: #666,
        borderColorError: red,
        borderColorValid: green, // note: this style remains even when focus is removed from the field (see note below)
        borderColorHeader: #666,
        borderColorHighlight: #666,
        borderColorHover: green, // note: there is no borderColorErrorHover
        borderColorDefault: #666,

        cornerRadius: 0
    );
    @import "ct-jquery-fancySelect/dev/ct-jquery-fancySelect";

Note that a `$vendor_path` does not need to be set as all image references have been removed.

#### JavaScript

    $('.FORM_CLASS select').fancySelect({
        exclusions: [
             $('html').hasClass('ios'),
             $('html').hasClass('lt-ie9')
        ],
        dropdown_max_height_px: (46 * 5 )
    });

## Demo

Please refer to `demos/ct-jquery-fancySelect.html`.

## Quirks

As this is the first release of this plugin there are some limitations:

1. Test suite needs more tests
1. No support for Mustache templating
1. Customising the styles requires replacing an entire map (vs [replacing a value](http://erskinedesign.com/blog/setting-typographic-scale-with-sass-maps/))
1. Need to merge in other enhancements from older projects
1. Select sizing is a mixture of pixels and ems
1. Selects too narrow when JavaScript disabled
