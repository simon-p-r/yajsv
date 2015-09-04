// Load modules

var Code = require('code');
var Lab = require('lab');
var Mongodb = require('mongodb');
var Manager = require('../lib');
var Schemas = require('./fixtures/schemas/index.js');
var Invalid = require('./fixtures/schemas/collections/invalid.js');
var Json = require('./fixtures/data/dummy.json');


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
        var removed = manager.remove('dummy', 'collections');
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
        var schema = manager.find('dummy');
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

    it('should throw an error if base is missing from a definition or record collection', function (done) {

        var manager = new Manager({});
        var forValidation = [];
        var schemes = Object.keys(Schemas);
        schemes.forEach(function (scheme) {

            var testSchema = Schemas[scheme];
            if (testSchema.metaSchema.name !== 'address') {

                forValidation.push(testSchema);
            }

        });
        manager.createMany(forValidation);
        expect(function () {

            manager.compile();
        }).to.throw();
        done();

    });

    it('should test validateData async method with dummy schema designed to test all custom formats', function (done) {

        var manager = new Manager({ });
        var schemes = Object.keys(Schemas);
        schemes.forEach(function (scheme) {

            var testSchema = Schemas[scheme];
            expect(manager.create(testSchema)).to.be.an.object();

        });
        var schema = manager.schemaSet.collections.dummy.schema;
        manager.compile();
        Mongodb.connect('mongodb://localhost:27017/schemas', { auto_reconnect: true }, function (err, db) {

            manager.db = db;

            manager.validateData(Json, schema, function (err, valid) {

                expect(err).to.be.null();
                expect(valid).to.be.true();

                Json.dbRef.q = 'Bedfordshire';
                manager.validateData(Json, schema, function (errA, validA) {

                    expect(errA).to.be.an.array();
                    expect(validA).to.be.false();

                    Json.dbRef.q = {
                        county: 'Bedfordshire'
                    };
                    manager.validateData(Json, schema, function (errB, validB) {

                        expect(errB).to.be.null();
                        expect(validB).to.be.true();

                        Json.dbRef.cn = 'invalid';
                        manager.validateData(Json, schema, function (errC, validC) {

                            expect(errC).to.be.an.array();
                            expect(validC).to.be.false();

                            Json.dbRef.cn = 'county';
                            Json.luRef.lv = null;
                            delete Json.luRef.lv;
                            Json.luRef.lv = 'iban';
                            manager.validateData(Json, schema, function (errD, validD) {

                                expect(errD).to.be.null();
                                expect(validD).to.be.true();

                                Json.luRef.lv = null;
                                delete Json.luRef.lv;
                                Json.luRef.lv = 'oooppps';
                                manager.validateData(Json, schema, function (errE, validE) {

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
