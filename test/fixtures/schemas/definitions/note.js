'use strict';

module.exports = {

    metaSchema: {
        description: 'note definition',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'note',
        version: 1
    },

    schema: {

        id: 'note',
        properties: {

            dt: {
                type: 'string',
                format: 'date-time'
            },
            text: {
                type: 'string'
            },
            user: {
                $ref: 'dbRef'
            },
            noteType: {
                $ref: 'luRef'
            },
            subject: {
                type: 'string'
            }


        },

        required: ['dt', 'text', 'user', 'noteType']

    }

};
