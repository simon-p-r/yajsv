'use strict';

module.exports = {

    metaSchema: {
        description: 'Rec schema',
        type: 'record',
        base: 'example',
        jsonSchema: 'v4',
        name: 'rec',
        version: 1
    },

    schema: {
        type: 'object',
        required: ['someProp'],
        properties: {
            someProp: {
                type: 'string'
            },
            '$ref.def': 'def'
        },
        additionalProperties: false
    }
};
