'use strict';

const Bossy = require('bossy');
const Fs = require('fs');
const Manager = require('./index.js');
const Path = require('path');
const Pkg = require('../package.json');
const Plus = require('require-plus');
const Utils = require('basic-utils');
const ZSchema = require('z-schema');

const internals = {};

exports.run = function () {

    internals.input = Path.resolve(process.cwd(), 'input');
    internals.output = Path.resolve(process.cwd(), 'output');
    internals.schema = '*';
    internals.validator = new ZSchema();

    const definition = {
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

    const argv = Bossy.parse(definition);

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

    if (typeof internals.formats === 'string') {
        internals.formatsPath = require(Path.resolve(internals.formats));
    }

    const Formats = internals.formatsPath ? internals.formatsPath : null;

    const manager = new Manager({
        formats: Formats || {}
    });

    const Schemata = Plus({
        directory: internals.input
    });
    manager.addSchemas(Schemata);
    manager.compile();
    Object.keys(manager.formats).forEach((format) => {

        ZSchema.registerFormat(format, manager.formats[format]);
    });

    const dir = internals.output;
    if (!Utils.isDir(dir)) {
        Utils.mkDirSync(dir);
    }

    if (internals.schema === '*') {
        Object.keys(manager.records).forEach((type) => {

            const toValidate = manager.records[type].schema;
            const result = internals.validator.validateSchema(toValidate);
            if (result) {
                console.log('Schema name', type, 'has been validated');
                const data = manager.toJson(type);
                const path = Path.join(dir, type + '.json');
                Fs.writeFileSync(path, data, 'utf8');
                console.log('Schema file being saved to', path);
            }
            else {
                const errors = internals.validator.getLastError();
                console.error('Errors have occured whilst validating schemas:', errors);
                process.exit(1);
            }
        });
    }
    else {

        const data = manager.toJson(internals.schema);
        const toValidate = manager.records[internals.schema];
        const result = internals.validator.validateSchema(toValidate);
        if (result) {
            console.log('Schema name', internals.schema, 'has been validated');
            const path = Path.join(dir, internals.schema + '.json');
            Fs.writeFileSync(path, data, 'utf8');
            console.log('Schema file being saved to', path);
        }
        else {
            const errors = internals.validator.getLastError();
            console.error('Errors have occured whilst validating schemas:', errors);
            process.exit(1);
        }
    }
    process.exit(0);

};
