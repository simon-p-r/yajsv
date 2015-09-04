module.exports = {


    metaSchema: {
        description: 'invalid collection',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'invalid',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'tdid': 1
            }
        }]

    },
    schema: {

        id: 'invalid',
        properties: {

            phone: {
                type: 'string',
                format: 'phone'
            },
            postcode: {
                type: 'string',
                format: 'postcode'
            }

        }
    }
};
