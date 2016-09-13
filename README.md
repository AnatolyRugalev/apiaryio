# Apiary.io command-line tool

This tool allows to fetch and publish API Blueprint documentation into apiary.io.

## Install

```bash
npm install -g apiaryio
```

## Use CLI

### Fetch blueprint

```bash
apiary fetch <api_name> <token> --path=apiary.apib
```

### Publish blueprint

```bash
apiary publish <api_name> <token> --path=apiary.apib
```

### Preview blueprint

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

## Help is required

*I am not node.js developer, so any help is appreciated.*

This library needs a refactoring and better error handling.

## Thanks

Thanks to [Apiary.io](http://apiary.io) team for support.
