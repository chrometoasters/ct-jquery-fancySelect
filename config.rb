# Compass configuration file

# Tips: https://gist.github.com/timkelty/1595176

# Usage sans Grunt
# Note: exec runs the executable that comes with a gem in your bundle
# 1. bundle exec compass compile OR # bundle exec compass watch

# Require gems and Compass plugins
require "compass"
require "susy"

# General
output_style = :compressed
project_path = File.dirname(__FILE__) + "/"

# Sass Paths
http_path = "/"

# Sass Directories
css_dir = "dist"
sass_dir = "dev"

additional_import_paths = [
    project_path + "bower_components",
]