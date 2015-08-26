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
                type: 'string'
            },                                          // collection, task, comm, service, request, response
            resourceName: {
                type: 'string'
            },                                          // collectionName, ,taskName, commName, serviceName
            resourceUID: {
                type: ['string', 'array']
            },                                     // resource unique identifer
            resourceSID: {
                type: ['string', 'array']
            },
            action: {
                type: 'object',
                format: 'lookup',
                properties: {
                    evtAction: {
                        type: 'string'
                    }
                }
            },     // add, update, delete, deleteAll, send
            query: {
                type: 'string'
            },              // query used to delete records - content contains an array of the  record oid /sids
            stateChange: {
                type: ['string', 'object']
            },                                           // data + schema to understand data
            context: {
                $ref: 'context'
            },                                      // who, when and why
            dt: {
                type: 'object',
                format: 'date-time'
            },
            prevEvent: {
                $ref: 'dbRef'
            },
            sessionId: {
                type: 'string'
            },
            transID: {
                type: 'string'
            },
            device: {
                type: 'string'
            },
            user: {
                type: 'string'
            }
        }
    }
};
