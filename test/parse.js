'use strict';

const Code = require('code');
const Hoek = require('hoek');
const Lab = require('lab');
const Parse = require('../lib/parse.js');
const Plus = require('require-plus');
const Schema = require('./fixtures/schemata/definitions/def.js');

// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Parse', () => {

    it('should return undefined when argument object argument is not an object', (done) => {

        expect(Parse.schema()).to.be.undefined();
        expect(Parse.schema({})).to.be.undefined();
        done();

    });

    it('should throw an error if lookup type does not exist within an object of definitions', (done) => {

        const moduleSet = Plus({
            directory: './fixtures/schemata'
        });
        const copy = Hoek.clone(Schema);
        const key = '$ref.createdBy';
        copy.schema.properties[key] = 'invalid';
        expect(() => {

            Parse.schema(copy, moduleSet.definitions);
        }).throws(Error);
        done();

    });

    it('should throw an error if lookup type does not exist within an array of definitions', (done) => {

        const moduleSet = Plus({
            directory: './fixtures/schemata'
        });
        const copy = Hoek.clone(Schema);
        const key = '$ref.createdBy';
        copy.schema.oneOf = [key];
        expect(() => {

            Parse.schema(copy, moduleSet.definitions);
        }).throws(Error);
        done();

    });

    it('should return a parsed schema', (done) => {

        const moduleSet = Plus({
            directory: './fixtures/schemata'
        });
        expect(Parse.schema(Schema, moduleSet.definitions)).to.be.an.object();
        done();

    });

});
