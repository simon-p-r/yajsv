'use strict';

// Load modules
var Hoek = require('hoek');
var ZSchema = require('z-schema');
var Validate = require('./validate.js');
var Utils = require('./utils.js');

var internals = {
    defaults: {
        zSchema: {
            reportPathAsArray: true,
            strictMode: true
        }
    }

};

module.exports = internals.Manager = function (options) {

    Hoek.assert(this instanceof internals.Manager, 'Manager must be created using new');
    Hoek.assert(typeof options === 'object', 'Manager must be constructed with a valid options object');
    Validate.assert('Options', options, 'Invalid object');
    internals.settings = Hoek.applyToDefaults(internals.defaults, options);
    this.db = internals.settings.db;
    this.formats = {};
    internals.registeredFormats = [];
    if (internals.settings.formats) {
        this.addFormats(internals.settings.formats);
    }
    this.models = [];
    internals.schemas = {};
    internals.validator = new ZSchema(internals.settings.zSchema);
    return this;

};


internals.Manager.prototype.compile = function () {

    var self = this;
    var errs = {};
    if (Object.keys(this.formats).length) {
        this.registerFormats(this.formats);
    }
    var formats = this.getRegisteredFormats();
    var jSchemas = this.filterSchemas();
    jSchemas.forEach(function (schema) {

        var valid = internals.validator.validateSchema(schema);
        if (!valid) {
            var error = internals.validator.getLastError();
            var formatedError = Utils.formatError(schema.id, error);
            errs[schema.id] = formatedError;
        }
    });
    var errors = Object.keys(errs).length ? errs : null;
    var valid = Object.keys(errs).length ? false : true;
    return {
        errors: errors,
        valid: valid
    };
};


internals.Manager.prototype.addSchema = function (rawSchema) {

    Validate.assert('Schema', rawSchema);
    var type = rawSchema.metaSchema.type;
    var name = rawSchema.metaSchema.name;
    var schema = rawSchema;
    this.build(type, name, schema);
};

internals.Manager.prototype.addSchemas = function (rawSchemas) {

    var name, schema, type;
    if (rawSchemas.constructor === Array) {

        Validate.assert('AddArray', rawSchemas);
        for (var a = 0, al = rawSchemas.length; a < al; ++a) {
            schema = rawSchemas[a];
            type = schema.metaSchema.type + 's';
            name = schema.metaSchema.name;
            this.build(type, name, schema);
        }
    } else {

        Validate.assert('SchemaSet', rawSchemas);
        var types = Object.keys(rawSchemas);
        for (var i = 0, il = types.length; i < il; ++i) {
            type = types[i];
            var schemas = Object.keys(rawSchemas[type]);
            for (var s = 0, sl = schemas.length; s < sl; ++s) {
                name = schemas[s];
                schema = rawSchemas[type][name];
                this.build(type, name, schema);
            }
        };
    }
};


internals.Manager.prototype.build = function (type, name, rawSchema) {

    Validate.assert('Schema', rawSchema, 'Invalid ' + name + ' object');
    var base = rawSchema.metaSchema.base;
    var keys = rawSchema.metaSchema.keys;
    if (internals.schemas[name]) {
        throw new Error('Schema name ' + name + ' has already been registered');
    }
    if (name !== 'control') {
        rawSchema.schema.additionalProperties = false;
    }
    rawSchema.schema.type = 'object';
    if (type === 'collections') {
        this.models.push({
            collectionName: name,
            keys: keys ? keys : null
        });
        rawSchema.schema.properties.control = {
            $ref: 'control'
        };
    }
    if (type === 'records') {
        this.models.push({
            collectionName: base,
            alias: name,
            keys: keys ? keys : null
        });
    }
    rawSchema.schema.title = type + ' schema for ' + name;
    internals.schemas[name] = rawSchema;

};


internals.Manager.prototype.validateData = function (json, schema, callback) {

    return internals.validator.validate(json, schema, function (errors, valid) {

        if (errors) {

            var err = Utils.arrayToObj(errors);
            return callback(err, false);
        }
        return callback(null, valid);

    });

};


internals.Manager.prototype.getRegisteredFormats = function () {

    return ZSchema.getRegisteredFormats();
};


internals.Manager.prototype.unRegisterFormats = function (names) {

    for (var i = 0, il = names.length; i < il; ++i) {
        var name = names[i];
        ZSchema.unregisterFormat(name);
    }
};


internals.Manager.prototype.addFormats = function (formats) {

    var keys = Object.keys(formats);
    for (var i = 0, il = keys.length; i < il; ++i) {
        var name = keys[i];
        var format = formats[name];
        if (this.formats[name]) {
            throw new Error('Format name ' + name + ' has already been registered');
        }
        this.formats[name] = format;
        internals.registeredFormats.push(name);
    }
};


internals.Manager.prototype.registerFormats = function (formats) {

    var keys = Object.keys(formats);
    for (var i = 0, il = keys.length; i < il; ++i) {
        var name = keys[i];
        var func = formats[name].bind(this);
        ZSchema.registerFormat(name, func);
    }
};


internals.Manager.prototype.getFormats = function () {

    return internals.registeredFormats;
};


internals.Manager.prototype.filterSchemas = function () {

    var retVal = [];
    var keys = Object.keys(internals.schemas);
    for (var i = 0, il = keys.length; i < il; ++i) {
        var name = keys[i];
        var rawSchema = internals.schemas[name];
        var schema = rawSchema.schema;
        internals.validator.setRemoteReference(name, schema);
        retVal.push(schema);
    };
    return retVal;
};


internals.Manager.prototype.find = function (match) {

    if (typeof match !== 'string') {
        return;
    }
    var retVal = {};
    var keys = Object.keys(internals.schemas);
    for (var i = 0, il = keys.length; i < il; ++i) {
        var name = keys[i];
        if (match === name) {
            retVal = internals.schemas[name].schema;
        }
    };
    return retVal;
};

internals.Manager.prototype.remove = function (name) {

    if (internals.schemas[name]) {
        delete internals.schemas[name];
    }

};


internals.Manager.prototype.resetAll = function () {

    internals.schemas = {};
};


internals.Manager.prototype.getSchemas = function () {

    return Object.keys(internals.schemas);
};
