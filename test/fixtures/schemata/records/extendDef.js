'use strict';

module.exports = {

    metaSchema: {
        description: 'Extendable definition schema',
        type: 'definition',
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
    }
};
