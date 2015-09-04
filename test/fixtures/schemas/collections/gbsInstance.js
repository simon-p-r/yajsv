'use strict';

module.exports = {

    metaSchema: {
        description: 'GBS Instance',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'gbsInstance',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'funcName': 1
            }
        }], //sid?
        sid: ['funcName']
    },

    schema: {
        id: 'gbsInstance',
        properties: {
            instanceName: {
                type: 'string',
                maxLength: 50
            },
            completionMessagesException: {
                type: 'array',
                items: {
                    type: 'string',
                    maxLength: 50
                }
            },
            completionMessagesSuccessful: {
                type: 'array',
                items: {
                    type: 'string',
                    maxLength: 50
                }
            },
            defaultAccountIdPrefix: {
                type: 'string',
                maxLength: 1
            },
            defaultCustomerIdPrefix: {
                type: 'string',
                maxLength: 1
            },
            description: {
                type: 'string',
                maxLength: 50
            },
            funcinqName: {
                type: 'string',
                maxLength: 6
            },
            funcinqVersion: {
                type: 'string',
                maxLength: 2
            },
            isProduction: {
                type: 'boolean'
            },
            lang: {
                type: 'string',
                maxLength: 2
            },
            logon: {
                type: 'object',
                properties: {
                    branchFldName: {
                        type: 'string',
                        maxLength: 30
                    },
                    branchFldValue: {
                        type: 'string',
                        maxLength: 20
                    },
                    subbranchFldName: {
                        type: 'string',
                        maxLength: 30
                    },
                    subbranchFldValue: {
                        type: 'string',
                        maxLength: 20
                    },
                    funcFldName: {
                        type: 'string',
                        maxLength: 30
                    },
                    operidFldName: {
                        type: 'string',
                        maxLength: 30
                    },
                    passwordFldName: {
                        type: 'string',
                        maxLength: 30
                    },
                    programId: {
                        type: 'string',
                        maxLength: 30
                    },
                    screenName: {
                        type: 'string',
                        maxLength: 30
                    }
                },
                additionalProperties: false
            },
            useMnemonicKeys: {
                type: 'boolean'
            },
            values: {
                type: 'object',
                properties: {
                    error: {
                        type: 'string',
                        maxLength: 1
                    },
                    no: {
                        type: 'string',
                        maxLength: 1
                    },
                    norm: {
                        type: 'string',
                        maxLength: 1
                    },
                    warn: {
                        type: 'string',
                        maxLength: 1
                    },
                    yes: {
                        type: 'string',
                        maxLength: 1
                    },
                    continue: {
                        type: 'string',
                        maxLength: 50
                    },
                    limitId: {
                        type: 'string',
                        maxLength: 50
                    },
                    override: {
                        type: 'string',
                        maxLength: 50
                    },
                    visualCheck: {
                        type: 'string',
                        maxLength: 50
                    }
                },
                additionalProperties: false

            },
            verifyFieldNameSuffix: {
                type: 'string',
                maxLength: 50
            }
        }
    }
};
