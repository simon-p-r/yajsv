'use strict';

var Hoek = require('hoek');
var Merge = require('deepmerge');
var Parse = require('./parse.js');
var Validate = require('./validate.js');
var Utils = require('basic-utils');

var internals = {
    collections: {},
    definitions: {},
    records: {}
};

module.exports = internals.Manager = class Manager {

    constructor (options) {

        Hoek.assert(typeof options === 'object', 'Manager must be constructed with a valid options object');
        internals.settings = options;
        this.formats = {};
        this.addFormats(internals.settings.formats);
    }

    addSchemas (rawSchemas) {

        var name, schema, type;
        if (Utils.isArray(rawSchemas)) {

            Validate.assert('AddArray', rawSchemas);
            for (var a = 0, al = rawSchemas.length; a < al; ++a) {
                schema = rawSchemas[a];
                type = schema.metaSchema.type + 's';
                name = schema.metaSchema.name;
                internals[type][name] = schema;
            }
        } else {

            Validate.assert('SchemaSet', rawSchemas);
            var types = Object.keys(rawSchemas);
            for (var i = 0, il = types.length; i < il; ++i) {
                type = types[i];
                var schemas = Object.keys(rawSchemas[type]);
                for (var s = 0, sl = schemas.length; s < sl; ++s) {
                    name = schemas[s];
                    internals[type][name] = rawSchemas[type][name];
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

        var schemas = {};
        var defs = {};
        var colls = {};
        var name;
        var formats = internals.settings.formats;
        var definitions = Object.keys(internals.definitions);
        for (var i = 0, il = definitions.length; i < il; ++i) {

            name = definitions[i];
            defs[name] = Parse.schema(internals.definitions[name], '$ref', internals.definitions);
        }
        var collections = Object.keys(internals.collections);
        for (var e = 0, el = collections.length; e < el; ++e) {

            name = collections[e];
            colls[name] = Parse.schema(internals.collections[name], '$ref', internals.definitions);

        }
        var recs = Object.keys(internals.records);
        for (var a = 0, al = recs.length; a < al; ++a) {

            name = recs[a];
            schemas[name] = Parse.schema(internals.records[name], '$ref', internals.definitions);
            var base = schemas[name].metaSchema.base;
            if (base && colls[base]) {
                var toExtend = colls[base];
                schemas[name] = Merge(toExtend, schemas[name]);
            }
        }

        return {
            schemas,
            formats
        };
    }

    toJson (match) {

        var json;
        var name;
        var schema;
        var compiled = this.compile();
        var recs = compiled.schemas;
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
