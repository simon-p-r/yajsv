'use strict';

module.exports = {

    metaSchema: {
        description: 'Lookup honorific values',
        type: 'record',
        base: 'dummy',
        jsonSchema: 'v4',
        name: 'honorific',
        version: 1,
        sid: ['$luValue']
    },

    schema: {
        properties: {}
    }

};
