'use strict';

module.exports = {

    metaSchema: {
        description: 'Lookup mimeType values',
        type: 'record',
        base: 'lookup',
        jsonSchema: 'v4',
        name: 'mimeType',
        version: 1,
        sid: ['recType', 'luValue']
    },

    schema: {

        id: 'mimeType',
        required: ['recType', 'luValue'],
        properties: {

            recProps: {
                type: 'object',
                properties: {

                    mime: { type: 'string' }

                },

                required: ['mime']
            }
        }

    }
};
