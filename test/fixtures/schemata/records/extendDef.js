'use strict';

module.exports = {

    metaSchema: {
        description: 'Extendable record schema',
        type: 'record',
        base: 'example',
        jsonSchema: 'v4',
        name: 'extendDef',
        version: 1
    },

    schema: {
        type: 'object',
        required: ['someProp'],
        properties: {
            someProp: {
                type: 'string'
            },
            '$ref.rec': 'rec'
        },
        additionalProperties: false
    },
    methods: {
        preSave: function (options) {

            return true;
        }
    }
};
