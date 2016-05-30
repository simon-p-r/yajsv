'use strict';

const Parse = require('./parse.js');
const Validate = require('./validate.js');
const Utils = require('basic-utils');

const internals = {};

module.exports = internals.Manager = class Manager {

    constructor(options) {

        Validate.assert('options', options);
        this._settings = Object.assign({}, options);
        this._cache = {
            definitions: {},
            records: {}
        };
        this.definitions = {};
        this.records = {};
        this.formats = {};
        if (this._settings.formats) {
            this.addFormats(this._settings.formats);
        }
    }

    addSchemas(rawSchemas) {

        let name;
        let schema;
        let type;
        if (Utils.isArray(rawSchemas)) {

            Validate.assert('AddArray', rawSchemas);
            for (let i = 0; i < rawSchemas.length; ++i) {
                schema = rawSchemas[i];
                type = schema.metaSchema.type + 's';
                name = schema.metaSchema.name;
                this._cache[type][name] = schema;
            }
        }
        else {

            Validate.assert('SchemaSet', rawSchemas);
            const types = Object.keys(rawSchemas);
            for (let i = 0; i < types.length; ++i) {
                type = types[i];
                const schemas = Object.keys(rawSchemas[type]);
                for (let j = 0; j < schemas.length; ++j) {
                    name = schemas[j];
                    schema = rawSchemas[type][name];
                    this._cache[type][name] = schema;
                }
            };
        }
    }

    addFormats(formats) {

        const keys = Object.keys(formats);
        for (let i = 0; i < keys.length; ++i) {
            const name = keys[i];
            const format = formats[name];
            if (this.formats[name]) {
                throw new Error('Format name ' + name + ' has already been registered');
            }
            this.formats[name] = format;
        }
    }

    compile() {

        const defs = Object.keys(this._cache.definitions);
        for (let i = 0; i < defs.length; ++i) {

            const name = defs[i];
            this.definitions[name] = Parse.schema(this._cache.definitions[name], this._cache.definitions);
        }
        const recs = Object.keys(this._cache.records);
        for (let i = 0; i < recs.length; ++i) {

            const name = recs[i];
            this.records[name] = Parse.schema(this._cache.records[name], this._cache.definitions);
        }
    }

    toJson(match) {

        let json;
        let schema;
        this.compile();
        const recs = this.records;
        const keys = Object.keys(recs);
        if (match === '*') {

            for (let i = 0; i < keys.length; ++i) {

                const name = keys[i];
                schema = recs[name].schema;
                json = {};
                json[name] = JSON.stringify(schema, null, 4);
            }
        }
        else {

            if (recs[match]) {
                schema = recs[match].schema;
                json = JSON.stringify(schema, null, 4);
            }
            else {
                return;
            }

        }
        return json;
    }
};
