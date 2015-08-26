/**
 * Created by Simon on 09/01/14.
 */

'use strict';

module.exports = {

    metaSchema: {
        description: 'permission definition',
        type: 'definition',
        jsonSchema: 'v4',
        name: 'permission',
        version: 1
    },

    schema: {

		// required : ['feature','create','read','update','delete','list','execute','rename','start','stop'],
        id: 'permission',
        properties: {

            feature: { $ref: 'dbRef' },
            function: { type: 'string' },
            actions: { type: 'array', items: { type: 'string' } }

            //feature            :{type:'string',format:'sid',collection:'feature'},
            //function           :{type:'string'},                    // can be blank
            //create             :{type:'boolean'},
            //read               :{type:'boolean'},
            //update             :{type:'boolean'},
            //delete             :{type:'boolean'},
            //list               :{type:'boolean'},
            //override           :{type:'boolean'},
            //execute            :{type:'boolean'},
            //rename             :{type:'boolean'},
            //start              :{type:'boolean'},
            //stop               :{type:'boolean'}

        }
    }

};
