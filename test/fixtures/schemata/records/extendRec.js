'use strict';

module.exports = {

    metaSchema: {
        description: 'Extendable record schema',
        type: 'record',
        base: 'example',
        jsonSchema: 'v4',
        name: 'extendRec',
        version: 1
    },

    schema: {
        type: 'object',
        required: ['someProp'],
        properties: {
            newProp: {
                type: 'string'
            },
            '$ref': 'rec'
        },
        additionalProperties: false
    },
    methods: {
        preSave: function (options) {

            return true;
        }
    }
};
