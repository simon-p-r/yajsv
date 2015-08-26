'use strict';

module.exports = {

    metaSchema: {
        description: 'Schema for context',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'context',
        version: 1
    },

    schema: {
        id: 'context',
        required: ['organisation', 'orgUnit', 'role', 'deviceTrustedId', 'deviceSID', 'host', 'user'],
        properties: {
            organisation: {
                $ref: 'dbRef'
            },
            orgUnit: {
                $ref: 'dbRef'
            },
            role: {
                $ref: 'dbRef'
            },
            deviceSID: {
                $ref: 'dbRef'
            },
            host: {
                type: 'string'
            },
            deviceTrustedId: {
                type: 'string'
            },
            user: {
                $ref: 'dbRef'
            }
        }
    }
};
