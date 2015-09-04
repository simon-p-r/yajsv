# yajsv [![build status](https://travis-ci.org/simon-p-r/yajsv.svg?branch=master)](https://travis-ci.org/simon-p-r/yajsv)

Yet another json validator

### Example usage

```js
var Manager = require('yajsv');  // Load module
var schemas = require('/path/to/some/file'); // Load an array of schema objects
var manager = new Manager({
    db: null,
    zSchema: {}  // options for z-schema module
});  // create constructor
manager.createMany(schemas);  // create schemas for validation
var results = manager.compile(); // validate schemas with z-schema

```

### API

##### new Manager(options);

creates the yajsv constructor object, valid options are
+ db - default vaue null, pass a mongodb native db object
+ zSchema - pass options to z-schema constructor


##### manager.createMany(schemas);

method to create schemas for validation, the schemas must be an array of valid schema objects

##### manager.create(schema);

method to create schema for validation, the schema is a valid schema object

##### manager.addFormats(formats);

method to add custom formats to z-schema, the formats argument is an object with keys the name of the format and the value is the function to register.  See lib/register for formats that are already registered

##### manager.compile();

method to verify all schema that have been created are valid, returns an object with two keys
+  valid - a boolean
+  errors - an object with each key being the name of schema which failed validation and an error message to explain

##### manager.validateData(JSON, schema, callback);

method to validate each schema against some json data, callback with err, valid signature maybe optional in the future

### Yajsv constructor

yajsv constructor exposes the following properties
+ schemaSet - an object with the following keys
 * collections
 * definitions
 * records


### Todo
+ ~~Schema crud methods~~
+ ~~Schema validated by z-schema~~
+ ~~Ability to add custom format functions for z-schema~~
+ ~~Look into why z-schema strict mode fails validation every time~~
+ ~~Add external interface to handle an array of them~~
+ ~~Must load subtypes first such as lookup before honrific or mimeType, if not store to be done on completion prior to compiling~~
+ ~~Method to add an object of formats - each key is the name of format to register~~
+ ~~Use z-schema strict mode only~~
+ ~~Improve errors from z-schema~~
+ ~~Extend both collection and definition type schemas - address format is one example where a definition needs to be extended~~
+ Improve validateData method to return actual error objects, currently returns an array
+ Document the redesigned schema objects, registering custom formats, etc
+ 100% code coverage
+ Serialize function / methods into json string in order to persist in mongo
