var zasset = function(files, destFilename) {
 
    var fs = require("fs"),
        UglifyJS = require("uglify-js"),
        async = require("async");
 
 
    var readFiles = function(cb) {
 
        var minifyFile = function(file, cb) {
            console.log("minified", file);
            var result = UglifyJS.minify(file);
            cb(null, new Buffer(result.code));
        };
       
        var readFile = function(file, cb) {
            var minName = file.replace(/\\*.js$/, ".min.js");
            fs.exists(minName, function(is) {
                if (is){
                    fs.readFile(minName, cb);
                }
                else{
                    minifyFile(file, cb);
                }
            });
        };
 
        async.mapSeries(files, readFile, cb);
    };
 
 
 
    var writeFiles = function(all, cb) {
        //console.log("writeFiles", cb);
 
        fs.writeFile(destFilename, all, cb);
    };
 
    async.waterfall([readFiles, writeFiles], function (err, result) {
       // result now equals 'done'
    console.log("Done");
         
    });
 
};
 
 
 
zasset(["ang.js"], "all.js");