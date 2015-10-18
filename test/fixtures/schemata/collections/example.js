'use strict';

module.exports = {

    metaSchema: {
        description: 'Example base schema',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'entity',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'id': 1
            }
        }]
    },

    schema: {
        type: 'object',
        required: ['id'],
        properties: {
            id: {
                type: 'string'
            },
            '$ref.def': 'def'
        },
        additionalProperties: false
    }
};
