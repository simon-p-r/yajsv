'use strict';

module.exports = {

    metaSchema: {
        description: 'database control definition',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'control',
        version: 1
    },

    schema: {

        id: 'control',
        properties: {

            createdAt: {
                type: ['string', 'object'],
                format: 'date-time'
            },
            createdBy: {
                $ref: 'dbRef'
            },
            id: {
                type: 'string'
            },
            schemaVersion: {
                type: 'integer'
            },
            updatedAt: {
                type: ['string', 'object'],
                format: 'date-time'
            },
            updatedBy: {
                $ref: 'dbRef'
            }

        }
    }
};
