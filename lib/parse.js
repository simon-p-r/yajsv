'use strict';

const Utils = require('basic-utils');

const internals = {};

internals.schema = function (obj, lookup) {

    if (!Utils.isObj(obj) || !Utils.isObj(lookup)) {
        return;
    }

    const match = '$ref';
    let newKey;
    const keys = Object.keys(obj);
    for (let i = 0, il = keys.length; i < il; ++i) {

        const key = keys[i];
        const node = obj[key];
        if (key === 'metaSchema') {
            internals.schemaName = node.name;
        }
        if (Utils.isObj(node)) {
            internals.schema(node, lookup);
        }
        if (Utils.isString(node)) {

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

            for (let a = 0, al = node.length; a < al; ++a) {

                const subnode = node[a];
                if (Utils.isObj(subnode)) {
                    internals.schema(subnode, lookup);
                }
                if (Utils.isString(subnode)) {

                    if (subnode.indexOf(match) !== -1) {

                        newKey = subnode.split('.').slice(-1).join('');
                        if (lookup[newKey]) {
                            obj[key][a] = lookup[newKey].schema;
                        }
                        else {
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
