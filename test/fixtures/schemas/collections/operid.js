'use strict';

module.exports = {

    metaSchema: {
        description: 'GBS Operator Id',
        type: 'collection',
        isBase: true,
        jsonSchema: 'v4',
        name: 'operid',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'operid': 1
            }
        }], //sid?
        sid: ['operid']
    },

    schema: {
        id : 'operid',
        properties: {
            operid: {
                type: 'string',
                max: 8
            },
            password: {
                type: 'string',
                max: 8
            }
        }
    }
};
