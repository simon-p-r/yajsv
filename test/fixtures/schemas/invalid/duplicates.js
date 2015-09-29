module.exports = [{

    metaSchema: {
        description: 'invalid collection',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'duplicate',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'tdid': 1
            }
        }]

    },
    schema: {

        id: 'duplicate',
        properties: {

            phone: {
                type: 'string'
            },
            postcode: {
                type: 'string'
            }
        }
    }
},
{
    metaSchema: {
        description: 'invalid collection',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'duplicate',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'tdid': 1
            }
        }]
    },
    schema: {

        id: 'duplicate',
        properties: {

            phone: {
                type: 'string'
            },
            postcode: {
                type: 'string'
            }
        }
    }
}];
