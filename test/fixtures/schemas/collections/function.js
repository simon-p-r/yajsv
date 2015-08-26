'use strict';

module.exports = {

    metaSchema: {
        description: 'GBS Function',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'function',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'funcName': 1
            }
        }],
        sid: ['funcName']
    },

    schema: {
        id: 'function',
        properties: {
            funcName: {
                type: 'string',
                maxLength: 8
            },
            funcType: {
                $ref: 'luRef'
            },
            logonType: {
                $ref: 'luRef'
            },
            keyType: {
                $ref: 'luRef'
            },
            firstScreenType: {
                $ref: 'luRef'
            },
            funcCompletionType: {
                $ref: 'luRef'
            },
            targetRefType: {
                $ref: 'luRef'
            },
            parentFunc: {
                $ref: 'dbRef'
            },
            description: {
                type: 'string'
            },
            visualCheck: {
                type: 'boolean'
            },
            requiresVerification: {
                type: 'boolean'
            },
            firstScreen: {
                type: 'string'
            },
            funcinqInfo: {
                type: 'string'
            },
            skipFirstScreen: {
                type: 'boolean'
            },
            isUseSourceRefForAdd: {
                type: 'boolean'
            },
            gbsRefExtractPrefix: {
                type: 'string'
            },
            removeSpacesFromTargetRef: {
                type: 'boolean'
            },
            keyFlds: {
                type: 'array'
            },
            chainSet: {
                type: 'object',
                properties: {
                    screen: {
                        type: 'string',
                        maxLength: 30
                    }
                }
            }
        }
    }
};
