# ct-jquery-fancySelect

A wrapper for https://github.com/fnagel/jquery-ui/tree/selectmenu.

__Please note: this plugin is optimised for internal Chrometoaster use. YMMV.__

## Installation

1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`
1. `bower install https://github.com/chrometoasters/ct-jquery-fancySelect.git#v1.2.0 --save`

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

Styles may be customised by importing the uncompiled `.scss` and specifying custom values in  `dev/ct-jquery-fancySelect.scss`.

#### JavaScript

    $('.FORM_CLASS select').fancySelect({
        exclusions: [
             $('html').hasClass('ios'),
             $('html').hasClass('lt-ie9')
        ],
        parent_form_selector: '.FORM_CLASS',
        focus_class: 'is-focussed',
        invalid_class: 'not-valid',
        required_class: 'is-required',
        dropdown_max_height_px: (46 * 5 )
    });

## Demo

Please refer to `demos/ct-jquery-fancySelect.html`.

## Quirks

As this is the first release of this plugin there are some limitations:

1. Test suite needs more tests
1. No support for different markup or Mustache templating
1. Customising the styles requires replacing an entire map (vs [replacing a value](http://erskinedesign.com/blog/setting-typographic-scale-with-sass-maps/))
1. Need to merge in other enhancements from older projects
