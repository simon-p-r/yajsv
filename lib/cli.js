'use strict';

var Bossy = require('bossy');
var Fs = require('fs');
var Manager = require('./index.js');
var Path = require('path');
var Pkg = require('../package.json');
var Plus = require('require-plus');
var ZSchema = require('z-schema');

var internals = {};


exports.run = function () {

    internals.formats = Path.resolve('./test/fixtures/formats/index.js');
    internals.input = Path.resolve('./test/fixtures/schemata');
    internals.output = Path.resolve('./output');
    internals.schema = '*';
    internals.validator = new ZSchema();

    var definition = {
        formats: {
            alias: 'f',
            type: 'string',
            description: 'custom formats to load for validation',
            default: internals.formats
        },
        help: {
            alias: 'h',
            type: 'boolean',
            description: 'display usage options'
        },
        input: {
            alias: 'i',
            type: 'string',
            description: 'input directory to load schemas from',
            default: internals.input
        },
        output: {
            alias: 'o',
            type: 'string',
            description: 'output directory to write schemas to',
            default: internals.output
        },
        schema: {
            alias: 's',
            type: 'string',
            description: 'validate selected schema',
            default: internals.schema
        },
        version: {
            alias: 'V',
            type: 'boolean',
            description: 'version information'
        }
    };

    var argv = Bossy.parse(definition);

    if (argv instanceof Error) {
        console.error(Bossy.usage(definition, 'yajsv [options]'));
        console.error('\n' + argv.message);
        process.exit(1);
    }
    if (argv.help) {
        console.log(Bossy.usage(definition, 'yajsv [options]'));
        process.exit(0);
    }
    if (argv.version) {
        console.log(Pkg.version);
        process.exit(0);
    }
    if (argv.input) {
        internals.input = Path.resolve(argv.input);
    }
    if (argv.output) {
        internals.output = Path.resolve(argv.output);
    }
    if (argv.schema) {
        internals.schema = argv.schema;
    }
    if (argv.formats) {
        internals.formats = argv.formats;
    }
    var Formats = require(internals.formats);
    var manager = new Manager({
        formats: Formats
    });
    var Schemata = new Plus({
        directory: internals.input
    }).moduleSet;
    manager.addSchemas(Schemata);
    var compiled = manager.compile();
    Object.keys(compiled.formats).forEach(function (format) {

        ZSchema.registerFormat(format, compiled.formats[format]);
    });

    var dir = internals.output;
    if (!Fs.existsSync(dir)) {
        Fs.mkdirSync(dir);
    }

    if (internals.schema === '*') {
        Object.keys(compiled.schemas).forEach(function (type) {

            var toValidate = compiled.schemas[type].schema;
            var result = internals.validator.validateSchema(toValidate);
            if (result) {
                console.log('Schema name', type, 'has been validated');
                var data = manager.toJson(type);
                var path = Path.join(dir, type + '.json');
                Fs.writeFileSync(path, data, 'utf8');
                console.log('Schema file being saved to', path);
            } else {
                var errors = internals.validator.getLastError();
                console.error('Got to the errors', errors);
                process.exit(1);
            }
        });
    } else {
        if (compiled.schemas[schema]) {
            var result = internals.validator.validateSchema(compiled.schemas[type]);
            if (result) {
                console.log('Schema name', type, 'has been validated');
                var data = manager.toJson(type);
                var path = Path.join(dir, type + '.json');
                Fs.writeFileSync(path, data, 'utf8');
                console.log('Schema file being saved to', path);
            } else {
                var errors = internals.validator.getLastError();
                console.error('Got to the errors', errors);
                process.exit(1);
            }
        }
    }
    process.exit(0);



};
