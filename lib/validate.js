'use strict';

const Joi = require('joi');
const Hoek = require('hoek');

const internals = {};

exports.assert = function (type, schema) {

    const result = Joi.validate(schema, internals[type]);
    Hoek.assert(!result.error, 'Invalid', type, 'options', result.error && result.error.annotate());
    return result.value;
};

internals.options = Joi.object({

    formats: Joi.object({

    }).pattern(/^[a-zA-Z]+$/, Joi.func())
});

internals.Schema = Joi.object({
    metaSchema: Joi.object().keys({
        description: Joi.string(),
        type: Joi.string().required().valid('definition', 'record'),
        base: Joi.when('type', {
            is: 'record',
            then: Joi.string().required()
        }),
        jsonSchema: Joi.string().required(),
        name: Joi.string().required(),
        version: Joi.number().required(),
        rids: Joi.when('type', {
            is: ['record'],
            then: Joi.array().items(Joi.string().required()).required()
        }),
        keys: Joi.alternatives().when('type', {
            is: ['record'],
            then: Joi.array().items(Joi.object({
                name: Joi.string(),
                flds: Joi.object(),
                options: Joi.object()
            }))
        })
    }).required(),
    schema: Joi.object({
        properties: Joi.object()
    }).pattern(/^[a-zA-Z]+$/, Joi.any()),
    methods: Joi.object().keys({
        preValidate: Joi.func(),
        postValidate: Joi.func(),
        preSave: Joi.func(),
        postSave: Joi.func()
    })

}).required();

internals.AddArray = Joi.array().items(internals.Schema).required();

internals.SchemaSet = Joi.object({
    definitions: Joi.object({

    }).pattern(/^\w+$/, internals.Schema),
    records: Joi.object({

    }).pattern(/^\w+$/, internals.Schema)

});

internals.Options = Joi.object({
    formats: Joi.object({

    }).pattern(/^[a-zA-Z]+$/, Joi.func().required()),
    zSchema: Joi.object(),
    db: Joi.any()

});
