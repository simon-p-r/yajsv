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

    internals.input = Path.resolve(process.cwd(), 'input');
    internals.output = Path.resolve(process.cwd(), 'output');
    internals.schema = '*';
    internals.validator = new ZSchema();

    var definition = {
        formats: {
            alias: 'f',
            type: 'string',
            description: 'custom formats to load for validation'
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
    var Formats;
    if (internals.formats) {
        Formats = require(Path.resolve(internals.formats));
    }

    var manager = new Manager({
        formats: Formats || {}
    });

    var Schemata = new Plus({
        directory: internals.input
    }).moduleSet;
    manager.addSchemas(Schemata);
    manager.compile();
    Object.keys(manager.formats).forEach(function (format) {

        ZSchema.registerFormat(format, manager.formats[format]);
    });

    var dir = internals.output;
    if (!Fs.existsSync(dir)) {
        Fs.mkdirSync(dir);
    }

    if (internals.schema === '*') {
        Object.keys(manager.records).forEach(function (type) {

            var toValidate = manager.records[type].schema;
            var result = internals.validator.validateSchema(toValidate);
            if (result) {
                console.log('Schema name', type, 'has been validated');
                var data = manager.toJson(type);
                var path = Path.join(dir, type + '.json');
                Fs.writeFileSync(path, data, 'utf8');
                console.log('Schema file being saved to', path);
            } else {
                var errors = internals.validator.getLastError();
                console.error('Errors have occured whilst validating schemas:', errors);
                process.exit(1);
            }
        });
    } else {

        var data = manager.toJson(internals.schema);
        var toValidate = manager.records[internals.schema];
        var result = internals.validator.validateSchema(toValidate);
        if (result) {
            console.log('Schema name', internals.schema, 'has been validated');
            var path = Path.join(dir, internals.schema + '.json');
            Fs.writeFileSync(path, data, 'utf8');
            console.log('Schema file being saved to', path);
        } else {
            var errors = internals.validator.getLastError();
            console.error('Errors have occured whilst validating schemas:', errors);
            process.exit(1);
        }
    }
    process.exit(0);

};
