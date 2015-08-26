// Load modules
var Hoek = require('hoek');
var Zschema = require('z-schema');
var Find = require('find-key');
var Validate = require('./validate.js');
var Register = require('./register.js');


var internals = {
    defaultFormats: ['date-time', 'date', 'email', 'hostname', 'host-name', 'ipv4', 'ipv6', 'regex', 'uri', 'strict-uri'],
    defaults: {
        zSchema: {
            reportPathAsArray: true,
            noTypeless: true,
            noEmptyStrings: true,
            noEmptyArrays: true
        },
        registers: Register
    }

};

module.exports = internals.Manager = function (options) {

    Hoek.assert(this.constructor === internals.Manager, 'Manager must be created using new');
    Hoek.assert(typeof options === 'object', 'Manager must be constructed with a valid options object');
    this.settings = Hoek.applyToDefaults(internals.defaults, options);
    this.db = this.settings.db;
    this.registeredFormats = [];
    this.collections = [];
    this.schemaSet = {
        collections: {},
        definitions: {},
        records: {}
    };
    this.schemas = [];
    this.validator = new Zschema(this.settings.zSchema);
    return this;

};


internals.Manager.prototype.compile = function () {

    var self = this;
    var errors = {};
    var formats = this.findFormats();
    this.registerFormats(formats);
    var jSchemas = this.filterSchemas();
    jSchemas.forEach(function (schema) {

        var valid = self.validator.validateSchema(schema);
        if (!valid) {
            var error = self.validator.getLastError();
            errors[schema.id] = 'failed validation with ' + error.message;
        }
    });
    return {
        errors: Object.keys(errors).length ? errors : null,
        valid: Object.keys(errors).length ? false : true
    };
};


internals.Manager.prototype.create = function (rawSchema) {

    Validate.assert('Schema', rawSchema, 'Invalid ' + rawSchema.metaSchema.name + ' object');
    var type = rawSchema.metaSchema.type + 's';
    var name = rawSchema.metaSchema.name;
    var schema = this.build(rawSchema);
    this.schemas.push(schema);
    this.schemaSet[type][name] = schema;
    return this.schemaSet[type][name];
};


internals.Manager.prototype.build = function (schema) {

    var obj = schema;
    var name = obj.metaSchema.name;
    var keys = obj.metaSchema.keys;
    var type = obj.metaSchema.type;
    var subtype = obj.metaSchema.base;
    if (name !== 'control') {
        obj.schema.additionalProperties = false;
    }
    obj.schema.type = 'object';
    if (type === 'collection') {

        obj.schema.properties.control = {
            $ref: 'control'
        };
        this.collections.push({

            name: name,
            keys: keys
        });
    }

    if (type === 'record') {

        var base =  Hoek.clone(this.schemaSet.collections[subtype]);
        var extension = Hoek.applyToDefaults(base.schema.properties.recProps, obj.schema);
        obj.schema = base.schema;
        obj.schema.properties.recProps = extension;

    }
    obj.schema.title = subtype ? subtype + ' schema for ' + name : obj.metaSchema.type + ' schema for ' + name;
    this.validator.setRemoteReference(name, obj.schema);
    return obj;
};


internals.Manager.prototype.validateData = function (json, schema, callback) {

    return this.validator.validate(json, schema, function (errors, valid) {

        if (!valid) {
            var es = [];
            errors.forEach(function (error) {

                es.push(error.message + error.path);
            });
            return callback(es, false);
        }
        return callback(null, valid);

    });

};


internals.Manager.prototype.getRegisteredFormats = function () {

    return Zschema.getRegisteredFormats();
};


internals.Manager.prototype.addFormat = function (name, func) {

    if (!Register[name]) {
        Register[name] = func;
        var binded = Register[name].bind(this);
        Zschema.registerFormat(name, binded);
        this.registeredFormats.push(name);
    }

};


internals.Manager.prototype.registerFormats = function (formats) {

    var length = formats.length;
    for (var i = 0, il = length; i < il; ++i) {

        var name = formats[i];
        var blacklist = new RegExp(internals.defaultFormats.join('|'), 'i').test(name);
        if (!blacklist) {
            if (Register[name]) {
                var func = Register[name].bind(this);
                Zschema.registerFormat(name, func);
                this.registeredFormats.push(name);
            } else {
                // throw new Error(name, 'format has no matching function for registering');
            }

        }

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
    var length = this.schemas.length;
    for (var i = 0, il = length; i < il; ++i) {

        var schema = this.schemas[i];
        formats = Find(schema, 'format');

    }
    return formats;
};


internals.Manager.prototype.find = function (name) {

    var result;
    var schemas = this.schemas;
    schemas.filter(function (obj) {

        if (obj.metaSchema.name === name) {

            result = obj.schema;

        }
    });
    return result;
};


internals.Manager.prototype.remove = function (name, type) {

    this.schemaSet[type][name] = null;
    delete this.schemaSet[type][name];
    this.schemas.filter(function (obj) {

        return obj.name !== name;
    });
};


internals.Manager.prototype.resetAll = function () {

    this.schemas = [];
    this.schemaSet = {
        collections: {},
        definitions: {},
        records: {}
    };
    return true;
};


internals.Manager.prototype.getCollections = function () {

    return Object.keys(this.schemaSet.collections);
};


internals.Manager.prototype.getDefinitions = function () {

    return Object.keys(this.schemaSet.definitions);
};


internals.Manager.prototype.getRecords = function () {

    return Object.keys(this.schemaSet.records);
};


internals.Manager.prototype.getSchemas = function () {

    return this.schemas;
};
