// Load modules

exports.formatError = function (error) {

    var results = [];
    var length = error.details.length;
    for (var i = 0; i < length; ++i) {
        var path = error.details[i].path.join(' ');
        var params = error.details[i].params;
        var message = params + ' parameter is missing from path ' + path;
        results.push(message);

    }
    return results.join(' & ');
};

exports.arrayToObj = function (errors) {

    var retVal = {};
    var length = errors.length;
    for (var i = 0; i < length; ++i) {
        var err = errors[i];
        var path = err.path.join(' ');
        retVal[path] = {
            params: err.params,
            message: err.message
        };
    }
    return retVal;
};
