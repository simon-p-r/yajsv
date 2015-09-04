'use strict';

module.exports = {

    metaSchema: {
        description: 'schema for systemConfig',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'systemConfig',
        version: 1,
        keys: [{
            name: 'sid',
            flds: {
                'systemConfigSID': 1
            }
        }]
    },

    schema: {

        id: 'systemConfig',
        required: ['baseCcy', 'businessDate', 'domainName', 'ccTag', 'systemOwner', 'systemConfigSID'],
        properties: {

            baseCcy: {
                $ref: 'dbRef'
            },
            businessDate: {
                type: 'string',
                maxLength: 50
            },
            domainName: {
                type: 'string',
                maxLength: 50
            },            // domain name for email use - i.e. without wwww
            ccTag: {
                type: 'object',
                format: 'lookup',
                properties: {
                    ccTag: {
                        type: 'string',
                        maxLength: 50
                    }
                },
                additionalProperties: false
            },
            systemOwner: {
                $ref: 'dbRef'
            },
            systemConfigSID: {
                type: 'string',
                maxLength: 50
            },   // default:'systemConfig',length:12},
            authentication: {
                type: 'object',
                properties: {
                    authTimeDiffSecs: {
                        type: 'integer'
                    },
                    useWindowsAuthentication: {
                        type: 'boolean'
                    },
                    tokenExpiry: {
                        type: 'string',
                        maxLength: 50,
                        format: 'duration'
                    },
                    changePasswordExpiry: {
                        type: 'string',
                        maxLength: 50,
                        format: 'duration'
                    },
                    timeoutSecs: {
                        type: 'integer'
                    }
                },
                additionalProperties: false
            },
            options: {
                type: 'object',
                properties: {
                    daysToExpireList: {
                        type: 'array',
                        items: {
                            type: 'integer'
                        }
                    }
                },
                additionalProperties: false
            }

        }

    },



    methods: {
        import: function (record, pack, callback) {

            pack.app.systemConfig = record;
            callback(null, record);
        }    // import()
    }

};
