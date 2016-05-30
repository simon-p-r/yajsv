'use strict';

const ChildProcess = require('child_process');
const Code = require('code');
const Lab = require('lab');
const Path = require('path');
const Rmdir = require('rimraf');

// Declare internals
const internals = {};

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('Cli', () => {

    const yajsvPath = Path.join(__dirname, '..', 'bin', 'yajsv');
    const outDir = Path.join(__dirname, '..', 'output');
    const inputDir = './test/fixtures/schemata';

    it('runs command to validate and persist all schemas to disk', (done) => {

        const cli = ChildProcess.spawn('node', [yajsvPath, '-i', inputDir]);
        let output = '';

        cli.stdout.on('data', (data) => {

            output += data;
        });

        cli.stderr.on('data', (data) => {

            expect(data).to.not.exist();
        });

        cli.once('close', (code, signal) => {

            expect(code).to.equal(0);
            expect(signal).to.not.exist();
            Rmdir.sync(outDir);
            done();
        });
    });
});
