'use strict';

module.exports = {

    metaSchema: {
        description: 'Party schema for Branch',
        base: 'party',
        type: 'record',
        jsonSchema: 'v4',
        name: 'branch',
        version: 1
    },

    schema: {
        id: 'branch',
        required: ['name'],
        properties: {
            name: {
                type: 'string',
                maxLength: 50
            },
            branchId: {
                type: 'string',
                maxLength: 50
            }

        }    // end properties

    }  // end schema
};
