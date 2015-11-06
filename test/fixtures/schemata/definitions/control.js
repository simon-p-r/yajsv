'use strict';

module.exports = {

    metaSchema: {
        description: 'control defintion schema',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'control',
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
