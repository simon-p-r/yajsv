'use strict';

module.exports = {

    metaSchema: {
        description: 'entity defintion schema',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'entity',
        version: 1
    },

    schema: {
        type: 'object',
        required: ['id'],
        properties: {
            uid: {
                type: 'string'
            }
        },
        additionalProperties: false
    }
};
