'use strict';
// Load modules
var Hoek = require('hoek');
var Zschema = require('z-schema');
var Find = require('find-key');
var Validate = require('./validate.js');
var Utils = require('./utils.js');

var internals = {
    defaultFormats: ['date-time', 'date', 'email', 'hostname', 'host-name', 'ipv4', 'ipv6', 'regex', 'uri', 'strict-uri'],
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
    this.collections = [];
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
    var formats = this.findFormats();
    var registered = this.getRegisteredFormats();
    if (this.settings.registers) {
        this.registerFormats(this.settings.registers, formats);
    } else {
        for (var i = 0, il = registered.length; i < il; ++i) {
            var register = registered[i];
            if (formats.indexOf(register) > -1) {
                var whitelist =  new RegExp(internals.defaultFormats.join('|'), 'i').test(register);
                if (!whitelist) {
                    throw new Error(register + ' has not been registered');
                }
            }

        }
    }
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
    this.schemaSet.collections[name] = schema;
    return this.schemaSet.collections[name];
};


internals.Manager.prototype.createMany = function (schemas) {

    var length = schemas.length;
    for (var a = 0; a < length; ++a) {
        var schema = schemas[a];
        this.create(schema);
    }
};


internals.Manager.prototype.build = function (schema) {

    var obj = schema;
    var name = obj.metaSchema.name;
    var keys = obj.metaSchema.keys;
    var type = obj.metaSchema.type;
    var base = obj.metaSchema.base;
    obj.schema.additionalProperties = false;
    obj.schema.type = 'object';
    obj.schema.title = obj.metaSchema.type + ' schema for ' + name;
    this.collections.push({

        name: name,
        keys: keys
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
    return;
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

internals.Manager.prototype.findFormats = function () {

    var formats;
    for (var i = 0, il = this.schemas.length; i < il; ++i) {

        var schema = this.schemas[i];
        formats = Find(schema, 'format');

    }
    return formats;
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

    if (this.schemaSet.collections[name]) {
        this.schemaSet.collections[name] = null;
        delete this.schemaSet.collections[name];
    } else {
        return false;
    }
    return true;
};


internals.Manager.prototype.resetAll = function () {

    this.schemas = [];
    this.schemaSet = {
        collections: {}
    };
    return true;
};


internals.Manager.prototype.getCollections = function () {

    return Object.keys(this.schemaSet.collections);
};


internals.Manager.prototype.getSchemas = function () {

    return this.schemas;
};
