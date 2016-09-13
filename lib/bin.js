(function () {
    var program = require('commander')
        .version(require('../package.json').version)

    var apiary = require('./apiary');
    var fs = require('fs');
    var open = require('open');

    program
        .command('fetch <API_NAME> <TOKEN>')
        .description('Fetch API Description document from API_NAME.apiary.io')
        .option('-p, --path [path]', 'Location of fetched .apib file')
        .action(function (apiName, apiToken, options) {
            var path = options.path || "apiary.apib";
            apiary.fetch(apiName, apiToken, function (code) {
                fs.writeFile(path, code, function (err) {
                    if (err) {
                        console.error("Error writing file: " + err);
                        process.exit(1);
                    }
                    console.log("Successfully fetched to " + path);
                })
            }, function (response) {
                if (response.statusCode == 403) {
                    console.error("Invalid credentials");
                } else {
                    console.error("Fetching error: HTTP " + response.statusCode);
                }
                process.exit(1);
            });
        });

    program
        .command('publish <API_NAME> <TOKEN>')
        .description('Publish API Description document on docs.API_NAME.apiary.io')
        .option('-p, --path [path]', 'Location of .apib file for publishing')
        .action(function (apiName, apiToken, options) {
            var path = options.path || "apiary.apib";
            fs.readFile(path, 'utf8', function (err, code) {
                if (err) {
                    console.error("Cannot read file" + path);
                    process.exit(1);
                }
                apiary.publish(code, apiName, apiToken, function () {
                    console.log("Successfully published to http://docs." + apiName + ".apiary.io");
                }, function (response, body) {
                    if (response.statusCode == 403) {
                        console.error("Invalid credentials");
                    } else {
                        console.error("Publishing error: HTTP " + response.statusCode);
                        console.error(body);
                    }
                    process.exit(1);
                });
            });
        });

    program
        .command('preview <API_NAME>')
        .description('Show API documentation in default browser')
        .action(function (apiName) {
            open("http://docs." + apiName + ".apiary.io");
            console.log("Opened new browser window");
        });


    program.parse(process.argv);

    if (!program.args.length) {
        program.help();
    }

}).call(this);
