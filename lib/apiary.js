(function () {

    var request = require('request');
    var fs = require('fs');

    function getHeaders(apiToken, contentType) {
        return {
            'Accept': 'text/html',
            'Content-Type': contentType,
            'Authentication': 'Token ' + apiToken
        };
    }

    exports.fetch = function (apiName, apiToken, callback, errorCallback) {
        callback = callback || false;
        errorCallback = errorCallback || false;
        request({
            method: 'GET',
            url: 'https://api.apiary.io/blueprint/get/' + apiName,
            headers: getHeaders(apiToken, 'text/plain')
        }, function (error, response, body) {
            if (response.statusCode == 200) {
                if (callback) {
                    callback(JSON.parse(body).code);
                }
            } else {
                if (errorCallback) {
                    errorCallback(response);
                }
            }
        });
    };

    exports.publish = function (code, apiName, apiToken, callback, errorCallback) {
        callback = callback || false;
        errorCallback = errorCallback || false;
        var body = {
            code: code,
            messageToSave: "Published from local repository"
        };
        request({
            method: 'POST',
            url: 'https://api.apiary.io/blueprint/publish/' + apiName,
            headers: getHeaders(apiToken, 'application/json'),
            body: JSON.stringify(body)
        }, function (error, response) {
            if (response.statusCode == 200 || response.statusCode == 201) {
                if (callback) {
                    callback(response);
                }
            } else {
                if (errorCallback) {
                    errorCallback(response);
                }
            }
        });
    };

}).call(this);
