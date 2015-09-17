'use strict';

var Control = require('../definitions/control.js').schema;


module.exports = {

    metaSchema: {
        description: 'schema for county',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'county',
        version: 1,
        sid: ['county']
    },

    schema: {
        id: 'county',
        required: ['county', 'country'],
        properties: {

            county: {
                type: 'string',
                maxLength: 50
            },
            country: {
                type: 'string',
                maxLength: 50
            },
            control: Control

        }

    }

};
