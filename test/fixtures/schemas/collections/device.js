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
                type: 'string',
                maxLength: 50
            },
            description: {
                type: 'string',
                maxLength: 50
            },
            deviceName: {
                type: 'string',
                maxLength: 50
            }


        }

    }

};
