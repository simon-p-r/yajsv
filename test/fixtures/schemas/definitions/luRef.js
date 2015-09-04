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
                type: 'string',
                maxLength: 50
            },
            lv: {
                type: ['string', 'array'],
                maxLength: 50,
                items: {
                    type: 'string',
                    maxLength: 50
                }
            }
        },
        required: ['lt', 'lv']
    }

};
