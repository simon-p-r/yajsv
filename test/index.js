// Load modules

var Code = require('code');
var Lab = require('lab');
var Manager = require('../lib');
var Schemas = require('./fixtures/schemas/index.js');
var Invalid = require('./fixtures/schemas/mocks/invalid.js');
var Device = require('./fixtures/data/device.json');
var Dbref = require('./fixtures/data/dbRef.json');
var Lookup = require('./fixtures/data/lookup.json');
var Mongodb = require('mongodb');

// Set-up lab
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('Manager', function () {

    it('should throw an error constructed without new', function (done) {

        var fn = function () {

            var manager = Manager();
        };

        expect(fn).throws(Error, 'Manager must be created using new');
        done();

    });

    it('should throw an error constructed without a valid options object', function (done) {

        var fn = function () {

            var manager = new Manager();
        };
        expect(fn).throws(Error, 'Manager must be constructed with a valid options object');
        done();

    });

    it('should throw an error if using a format without registering with z-schema', function (done) {

        var manager = new Manager({});
        var schemes = Object.keys(Schemas);
        var fn = function () {

            manager.registerFormats(['invalid']);
        };
        expect(fn).throws(Error);
        done();

    });

    it('should expose crud methods', function (done) {

        var manager = new Manager({});
        var schemes = Object.keys(Schemas);
        schemes.forEach(function (scheme) {

            var testSchema = Schemas[scheme];
            expect(manager.create(testSchema)).to.be.an.object();
            expect(function () {

                    manager.create(testSchema);
                }).to.not.throw();

        });
        var removed = manager.remove('device', 'collections');
        expect(manager.schemaSet.collections.device).to.not.exist();
        expect(removed).to.be.true();
        var invalid = manager.remove('device', []);
        expect(invalid).to.be.false();
        var moreInvalid = manager.remove({}, 'collections');
        expect(moreInvalid).to.be.false();
        manager.resetAll();
        expect(manager.schemaSet.collections.control).to.not.exist();
        done();

    });

    it('should add custom formats to core registered formats', function (done) {

        var manager = new Manager({});
        var schemes = Object.keys(Schemas);
        schemes.forEach(function (scheme) {

            var testSchema = Schemas[scheme];
            expect(manager.create(testSchema)).to.be.an.object();
            expect(function () {

                    manager.create(testSchema);
                }).to.not.throw();

        });
        var obj = {

            custom: function (str) {

                return true;
            },
            anotherCustom: function (str) {

                return true;
            }
        };
        manager.addFormats(obj);
        var invalid = {

            duration: function (str) {

                return true;
            }
        };
        var fn = function () {

            manager.addFormats(invalid);
        };
        expect(fn).throws(Error);
        var formats = manager.getRegisteredFormats();
        expect(formats).to.be.an.array().and.include(['custom']);
        done();

    });


    it('should create schema objects and pass zSchema validation', function (done) {

        var manager = new Manager({});
        var schemes = Object.keys(Schemas);
        schemes.forEach(function (scheme) {

            var testSchema = Schemas[scheme];
            expect(manager.create(testSchema)).to.be.an.object();
            expect(function () {

                    manager.create(testSchema);
                }).to.not.throw();

        });
        var result = manager.compile();
        expect(result.valid).to.be.true();
        expect(result.errors).to.be.null();
        done();

    });

    it('should create error objects for failed z-schema validation', function (done) {

        var manager = new Manager({
            zSchema: {
                strictMode: true
            }
        });
        manager.create(Invalid);
        var result = manager.compile();
        expect(result.valid).to.be.false();
        expect(Object.keys(result.errors)).to.have.length(1);
        done();

    });

    it('should create schema objects for validation', function (done) {

        var manager = new Manager({});
        var schemes = Object.keys(Schemas);
        schemes.forEach(function (scheme) {

            var testSchema = Schemas[scheme];
            expect(manager.create(testSchema)).to.be.an.object();
            expect(function () {

                    manager.create(testSchema);
                }).to.not.throw();

        });
        manager.compile();
        var formats = manager.getRegisteredFormats();
        expect(formats).to.be.an.array().and.include(['date-time']);
        manager.registerFormats(formats);
        done();

    });

    it('should expose manager lookup methods', function (done) {

        var manager = new Manager({ });
        var schemes = Object.keys(Schemas);
        schemes.forEach(function (scheme) {

            var testSchema = Schemas[scheme];
            expect(manager.create(testSchema)).to.be.an.object();

        });
        manager.compile();
        var schema = manager.find('device');
        expect(schema).to.be.an.object().to.include('id', 'type', 'format');
        var undef = manager.find({});
        expect(undef).to.be.undefined();
        var formats = manager.getFormats();
        expect(formats).to.be.an.array();
        var collections = manager.getCollections();
        var definitions = manager.getDefinitions();
        var records = manager.getRecords();
        var schemas = manager.getSchemas();
        expect(collections).to.be.an.array();
        expect(definitions).to.be.an.array();
        expect(records).to.be.an.array();
        expect(schemas).to.be.an.array();
        done();

    });

    it('should create an array of schema objects and pass zSchema validation', function (done) {

        var manager = new Manager({});
        var forValidation = [];
        var schemes = Object.keys(Schemas);
        schemes.forEach(function (scheme) {

            var testSchema = Schemas[scheme];
            forValidation.push(testSchema);

        });
        manager.createMany(forValidation);
        var result = manager.compile();
        expect(result.valid).to.be.true();
        expect(result.errors).to.be.null();
        done();

    });

    // it('should create errors with mongo validation for dbRef and lookup formats', function (done) {
    //
    //     var manager = new Manager({});
    //     var forValidation = [];
    //     var schemes = Object.keys(Schemas);
    //     schemes.forEach(function (scheme) {
    //
    //         var testSchema = Schemas[scheme];
    //         forValidation.push(testSchema);
    //
    //     });
    //     manager.createMany(forValidation);
    //     var Schema = manager.find('systemConfig');
    //     var result = manager.compile();
    //     Mongodb.connect('mongodb://localhost:27017/schemas', { auto_reconnect: true }, function (err, db) {
    //
    //         manager.db = db;
    //         manager.validateData(Dbref, Schema, function (err, valid) {
    //
    //             expect(err).to.be.an.array();
    //             expect(valid).to.be.false();
    //             db.close();
    //             done();
    //         });
    //
    //     });
    //
    //
    // });

    it('should test validateData async method with dummy schema designed to test all custom formats', function (done) {

        var manager = new Manager({ });
        var schemes = Object.keys(Schemas);
        schemes.forEach(function (scheme) {

            var testSchema = Schemas[scheme];
            expect(manager.create(testSchema)).to.be.an.object();

        });
        var Dummy = require('./fixtures/schemas/mocks/dummy.js');
        var schema = manager.create(Dummy).schema;
        manager.compile();
        var json = require('./fixtures/data/dummy.json');
        Mongodb.connect('mongodb://localhost:27017/schemas', { auto_reconnect: true }, function (err, db) {

            manager.db = db;

            manager.validateData(json, schema, function (err, valid) {

                expect(err).to.be.null();
                expect(valid).to.be.true();

                json.dbRef.q = 'Bedfordshire';
                manager.validateData(json, schema, function (errA, validA) {

                    expect(errA).to.be.an.array();
                    expect(validA).to.be.false();

                    json.dbRef.q = {
                        county: 'Bedfordshire'
                    };
                    manager.validateData(json, schema, function (errB, validB) {

                        expect(errB).to.be.null();
                        expect(validB).to.be.true();

                        json.dbRef.cn = 'invalid';
                        manager.validateData(json, schema, function (errC, validC) {

                            expect(errC).to.be.an.array();
                            expect(validC).to.be.false();

                            json.dbRef.cn = 'county';
                            json.luRef.lv = null;
                            delete json.luRef.lv;
                            json.luRef.lv = 'iban';
                            manager.validateData(json, schema, function (errD, validD) {

                                expect(errD).to.be.null();
                                expect(validD).to.be.true();

                                json.luRef.lv = null;
                                delete json.luRef.lv;
                                json.luRef.lv = 'oooppps';
                                manager.validateData(json, schema, function (errE, validE) {

                                    expect(errE).to.be.an.array();
                                    expect(validE).to.be.false();
                                    db.close();
                                    done();

                                });


                            });

                        });
                    });
                });
            });
        });
    });


});
