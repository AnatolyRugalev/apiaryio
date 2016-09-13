# Apiary.io command-line tool

This tool allows to fetch and publish API Blueprint documentation into [Apiary.io](http://apiary.io).

## Install

```bash
npm install -g apiaryio
```

## Use CLI

CLI tool allows to fetch and publish API Blueprint file from any environment. It may be useful in CI processes.
Use `apiary help` to see full list of commands.

### Fetch blueprint

Saves blueprint to local file.

```bash
apiary fetch <api_name> <token> --path=apiary.apib
```

### Publish blueprint

Publishes blueprint to Apiary. Overwrites existing documentation.

```bash
apiary publish <api_name> <token> --path=apiary.apib
```

### Preview blueprint

Open docs (http://docs.api_name.apiary.io) in browser.

```bash
apiary preview <api_name>
```

## Use in code

```js
var apiary = require('apiaryio');

// Publish code

apiary.publish("<API Blueprint source code>", "<api_name>", "<token>", function () {
    console.log("Docs successfully published");
}, function () {
    console.error("Error publishing docs");
});

// Fetch code

apiary.fetch("<api_name>", "<token>", function (code) {
    console.log("Blueprint content:")
    console.log(code);
}, function () {
    console.log("Error fetching docs");
});

```

## Use in gulp with aglio

The best way to manage apiary docs is to use [aglio](https://github.com/danielgtaylor/aglio). It allows to split
huge API Blueprint file to small pieces with its own include mechanism.

Example of gulp file:

```js
var gulp = require('gulp');
var gutil = require('gulp-util');
var gaglio = require('gulp-aglio');
var aglio = require('aglio');
var fs = require('fs');
var request = require('request');
var apiary = require('apiaryio');

var apiaryApiName = process.env.APIARY_NAME;
var apiaryApiKey = process.env.APIARY_KEY;

gulp.task('default', ['html'], function () {
});

gulp.task('compile', function (callback) {
    aglio.compileFile('api/main.apib', 'apiary.apib', function () {
        console.log("Compiled apiary.apib");
        callback();
    });
});

gulp.task('html', ['compile'], function () {
    gulp.src('apiary.apib')
        .pipe(gaglio({template: 'default'}))
        .on('error', gutil.log)
        .pipe(gulp.dest('html'));
    console.log("Rendered to html/apiary.html");
});

gulp.task('watch', ['html'], function () {
    gulp.watch('api/**/*.apib', ['html']);
});

gulp.task('publish', ['compile'], function (callback) {
    fs.readFile('apiary.apib', 'utf8', function (err, code) {
        apiary.publish(code, apiaryApiName, apiaryApiKey, function () {
            console.log("Successfully published to apiary.io!");
            console.log("http://docs." + apiaryApiName + ".apiary.io/");
            callback();
        }, function (response, body) {
            console.warn("Publish error");
            console.log('Response:', body);
            process.exit(1);
        });
    });
});

```

## Help is required

*I am not node.js developer, so any help is appreciated.*

This library needs a refactoring and better error handling.

## Thanks

Thanks to [Apiary.io](http://apiary.io) team for support.
