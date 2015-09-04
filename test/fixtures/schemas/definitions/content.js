'use strict';

module.exports = {


    metaSchema: {
        description: 'schema for content',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'content',
        version: 1
    },

    schema: {
        id: 'content',
        required: ['data', 'dataType', 'schemaSID', 'schemaVersion'],
        properties: {
            data: {
                type: ['string', 'object', 'array'],
                maxLength: 50,
                items: {
                    type: 'object',
                    patternProperties: {
                        '/(?=.*[a-zA-Z])/': {
                            type: 'string',
                            maxLength: 50
                        }
                    },
                    additionalProperties: false
                },
                patternProperties: {
                    '/(?=.*[a-zA-Z])/': {
                        type: 'string',
                        maxLength: 50
                    }
                }
            },
            dataType: {
                type: 'string',
                maxLength: 50
            },         // if string then json, text or html else object
            schemaSID: {
                $ref: 'dbRef'
            },
            schemaVersion: {
                type: 'integer'
            }
        }
    }
};
