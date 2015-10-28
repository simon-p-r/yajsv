'use strict';

var Code = require('code');
var Hoek = require('hoek');
var Lab = require('lab');
var Parse = require('../lib/parse.js');
var Plus = require('require-plus');
var Schema = require('./fixtures/schemata/definitions/def.js');

// Set-up lab
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('Parse', function () {

    it('should return undefined when argument object argument is not an object', function (done) {

        expect(Parse.schema()).to.be.undefined();
        var obj = {};
        expect(Parse.schema(obj)).to.be.undefined();
        // expect(Parse.schema(obj, '$ref')).to.be.undefined();
        done();

    });

    it('should throw an error if lookup type does not exist within an object of definitions', function (done) {

        var moduleSet = new Plus({
            directory: './fixtures/schemata'
        }).moduleSet;
        var copy = Hoek.clone(Schema);
        var key = '$ref.createdBy';
        copy.schema.properties[key] = 'invalid';
        expect(function () {

            Parse.schema(copy, moduleSet.definitions);
        }).throws(Error);
        done();

    });

    it('should throw an error if lookup type does not exist within an array of definitions', function (done) {

        var moduleSet = new Plus({
            directory: './fixtures/schemata'
        }).moduleSet;
        var copy = Hoek.clone(Schema);
        var key = '$ref.createdBy';
        copy.schema.oneOf = [key];
        expect(function () {

            Parse.schema(copy, moduleSet.definitions);
        }).throws(Error);
        done();

    });

    it('should return a parsed schema', function (done) {

        var moduleSet = new Plus({
            directory: './fixtures/schemata'
        }).moduleSet;
        expect(Parse.schema(Schema, moduleSet.definitions)).to.be.an.object();
        done();

    });

});
