// Load modules

var Control = require('../definitions/control.js').schema;

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
        title: this.type + ' schema for ' + this.name,
        type: 'object',
        additionalProperties: false,
        properties: {

            dbRef: {
                type: 'object',
                format: 'dbRef',
                properties: {
                    cn: {
                        type: 'string',
                        maxLength: 50
                    },
                    q: {
                        type: ['string', 'object'],
                        maxLength: 50,
                        patternProperties: {
                            '/^[a-zA-Z]+$/': {
                                type: 'string',
                                maxLength: 50
                            }
                        }
                    }
                },
                required: ['cn', 'q'],
                additionalProperties: false
            },
            luRef: {
                type: 'object',
                format: 'lookup',
                properties: {
                    lt: {
                        type: 'string',
                        maxLength: 50
                    },
                    lv: {
                        type: ['string', 'array'],
                        maxLength: 50,
                        items: {
                            type: 'string',
                            maxLength: 50
                        }
                    }
                },
                additionalProperties: false
            },
            duration: {
                type: 'string',
                format: 'duration',
                maxLength: 50

            },
            password: {
                type: 'string',
                maxLength: 50,
                format: 'password'
            },
            phone: {
                type: 'string',
                maxLength: 50,
                format: 'phone'
            },
            postcode: {
                type: 'string',
                maxLength: 50,
                format: 'postcode'
            },
            vatNumber: {
                type: 'string',
                maxLength: 50,
                format: 'vat'
            },
            iban: {
                type: 'string',
                maxLength: 50,
                format: 'iban'
            },
            contact: {
                type: 'string',
                maxLength: 50,
                format: 'contact'
            },
            amt: {
                type: 'string',
                maxLength: 50,
                format: 'amt'
            },
            control: Control
        },
        required: ['dbRef']
    }
};
