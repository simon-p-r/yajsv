'use strict';

module.exports = {

    metaSchema: {
        description: 'file definition',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'file',
        version: 1
    },

    schema: {
        id: 'file',
        required: ['gridOID', 'mimeType', 'sourceFile'],
        properties: {

            gridOID: {
                $ref: 'dbRef'
            },       // unique reference to the file stored in mongodb
            mimeType: {
                $ref: 'luRef'
            }

        }

    }


};
