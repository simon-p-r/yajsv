module.exports = {


    metaSchema: {
        description: 'dummy collection',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'dummy',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'tdid': 1
            }
        }]

    },
    schema: {

        id: 'dummy',
        properties: {

            dbRef: {
                type: 'object',
                format: 'dbRef',
                properties: {
                    cn: {
                        type: 'string'
                    },
                    q: {
                        type: ['string', 'object']
                    }
                }
            },
            luRef: {
                type: 'object',
                format: 'lookup',
                properties: {
                    lt: {
                        type: 'string'
                    },
                    lv: {
                        type: ['string', 'array']
                    }
                }
            },
            duration: {
                type: 'string',
                format: 'duration'

            },
            password: {
                type: 'string',
                format: 'password'
            },
            phone: {
                type: 'string',
                format: 'phone'
            },
            postcode: {
                type: 'string',
                format: 'postcode'
            },
            vatNumber: {
                type: 'string',
                format: 'vat'
            },
            iban: {
                type: 'string',
                format: 'iban'
            },
            contact: {
                type: 'string',
                format: 'contact'
            },
            amt: {
                type: 'string',
                format: 'amt'
            }
        }
    }
};
