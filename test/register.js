// Load modules

var Code = require('code');
var Lab = require('lab');
var Register = require('./fixtures/formats/register.js');

// Set-up lab
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('Register', function () {

    it('should test register functions sync mode', function (done) {

        var formats = ['duration', 'password', 'contact', 'amt', 'vat'];
        var length = formats.length;
        var res;
        for (var i = 0, il = length; i < il; ++i) {
            var name = formats[i];
            res = Register[name]('string');
            expect(res).to.be.true();
        }
        done();

    });

    it('should test registered iban format', function (done) {

        var format = 'iban';
        expect(Register[format]('AL47 2121 1009 0000 0002 3569 8741')).to.be.true();
        expect(Register[format]('FI2112345600000785')).to.be.true();
        expect(Register[format]()).to.be.false();
        expect(Register[format]('test')).to.be.false();
        done();

    });



});
