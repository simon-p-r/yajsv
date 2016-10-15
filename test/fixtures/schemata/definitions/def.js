'use strict';

module.exports = {

    metaSchema: {
        description: 'Test defintion schema',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'def',
        version: 1
    },

    schema: {
        type: 'object',
        required: ['id'],
        properties: {
            uid: {
                type: 'string'
            },
            oneOf: [
                '$ref.otherDef'
            ]
        },
        additionalProperties: false
    },
    methods: {
        postValidate: function () {

            return true;
        }
    }
};
