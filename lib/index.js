'use strict';

// Load modules
var Hoek = require('hoek');
var Zschema = require('z-schema');

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
    this.settings = Hoek.applyToDefaults(internals.defaults, options);
    this.db = this.settings.db;
    this.registeredFormats = [];
    if (this.settings.formats) {
        this.registerFormats(this.settings.formats);
    }
    this.models = [];
    this.schemaSet = {
        collections: {}
    };
    this.schemas = [];
    this.zSchema =
    this.validator = new Zschema(this.settings.zSchema);
    return this;

};


internals.Manager.prototype.compile = function () {

    var self = this;
    var errs = {};
    var jSchemas = this.filterSchemas();
    jSchemas.forEach(function (schema) {

        var valid = self.validator.validateSchema(schema);
        if (!valid) {
            var error = self.validator.getLastError();
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


internals.Manager.prototype.create = function (rawSchema) {

    Validate.assert('Schema', rawSchema, 'Invalid ' + rawSchema.metaSchema.name + ' object');
    var name = rawSchema.metaSchema.name;
    var schema = this.build(rawSchema);
    this.schemas.push(schema);
    this.schemaSet[name] = schema;
    return this.schemaSet[name];
};


internals.Manager.prototype.createMany = function (schemas) {

    var length = schemas.length;
    for (var a = 0; a < length; ++a) {
        var schema = schemas[a];
        this.create(schema);
    }
};


internals.Manager.prototype.build = function (obj) {

    obj.schema.title = obj.metaSchema.type + ' schema for ' + obj.metaSchema.name;
    this.models.push({

        name: obj.metaSchema.name,
        keys: obj.metaSchema.keys
    });
    return obj;
};


internals.Manager.prototype.validateData = function (json, schema, callback) {

    return this.validator.validate(json, schema, function (errors, valid) {

        if (errors) {

            var err = new Error(Utils.arrayToObj(errors));
            return callback(err, false);
        }
        return callback(null, valid);

    });

};


internals.Manager.prototype.getRegisteredFormats = function () {

    return Zschema.getRegisteredFormats();
};


internals.Manager.prototype.unRegisterFormats = function (names) {

    for (var i = 0, il = names.length; i < il; ++i) {
        var name = names[i];
        Zschema.unregisterFormat(name);
    }
};


internals.Manager.prototype.registerFormats = function (register) {

    var keys = Object.keys(register);
    for (var i = 0, il = keys.length; i < il; ++i) {
        var name = keys[i];
        var func = register[name].bind(this);
        Zschema.registerFormat(name, func);
        this.registeredFormats.push(name);
    }

};


internals.Manager.prototype.getFormats = function () {

    return this.registeredFormats;
};


internals.Manager.prototype.filterSchemas = function () {

    var results = [];
    var schemas = this.schemas;
    schemas.filter(function (obj) {

        results.push(obj.schema);

    });
    return results;
};


internals.Manager.prototype.find = function (name) {

    if (typeof name !== 'string') {
        return;
    }
    var result;
    var schemas = this.schemas;
    schemas.filter(function (obj) {

        if (obj.metaSchema.name === name) {

            result = obj.schema;

        }
    });
    return result;
};


internals.Manager.prototype.remove = function (name) {

    if (this.schemaSet[name]) {
        delete this.schemaSet[name];
    }

};


internals.Manager.prototype.resetAll = function () {

    this.schemas = [];
    this.schemaSet = {};
    return true;
};


internals.Manager.prototype.getCollections = function () {

    return Object.keys(this.schemaSet);
};


internals.Manager.prototype.getSchemas = function () {

    return this.schemas;
};
