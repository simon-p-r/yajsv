/**
 * Created by Simon on 08/01/14.
 */

'use strict';

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
        required: ['county', 'country'],
        properties: {

            county: {
                type: 'string'
            },
            country: {
                type: 'string'
            }

        }

    }

};
