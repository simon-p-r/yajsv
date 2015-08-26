'use strict';

module.exports = {

    metaSchema: {
        description: 'amt definition',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'amt',
        version: 1
    },

    schema: {

        id: 'amt',
        type: 'object',
        format: 'amt',
        properties: {
            amount: {
                type: 'number'
            },
            ccy: {
                $ref: 'dbRef'
            }
        },
        required: ['amount', 'ccy']

    }

};
