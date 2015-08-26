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
                type: 'string'
            },
            domainName: {
                type: 'string'
            },            // domain name for email use - i.e. without wwww
            ccTag: {
                type: 'object',
                format: 'lookup',
                properties: {
                    ccTag: {
                        type: 'string'
                    }
                }
            },
            systemOwner: {
                $ref: 'dbRef'
            },
            systemConfigSID: {
                type: 'string'
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
                        format: 'duration'
                    },
                    changePasswordExpiry: {
                        type: 'string',
                        format: 'duration'
                    },
                    timeoutSecs: {
                        type: 'integer'
                    }
                }
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
                }
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
