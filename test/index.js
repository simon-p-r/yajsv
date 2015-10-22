'use strict';

var Code = require('code');
var Hoek = require('hoek');
var Lab = require('lab');
var Manager = require('../lib/index.js');
var Plus = require('require-plus');
var Schemata = new Plus({
    directory: './fixtures/schemata'
}).moduleSet;
var Formats = require('./fixtures/formats.js');

// Set-up lab
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('Manager', function () {

    it('should throw an error constructed without new', function (done) {

        var fn = function () {

            Manager();
        };

        expect(fn).throws(Error);
        done();

    });

    it('should throw when passing an invalid parameter to addSchemas method', function (done) {

        var manager = new Manager({
            formats: Formats
        });

        expect(function () {

            manager.addSchemas('invalid parameter');
        }).throws(Error);
        done();

    });

    it('should throw when passing an invalid schemaSet to addSchemas method', function (done) {

        var manager = new Manager({
            formats: Formats
        });
        var copy = Hoek.clone(Schemata);
        delete copy.records.rec.metaSchema.base;
        manager.addSchemas(copy);
        manager.compile();
        expect(manager.records.rec.schema.properties.id).to.not.exist();
        done();

    });

    it('should load an object set of schemas', function (done) {

        var manager = new Manager({
            formats: Formats
        });
        manager.addSchemas(Schemata);
        manager.compile();
        expect(manager.records).to.be.an.object();
        done();

    });

    it('should load an array of schemas', function (done) {

        var manager = new Manager();
        var Schemas = [];
        Object.keys(Schemata).forEach(function (type) {

            Object.keys(Schemata[type]).forEach(function (name) {

                Schemas.push(Schemata[type][name]);
            });

        });
        manager.addSchemas(Schemas);
        manager.compile();
        expect(manager.definitions).to.be.an.object();
        done();

    });

    it('should load custom formats', function (done) {

        var manager = new Manager({
            formats: Formats
        });
        manager.addSchemas(Schemata);
        manager.addFormats({
            custom: function (str) {

                return true;
            }
        });
        manager.compile();
        expect(Object.keys(manager.formats)).to.include(['custom']);
        done();
    });

    it('should throw if same custom format is registered twice', function (done) {

        var manager = new Manager({
            formats: Formats
        });
        manager.addSchemas(Schemata);
        manager.addFormats({
            custom: function (str) {

                return true;
            }
        });
        expect(function () {

            manager.addFormats({
                custom: function (str) {

                    return true;
                }
            });
        }).throws(Error);
        done();
    });

    it('should expose a toJson method and returns stringified schemas', function (done) {

        var manager = new Manager({
            formats: Formats
        });
        manager.addSchemas(Schemata);
        var json = manager.toJson('*');
        expect(json.rec).to.be.a.string();
        var rec = manager.toJson('rec');
        expect(rec).to.be.a.string();
        var person = manager.toJson('person');
        expect(person).to.be.undefined();
        done();
    });


});
