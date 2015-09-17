// Load modules

var Joi = require('joi');
var Hoek = require('hoek');

var internals = {};

exports.assert = function (type, schema, message) {

    var result = Joi.validate(schema, internals[type]);
    Hoek.assert(!result.error, message);
    return result.value;
};

internals.Schema = Joi.object({
    metaSchema: Joi.object().keys({
        description: Joi.string(),
        type: Joi.string().required().valid('collection', 'definition', 'record'),
        base: Joi.string(),
        jsonSchema: Joi.string(),
        name: Joi.string().required(),
        version: Joi.number(),
        keys: Joi.alternatives().when('type', {
            is: ['collection', 'record'],
            then: Joi.array().items(Joi.object({
                name: Joi.string(),
                flds: Joi.object(),
                options: Joi.object()
            }))

        }),
        sid: Joi.array()
    }).required(),
    schema: Joi.object().required(),
    methods: Joi.object()

});


internals.Options = Joi.object({
    registers: Joi.object({

    }).pattern(/^[a-zA-Z]+$/, Joi.func().required()),
    zSchema: Joi.object()

});
