// Load modules

var Code = require('code');
var Lab = require('lab');
var Hoek = require('hoek');
var Manager = require('../lib');
var Plus = require('require-plus');

var CFormats = require('./fixtures/formats/formats.js');
var Formats = require('./fixtures/formats/index.js');
var Schemas = require('./fixtures/schemas/index.js');
var Invalid = require('./fixtures/schemas/invalid/invalid.js');
var Json = require('./fixtures/data/dummy.json');
var Duplicates = require('./fixtures/schemas/invalid/duplicates.js');


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

    it('should throw an error when registering a schema already within schema namespace', function (done) {

        var manager = new Manager({
            formats: Formats
        });
        expect(function () {

            manager.addSchemas(Duplicates);

        }).throws(Error);
        done();

    });

    it('should throw an error when invalid parmater used for addSchemas method', function (done) {

        var manager = new Manager({
            formats: Formats
        });
        var original = Hoek.clone(Invalid);
        expect(function () {

            delete Invalid.metaSchema;
            manager.addSchemas([Invalid]);

        }).throws(Error);
        Invalid = Hoek.clone(original);
        done();

    });

    it('should throw an error when adding a format namespace twice', function (done) {

        var func = {
            custom: function (str) {

                return true;
            }
        };
        var manager = new Manager({
            formats: func
        });
        expect(function () {

            manager.addFormats(func);

        }).throws(Error);
        done();

    });

    it('should throw an error when adding an invalid parameter to addSchema method', function (done) {

        var manager = new Manager({
            formats: Formats
        });
        expect(function () {

            manager.addSchema([]);

        }).throws(Error);

        expect(function () {

            manager.addSchema({
                metaSchema: {
                    type: 'collection',
                    name: 'hello'

                }
            });

        }).throws(Error);
        done();

    });

    it('should expose crud methods', function (done) {

        var manager = new Manager({
            formats: Formats
        });
        var moduleSet = new Plus({
            directory: './fixtures/schemas/schemata'
        }).moduleSet;
        delete moduleSet.invalid;
        manager.addSchemas(moduleSet);
        manager.remove('dummy', 'collections');
        var invalid = manager.remove('device', []);
        expect(invalid).to.be.undefined();
        var moreInvalid = manager.remove({}, 'collections');
        expect(moreInvalid).to.be.undefined();
        manager.resetAll();
        done();

    });

    it('should add custom formats to core registered formats', function (done) {

        var manager = new Manager({
            formats: Formats
        });
        var moduleSet = new Plus({
            directory: './fixtures/schemas/schemata'
        }).moduleSet;
        delete moduleSet.invalid;
        manager.addSchemas(moduleSet);
        var obj = {

            custom: function (str) {

                return true;
            },
            anotherCustom: function (str) {

                return true;
            }
        };
        manager.addFormats(obj);
        manager.addFormats(CFormats);
        manager.compile();
        expect(Object.keys(manager.formats)).to.be.an.array().and.include(['custom']);
        done();

    });


    it('should test if formats can be unregistered', function (done) {

        var manager = new Manager({
            formats: Formats
        });
        manager.unRegisterFormats(['duration', 'dbRef', 'password', 'phone', 'postcode', 'vat', 'lookup', 'iban', 'contact', 'amt']);
        done();

    });


    it('should create error objects for failed z-schema validation', function (done) {

        var manager = new Manager({
            zSchema: {
                strictMode: true
            },
            formats: Formats
        });
        manager.addSchemas([Invalid]);
        var result = manager.compile();
        expect(result.valid).to.be.false();
        expect(Object.keys(result.errors)).to.have.length(1);
        done();

    });

    it('should expose manager lookup methods', function (done) {

        var manager = new Manager({});
        manager.addSchemas(Schemas);
        manager.compile();
        var schema = manager.find('dummy');
        expect(schema).to.be.an.object().to.include('id', 'type', 'format');
        var undef = manager.find({});
        expect(undef).to.be.undefined();
        var formats = manager.getFormats();
        expect(formats).to.be.an.array();
        var schemas = manager.getSchemas();
        expect(schemas).to.be.an.array();
        var validator = manager.getValidator();
        expect(validator).to.be.an.object();
        done();

    });

});
