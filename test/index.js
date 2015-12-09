'use strict';

const Code = require('code');
const Hoek = require('hoek');
const Lab = require('lab');
const Manager = require('../lib/index.js');
const Plus = require('require-plus');

const Schemata = Plus({
    directory: './fixtures/schemata'
});
const Formats = require('./fixtures/formats.js');

// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Manager', () => {

    it('should throw an error constructed without new', (done) => {

        const fn = () => {

            Manager();
        };

        expect(fn).throws(Error);
        done();

    });

    it('should throw when passing an invalid parameter to addSchemas method', (done) => {

        const manager = new Manager({
            formats: Formats
        });

        expect(() => {

            manager.addSchemas('invalid parameter');
        }).throws(Error);
        done();

    });

    it('should throw when passing an invalid schemaSet to addSchemas method', (done) => {

        const manager = new Manager({
            formats: Formats
        });
        const copy = Hoek.clone(Schemata);
        delete copy.records.rec.metaSchema;
        expect(() => {

            manager.addSchemas(copy);
        }).throws(Error);
        done();

    });

    it('should load an object set of schemas', (done) => {

        const manager = new Manager({
            formats: Formats
        });
        manager.addSchemas(Schemata);
        manager.compile();
        expect(manager.records).to.be.an.object();
        done();

    });

    it('should load an array of schemas', (done) => {

        const manager = new Manager();
        const Schemas = [

            require('./fixtures/schemata/records/extendRec.js'),
            require('./fixtures/schemata/records/rec.js'),
            require('./fixtures/schemata/definitions/def.js'),
            require('./fixtures/schemata/definitions/otherDef.js')
        ];
        manager.addSchemas(Schemas);
        manager.compile();
        expect(manager.records.extendRec.schema.properties).to.be.an.object();
        done();

    });

    it('should load custom formats', (done) => {

        const manager = new Manager({
            formats: Formats
        });
        manager.addSchemas(Schemata);
        manager.addFormats({
            custom: (str) => {

                return true;
            }
        });
        manager.compile();
        expect(Object.keys(manager.formats)).to.include(['custom']);
        done();
    });

    it('should throw if same custom format is registered twice', (done) => {

        const manager = new Manager({
            formats: Formats
        });
        manager.addSchemas(Schemata);
        manager.addFormats({
            custom: (str) => {

                return true;
            }
        });
        expect(() => {

            manager.addFormats({
                custom: (str) => {

                    return true;
                }
            });
        }).throws(Error);
        done();
    });

    it('should expose a toJson method and returns stringified schemas', (done) => {

        const manager = new Manager({
            formats: Formats
        });
        manager.addSchemas(Schemata);
        const json = manager.toJson('*');
        expect(json.rec).to.be.a.string();
        const rec = manager.toJson('rec');
        expect(rec).to.be.a.string();
        const person = manager.toJson('invalid');
        expect(person).to.be.undefined();
        done();
    });

    // it('should generate schema from $ref notation from multi sources', function (done) {
    //
    //     var manager = new Manager({
    //         formats: Formats
    //     });
    //     manager.addSchemas(Schemata);
    //     manager.compile();
    //     expect(manager.records.extendRec.schema.properties.id.type).to.equal('string');
    //     expect(manager.records.extendRec.schema.properties.rec.properties.someProp.type).to.equal('string');
    //     expect(manager.records.extendRec.methods.preSave).to.be.a.function();
    //     expect(manager.records.extendRec.methods.preValidate).to.be.a.function();
    //     done();
    // });


});
