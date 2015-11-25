"use strict";
var watchify = require("watchify");
var fs = require("fs");
var browserify = require("browserify");

function bundleIt(bundle, filename) {
    function updater() {
        console.log("start bundling");
        bundle.bundle().pipe(fs.createWriteStream(filename));
    }

    bundle
        .plugin(watchify)
        .on('log', function (msg) {
            console.log(filename + ": " + msg)
        })
        .on("update", updater)
        .bundle()
        .pipe(fs.createWriteStream(filename));
}

var bundle = browserify("./index.js", {
    cache : {},
    debug : true,
    packageCache : {}
})
    .external("react")
    .external("react-dom")
    .external("react-addons-linked-state-mixin")
    .transform("babelify", {presets : ["es2015", "react"]});

var vendors = browserify({
    cache : {},
    packageCache : {}
})
    .require("react/dist/react.min.js", {expose : "react"})
    .require("react-addons-linked-state-mixin")
    .require("react-dom/dist/react-dom.min.js", {expose : "react-dom"})
    .transform("babelify", {presets : ["es2015", "react"]});

bundleIt(vendors, 'vendors.min.js');
bundleIt(bundle, 'bundle.min.js');