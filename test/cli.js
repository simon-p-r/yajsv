'use strict';

var ChildProcess = require('child_process');
var Code = require('code');
var Lab = require('lab');
var Path = require('path');
var Rmdir = require('rimraf');

// Declare internals
var internals = {};


// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('Cli', function () {

    var yajsvPath = Path.join(__dirname, '..', 'bin', 'yajsv');
    var outDir = Path.join(__dirname, '..', 'output');
    var inputDir = './test/fixtures/schemata';

    lab.before(function (done) {

        Rmdir.sync(outDir);
        done();
    });

    it('runs command to validate and persist all schemas to disk', function (done) {

        var cli = ChildProcess.spawn('node', [yajsvPath, '-i', inputDir]);
        var output = '';

        cli.stdout.on('data', function (data) {

            output += data;
        });

        cli.stderr.on('data', function (data) {

            expect(data).to.not.exist();
        });

        cli.once('close', function (code, signal) {

            expect(code).to.equal(0);
            expect(signal).to.not.exist();
            Rmdir.sync(outDir);
            done();
        });
    });
});
