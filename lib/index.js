'use strict';

var Merge = require('deepmerge');
var Parse = require('./parse.js');
var Validate = require('./validate.js');
var Utils = require('basic-utils');

var internals = {};

module.exports = internals.Manager = class Manager {

    constructor (options) {

        Validate.assert('options', options);
        this._settings = Object.assign({}, options);
        this.collections = {};
        this.definitions = {};
        this.records = {};
        this.formats = {};
        if (this._settings.formats) {
            this.addFormats(this._settings.formats);
        }
    }

    addSchemas (rawSchemas) {

        var name, schema, type;
        if (Utils.isArray(rawSchemas)) {

            Validate.assert('AddArray', rawSchemas);
            for (var a = 0, al = rawSchemas.length; a < al; ++a) {
                schema = rawSchemas[a];
                type = schema.metaSchema.type + 's';
                name = schema.metaSchema.name;
                this[type][name] = schema;
            }
        } else {

            Validate.assert('SchemaSet', rawSchemas);
            var types = Object.keys(rawSchemas);
            for (var i = 0, il = types.length; i < il; ++i) {
                type = types[i];
                var schemas = Object.keys(rawSchemas[type]);
                for (var s = 0, sl = schemas.length; s < sl; ++s) {
                    name = schemas[s];
                    this[type][name] = rawSchemas[type][name];
                }
            };
        }
    }

    addFormats (formats) {

        var keys = Object.keys(formats);
        for (var i = 0, il = keys.length; i < il; ++i) {
            var name = keys[i];
            var format = formats[name];
            if (this.formats[name]) {
                throw new Error('Format name ' + name + ' has already been registered');
            }
            this.formats[name] = format;
        }
    }

    compile () {

        var name;
        var definitions = Object.keys(this.definitions);
        for (var i = 0, il = definitions.length; i < il; ++i) {

            name = definitions[i];
            this.definitions[name] = Parse.schema(this.definitions[name], '$ref', this.definitions);
        }
        var collections = Object.keys(this.collections);
        for (var e = 0, el = collections.length; e < el; ++e) {

            name = collections[e];
            this.collections[name] = Parse.schema(this.collections[name], '$ref', this.definitions);

        }
        var recs = Object.keys(this.records);
        for (var a = 0, al = recs.length; a < al; ++a) {

            name = recs[a];
            this.records[name] = Parse.schema(this.records[name], '$ref', this.definitions);
            var base = this.records[name].metaSchema.base;
            if (base && this.collections[base]) {
                var toExtend = this.collections[base];
                this.records[name] = Merge(toExtend, this.records[name]);
            }
        }

    }

    toJson (match) {

        var json;
        var name;
        var schema;
        this.compile();
        var recs = this.records;
        var keys = Object.keys(recs);
        if (match === '*') {

            for (var i = 0, il = keys.length; i < il; ++i) {

                name = keys[i];
                schema = recs[name].schema;
                json = {};
                json[name] = JSON.stringify(schema, null, 4);
            }
        } else {

            if (recs[match]) {
                schema = recs[match].schema;
                json = JSON.stringify(schema, null, 4);
            } else {
                return;
            }

        }
        return json;
    }
};
