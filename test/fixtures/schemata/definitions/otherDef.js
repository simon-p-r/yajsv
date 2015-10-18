'use strict';

module.exports = {

    metaSchema: {
        description: 'OtherDef definition schema',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'otherDef',
        version: 1
    },

    schema: {
        type: 'object',
        required: ['someOtherProp'],
        properties: {
            someOtherProp: {
                type: 'string'
            }
        },
        additionalProperties: false
    }
};
