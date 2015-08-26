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
                type: ['string', 'object', 'array']
            },
            dataType: {
                type: 'string'
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
