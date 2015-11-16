'use strict';

module.exports = {

    metaSchema: {
        description: 'Rec schema',
        type: 'record',
        jsonSchema: 'v4',
        name: 'rec',
        base: 'lookup',
        rids: ['someProp'],
        version: 1
    },

    schema: {
        type: 'object',
        required: ['rec'],
        properties: {
            rec: {
                type: 'object',
                properties: {
                    someProp: {
                        type: 'string'
                    },
                    '$ref.def': 'def'
                },
                additionalProperties: false,
                required: ['someProp']
            }
        },
        additionalProperties: false
    },
    methods: {
        postSave: function (options) {

            return true;
        }
    }
};
