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
                type: 'string'
            },
            recProps: {
                type: 'object'
            },
            luValue: {
                type: 'string'
            },
            useAsIs: {
                type: 'integer'
            },
            valueText: {
                type: 'string'
            },
            sequence: {
                type: 'integer',
                minimum: 0
            },
            description: {
                type: 'string'
            },
            valueInt: {
                type: 'integer'
            }
        }
    }
};
