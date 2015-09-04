'use strict';


module.exports = {

    metaSchema: {
        description: 'Base address schema',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'address',
        version: 1
    },

    schema: {
        id: 'address',
        required: ['recType', 'startDate'],
        properties: {
            recType: {
                type: 'string',
                maxLength: 50
            },
            startDate: {
                type: 'string',
                format: 'date',
                maxLength: 50
            },
            endDate: {
                type: 'string',
                format: 'date',
                maxLength: 50
            },
            noteList: {
                type: 'array',
                items: {
                    $ref: 'note'
                }
            },
            isBlocked: {
                type: 'boolean'
            }
        }

    }

};
