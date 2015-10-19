'use strict';

var Utils = require('basic-utils');

var internals = {};

internals.schema = function (obj, match, lookup) {

    if (!Utils.isObj(obj) || !Utils.isString(match) || !Utils.isObj(lookup)) {
        return;
    }

    // var store = new Map();
    var newKey;
    var keys = Object.keys(obj);
    for (var i = 0, il = keys.length; i < il; ++i) {

        var key = keys[i];
        var node = obj[key];
        if (key === 'metaSchema') {
            internals.schemaName = node.name;

        }
        // store.set(key, node);

        if (Utils.isObj(node)) {

            internals.schema(node, match, lookup);
        }
        if (Utils.isString(node)) {

            // for (let item of store) {
            //     if (item[0].indexOf(match) !== -1) {
            //
            //         delete obj[key];
            //         newKey = item[0].split('.').slice(-1).join('');
            //         obj[newKey] = lookup[item[1]].schema;
            //     }
            // }
            if (key.indexOf(match) !== -1) {

                delete obj[key];
                newKey = key.split('.').slice(-1).join('');
                if (lookup[node]) {
                    obj[newKey] = lookup[node].schema;
                } else {
                    throw new Error('Schema name ' + internals.schemaName + ' has an invalid lookup name "' + node + '" at key "' + key + '"');
                }
            }
        }
        if (Utils.isArray(node)) {

            for (var a = 0, al = node.length; a < al; ++a) {

                var subnode = node[a];
                // store.set(key, subnode);

                if (Utils.isObj(subnode)) {
                    internals.schema(subnode, match, lookup);
                }
                if (Utils.isString(subnode)) {

                    if (subnode.indexOf(match) !== -1) {

                        newKey = subnode.split('.').slice(-1).join('');
                        if (lookup[newKey]) {
                            obj[key][a] = lookup[newKey].schema;
                        } else {
                            throw new Error('Schema name ' + internals.schemaName + ' has an invalid lookup name "' + subnode + '" at key "' + key + '"');
                        }


                    }
                }

            }
        }
    }
    return obj;
};

exports = module.exports = internals;
