// Load modules

var Code = require('code');
var Lab = require('lab');
var OID = require('./fixtures/formats/oid.js');
var Postcode = require('./fixtures/formats/postcode.js');
var Phone = require('./fixtures/formats/telephone.js');


// Set-up lab
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('Formats', function () {

    it('should validate phone numbers', function (done) {

    // TODO - check string for text not numbers, doesn't check if it is another type

        expect(Phone('01234567890')).to.be.true();
        expect(Phone('07903 998709')).to.be.true();
        expect(Phone('01234-567890')).to.be.true();
        expect(Phone('1234 5678901')).to.be.false();
        expect(Phone('04234 590123')).to.be.false();
        expect(Phone(' 0113 496 0000')).to.be.false();
        expect(Phone('09876 534321')).to.be.false();
        expect(Phone('abcd')).to.be.false();
        expect(Phone('')).to.be.false();
        expect(Phone('+1234567890')).to.be.false();
        done();

    });

    it('should validate post codes', function (done) {

        expect(Postcode('AL9 5JN')).to.be.true();
        expect(Postcode('WC2E4RL')).to.be.true();
        expect(Postcode('AI-2640')).to.be.true();
        expect(Postcode('abc 1234')).to.be.false();
        done();

    });

    it('should validate object id', function (done) {

        expect(OID.isOID()).to.be.false();
        expect(OID.isOID('')).to.be.false();
        expect(OID.isOID('1234')).to.be.false();
        expect(OID.isOID('*')).to.be.true();
        expect(OID.isOID('UNSPECIFIED')).to.be.true();
        expect(OID.isOID('systemOwner')).to.be.true();
        expect(OID.isOID('54edb381a13ec9142b9bb353')).to.be.true();
        done();

    });

});
