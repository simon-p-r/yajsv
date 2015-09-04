// 'use strict';

module.exports = {

    metaSchema: {
        description: 'UK address schema',
        type: 'record',
        base: 'address',
        jsonSchema: 'v4',
        name: 'uk',                     // iso 3 char
        version: 1
    },

    schema: {
        id: 'uk',
        properties: {
            postcode: {
                type: 'string',
                maxLength: 50
            },
            posttown: {
                type: 'string',
                maxLength: 50
            }

        },

        required: ['postcode']
    }

};
