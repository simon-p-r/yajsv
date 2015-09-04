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
                type: 'string',
                maxLength: 50
            },
            visualCheck: {
                type: 'boolean'
            },
            requiresVerification: {
                type: 'boolean'
            },
            firstScreen: {
                type: 'string',
                maxLength: 50
            },
            funcinqInfo: {
                type: 'string',
                maxLength: 50
            },
            skipFirstScreen: {
                type: 'boolean'
            },
            isUseSourceRefForAdd: {
                type: 'boolean'
            },
            gbsRefExtractPrefix: {
                type: 'string',
                maxLength: 50
            },
            removeSpacesFromTargetRef: {
                type: 'boolean'
            },
            keyFlds: {
                type: 'array',
                items: {
                    type: 'object',
                    patternProperties: {
                        '/(?=.*[a-zA-Z])/': {
                            type: 'string',
                            maxLength: 50
                        }
                    }
                },
                additionalProperties: false
            },
            chainSet: {
                type: 'object',
                properties: {
                    screen: {
                        type: 'string',
                        maxLength: 30
                    }
                },
                additionalProperties: false
            }
        }
    }
};
