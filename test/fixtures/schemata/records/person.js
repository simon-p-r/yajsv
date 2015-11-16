'use strict';

module.exports = {

    metaSchema: {
        description: 'person record schema',
        type: 'record',
        jsonSchema: 'v4',
        name: 'person',
        base: 'entity',
        rids: ['name', 'age'],
        version: 1
    },

    schema: {
        type: 'object',
        required: ['recType', 'person', 'control'],
        properties: {
            recType: {
                type: 'string'
            },
            '$ref.entity': 'entity',
            person: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    age: {
                        type: 'string'
                    }
                },
                required: ['name, age'],
                additionalProperties: false
            },
            '$ref.control': 'control'
        },
        additionalProperties: false
    }
};
