'use strict';

module.exports = {

    metaSchema: {
        description: 'schema for eventLog',
        type: 'collection',
        jsonSchema: 'v4',
        name: 'eventLog',
        version: 1

    },

    schema: {
        id: 'eventLog',
        required: ['action', 'resourceType', 'resourceName', 'resourceUID', 'context', 'dt'],
        properties: {

            resourceType: {
                type: 'string',
                maxLength: 50
            },                                          // collection, task, comm, service, request, response
            resourceName: {
                type: 'string',
                maxLength: 50
            },                                          // collectionName, ,taskName, commName, serviceName
            resourceUID: {
                type: ['string', 'array'],
                items: {
                    type: 'string',
                    maxLength: 50
                },
                maxLength: 50
            },                                     // resource unique identifer
            resourceSID: {
                type: ['string', 'array'],
                items: {
                    type: 'string',
                    maxLength: 50
                },
                maxLength: 50
            },
            action: {
                type: 'object',
                format: 'lookup',
                properties: {
                    evtAction: {
                        type: 'string',
                        maxLength: 50
                    }
                },
                additionalProperties: false
            },     // add, update, delete, deleteAll, send
            query: {
                type: 'string',
                maxLength: 50
            },              // query used to delete records - content contains an array of the  record oid /sids
            stateChange: {
                type: ['string', 'object'],
                patternProperties: {
                    '/(?=.*[a-zA-Z])/': {
                        type: 'string',
                        maxLength: 50
                    }
                },
                additionalProperties: false,
                maxLength: 50
            },                                           // data + schema to understand data
            context: {
                $ref: 'context'
            },                                      // who, when and why
            dt: {
                type: 'string',
                format: 'date-time',
                maxLength: 50
            },
            prevEvent: {
                $ref: 'dbRef'
            },
            sessionId: {
                type: 'string',
                maxLength: 50
            },
            transID: {
                type: 'string',
                maxLength: 50
            },
            device: {
                type: 'string',
                maxLength: 50
            },
            user: {
                type: 'string',
                maxLength: 50
            }
        }
    }
};
