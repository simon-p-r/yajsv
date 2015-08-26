'use strict';

module.exports = {

    metaSchema: {
        description: 'GBS Screen Layout & metadata',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'screen',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'screenName': 1
            }
        }],
        sid: ['screenName']
    },

    schema: {
        id: 'screen',
        properties: {
            screenName: {
                type: 'string',
                maxLength: 6
            },
            screenVersion: {
                type: 'string',
                maxLength: 2
            },
            baseScreenName: {
                type: 'string',
                maxLength: 6
            },
            baseScreenVersion: {
                type: 'string',
                maxLength: 2
            },
            description: {
                type: 'string'
            },
            form: {
                type: 'string'
            }
        }
    }
};
