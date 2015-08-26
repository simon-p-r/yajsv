'use strict';


module.exports = {

    metaSchema: {
        description: 'schema for feature',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'feature',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'feature': 1,
                'function': 1
            }
        }] //sid?
    },

    schema: {

        id: 'feature',
        required: ['feature', 'function'],
        properties: {

            feature: {
                type: 'string'
            },
            function: {
                type: 'string'
            },
            description: {
                type: 'string'
            }

        }

    }

};
