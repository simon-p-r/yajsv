// Load modules

exports.formatError = function (name, error) {

    var results = [];
    for (var i = 0, il = error.details.length; i < il; ++i) {
        var err = error[i];
        var path = error.details[i].path.join(' ');
        var params = error.details[i].params;
        var message = 'Schema ' + name + ' failed at path ' + path + ' due to ' + params;
        results.push(message);
    }
    return results.join(' & ');
};

exports.arrayToObj = function (errors) {

    var retVal = {};
    for (var i = 0, il = errors.length; i < il; ++i) {
        var err = errors[i];
        var path = err.path.join(' ');
        retVal[path] = {
            params: err.params,
            message: err.message
        };
    }
    return retVal;
};
