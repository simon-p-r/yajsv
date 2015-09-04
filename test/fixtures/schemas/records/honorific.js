'use strict';

module.exports = {

    metaSchema: {
        description: 'Lookup honorific values',
        type: 'record',
        base: 'lookup',
        jsonSchema: 'v4',
        name: 'honorific',
        version: 1,
        sid: ['$luValue']
    },

    schema: {
        id: 'honorific',
        properties: {}
    }

};
