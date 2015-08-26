'use strict';

module.exports = {

    metaSchema: {
        description: 'luRef definition',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'luRef',
        version: 1
    },

    schema: {
        id: 'luRef',
        type: 'object',
        format: 'lookup',
        properties: {
            lt: {
                type: 'string'
            },
            lv: {
                type: ['string', 'array']
            }
        },
        required: ['lt', 'lv']
    }

};
