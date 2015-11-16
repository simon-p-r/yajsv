'use strict';

module.exports = {

    metaSchema: {
        description: 'Extendable record schema',
        type: 'record',
        jsonSchema: 'v4',
        base: 'relationship',
        name: 'extendRec',
        rids: ['newProp'],
        version: 1
    },

    schema: {
        type: 'object',
        required: ['someProp'],
        properties: {
            newProp: {
                type: 'string'
            }
        },
        additionalProperties: false
    },
    methods: {
        preSave: function (options) {

            return true;
        }
    }
};
