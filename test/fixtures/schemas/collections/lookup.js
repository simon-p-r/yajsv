'use strict';

module.exports = {

    metaSchema: {
        description: 'Lookup base schema',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'lookup',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'recType': 1,
                'luValue': 1
            }
        }], //sid?
        sid: ['recType', 'luValue']
    },

    schema: {
        id: 'lookup',
        required: ['recType', 'luValue'],
        properties: {
            recType: {
                type: 'string',
                maxLength: 50
            },
            luValue: {
                type: 'string',
                maxLength: 50
            },
            useAsIs: {
                type: 'integer'
            },
            valueText: {
                type: 'string',
                maxLength: 50
            },
            sequence: {
                type: 'integer',
                minimum: 0
            },
            description: {
                type: 'string',
                maxLength: 50
            },
            valueInt: {
                type: 'integer'
            }
        }

    }
};
