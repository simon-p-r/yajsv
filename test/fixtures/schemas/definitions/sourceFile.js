'use strict';

module.exports = {

    metaSchema: {
        description: 'sourcefile definition',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'sourceFile',
        version: 1
    },

    schema: {
        id: 'sourceFile',
        required: ['sourceDevice', 'sourceName', 'sourcePath'],
        properties: {

            sourceDevice: {
                type: 'string',
                maxLength: 50
            },
            sourceName: {
                type: 'string',
                maxLength: 50
            },
            sourcePath: {
                type: 'string',
                maxLength: 50
            }

        }
    }


};
