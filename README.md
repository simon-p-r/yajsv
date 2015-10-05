# yajsv [![build status](https://travis-ci.org/simon-p-r/yajsv.svg?branch=master)](https://travis-ci.org/simon-p-r/yajsv)

Yet another json validator

### Example usage

```js
var Manager = require('yajsv');  // Load module
var schemas = require('/path/to/some/file'); // Load schemas either in an array or object sets
var manager = new Manager({
    db: null,
    zSchema: {}  // optional options for z-schema module
    formats: {} // optional object to register custom formats
});  // create constructor
manager.addSchemas(schemas);  // create schemas for validation
manager.addFormats(formats); // add a formats object
var results = manager.compile(); // validate schemas with z-schema

```

### API

##### new Manager(options);

creates the yajsv constructor object, valid options are
+ db - default vaue null, pass a mongodb native db object
+ zSchema - optional param for z-schema constructor
+ formats - optional param is an object with keys are name of formats to
register and value is function with either one paramater for sync and two
for async with a (value, callback) signature


##### manager.addSchemas(schemas);

method to create schemas for validation, the schemas must be an array of valid schema objects or an object with keys being each type (collections, definitions, records) each with keys being the name of object and the value the respective schema  

##### manager.addFormats(formats);

method to add custom formats to z-schema, the formats argument is an object with keys the name of the format and the value is the function to register.  See lib/register for formats that are already registered

##### manager.compile();

method to verify all schema that have been created are valid, returns an object with two keys
+  valid - a boolean
+  errors - an object with each key being the name of schema which failed validation and an error message to explain

##### manager.getValidator();

method to get handle to z-schema validator object to be used to validate data against schemas created by this module

### Yajsv constructor

yajsv constructor exposes the following properties
+ schemas - an object with keys being all the schemas registered by addSchemas method


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
+ ~~Improve validateData method to return actual error objects, currently returns an array~~
+ ~~Remove register section to ship module with no in-built formats which limits dependencies on core schemas, move logic into separate module and just provide hooks here to load~~
+ ~~100% code coverage~~
+ Improve loading api of polymorphic schemas, remove current concepts to enable greater composition of simple objects
+ Abstract away from z-schema in order to migrate to joi once custom formats are allowed with async operations
+ Document the redesigned schema objects, registering custom formats, etc
+ Serialize function / methods into json string in order to persist in mongo
