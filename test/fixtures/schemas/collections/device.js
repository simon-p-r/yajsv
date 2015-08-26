'use strict';

module.exports = {

    metaSchema: {
        description: 'device collection',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'device',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'tdid': 1
            }
        }] //sid field?

    },

    schema: {
        id: 'device',
        required: ['tdid', 'deviceName'],
        properties: {

            tdid: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            deviceName: {
                type: 'string'
            }


        }

    }

};
