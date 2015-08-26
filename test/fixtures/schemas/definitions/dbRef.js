'use strict';

module.exports = {

    metaSchema: {
        description: 'dbRef definition',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'dbRef',
        version: 1
    },

    schema: {

        id: 'dbRef',
        type: 'object',
        format: 'dbRef',
        properties: {
            cn: {
                type: 'string'
            },
            q: {
                type: ['string', 'object']
            }
        },
        required: ['cn', 'q']
    }

};
