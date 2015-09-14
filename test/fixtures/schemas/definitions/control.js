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
                type: 'string',
                format: 'date-time',
                maxLength: 50
            },
            createdBy: {
                $ref: 'dbRef'
            },
            id: {
                type: 'string',
                maxLength: 50
            },
            schemaVersion: {
                type: 'integer'
            },
            updatedAt: {
                type: 'string',
                maxLength: 50,
                format: 'date-time'
            },
            updatedBy: {
                $ref: 'dbRef'
            }
        }

    }
};
