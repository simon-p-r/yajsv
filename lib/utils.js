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
