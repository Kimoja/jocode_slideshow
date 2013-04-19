var fs = require('fs'),
    UglifyJS = require("uglify-js");

var all = '';

'class config slideshow fx_slide_scroll fx_slide_fade slideshow_navigation fx_nav_scroll'.split(' ').forEach(function(id, index){
    
    var min = UglifyJS.minify('src/' + id + '.js').code;
    
    all += min;
    fs.writeFileSync('dist/' + id + '.js', min);
});

fs.writeFileSync('dist/slideshow_all.js', all);
