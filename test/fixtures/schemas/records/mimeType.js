'use strict';

module.exports = {

    metaSchema: {
        description: 'Lookup mimeType values',
        base: 'lookup',
        type: 'record',
        jsonSchema: 'v4',
        name: 'dummy',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'recType': 1,
                'luValue': 1
            }
        }]
    },

    schema: {

        id: 'mimeType',
        required: ['recType', 'luValue'],
        properties: {

            recProps: {
                type: 'object',
                properties: {

                    mime: {
                        type: 'string',
                        maxLength: 50
                    }

                },
                additionalProperties: false,
                required: ['mime']
            }
        }

    }
};
