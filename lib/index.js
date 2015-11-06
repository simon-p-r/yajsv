'use strict';

const Parse = require('./parse.js');
const Validate = require('./validate.js');
const Utils = require('basic-utils');

const internals = {};

module.exports = internals.Manager = class Manager {

    constructor (options) {

        Validate.assert('options', options);
        this._settings = Object.assign({}, options);
        this._cache = {};
        this.definitions = {};
        this.records = {};
        this.formats = {};
        if (this._settings.formats) {
            this.addFormats(this._settings.formats);
        }
    }

    addSchemas (rawSchemas) {

        let name;
        let schema;
        let type;
        if (Utils.isArray(rawSchemas)) {

            Validate.assert('AddArray', rawSchemas);
            for (let a = 0, al = rawSchemas.length; a < al; ++a) {
                schema = rawSchemas[a];
                type = schema.metaSchema.type + 's';
                name = schema.metaSchema.name;
                this._cache[name] = schema;
            }
        }
        else {

            Validate.assert('SchemaSet', rawSchemas);
            const types = Object.keys(rawSchemas);
            for (let i = 0, il = types.length; i < il; ++i) {
                type = types[i];
                const schemas = Object.keys(rawSchemas[type]);
                for (let s = 0, sl = schemas.length; s < sl; ++s) {
                    name = schemas[s];
                    schema = rawSchemas[type][name];
                    this._cache[name] = schema;
                }
            };
        }
    }

    addFormats (formats) {

        const keys = Object.keys(formats);
        for (let i = 0, il = keys.length; i < il; ++i) {
            const name = keys[i];
            const format = formats[name];
            if (this.formats[name]) {
                throw new Error('Format name ' + name + ' has already been registered');
            }
            this.formats[name] = format;
        }
    }

    compile () {

        const keys = Object.keys(this._cache);
        for (let i = 0, il = keys.length; i < il; ++i) {

            const name = keys[i];
            const type = this._cache[name].metaSchema.type;
            if (type === 'definition') {
                this.definitions[name] = Parse.schema(this._cache[name], this._cache);
            }
            if (type === 'record') {
                this.records[name] = Parse.schema(this._cache[name], this._cache);
            }
        }

    }

    toJson (match) {

        let json;
        let name;
        let schema;
        this.compile();
        const recs = this.records;
        const keys = Object.keys(recs);
        if (match === '*') {

            for (let i = 0, il = keys.length; i < il; ++i) {

                name = keys[i];
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
