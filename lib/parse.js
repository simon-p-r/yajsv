'use strict';

const Utils = require('basic-utils');


exports.schema = function (obj, lookup) {

    if (!Utils.isObj(obj) || !Utils.isObj(lookup)) {
        return;
    }

    const match = '$ref';
    let newKey;
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; ++i) {

        const key = keys[i];
        const node = obj[key];

        if (Utils.isObj(node)) {
            exports.schema(node, lookup);
        }
        if (Utils.isString(node)) {

            if (key.indexOf(match) !== -1) {

                delete obj[key];
                newKey = key.split('.').slice(-1).join('');
                if (lookup[node]) {
                    obj[newKey] = lookup[node].schema;
                }
                else {
                    throw new Error(`Schema name ${node.name} has an invalid lookup name "${node}" at key "${key}"`);
                }
            }
        }
        if (Utils.isArray(node)) {

            for (let j = 0; j < node.length; ++j) {

                const subnode = node[j];
                if (Utils.isObj(subnode)) {
                    exports.schema(subnode, lookup);
                }
                if (Utils.isString(subnode)) {

                    if (subnode.indexOf(match) !== -1) {

                        newKey = subnode.split('.').slice(-1).join('');
                        if (lookup[newKey]) {
                            obj[key][j] = lookup[newKey].schema;
                        }
                        else {
                            throw new Error(`Schema name ${node.name}has an invalid lookup name "${subnode}" at key "${key}"`);
                        }
                    }
                }
            }
        }
    }
    return obj;
};
