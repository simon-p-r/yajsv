# yajsv [![build status](https://travis-ci.org/simon-p-r/yajsv.svg?branch=master)](https://travis-ci.org/simon-p-r/yajsv)

Yet another json validator

Unstable changing api, originally a validation library hence the nambut now a module that pre-processes schemas into json-schemas.  Module now only with node version 4 or greater due to use of ES6 features.  This module constructs an abstraction from json-schema to allow for more composable schemas from smaller subschemas.

### Example usage

```js
var Manager = require('yajsv');  // Load module
var schemas = require('/path/to/schemas'); // Load schemas either in an array or object sets
var manager = new Manager({
    formats: {} // optional object to register custom formats
});  // create constructor
manager.addSchemas(schemas);  // create schemas for validation
manager.addFormats(formats); // add a formats object to be registering with z-schema
var results = manager.compile(); // build schemas based on inputted schemas

```

### API

##### new Manager(options);

creates the yajsv constructor object, valid options are
+ formats - optional param is an object with keys being the name of formats to
register and value is function with either one paramater for sync and two
for async with a (value, callback) signature


##### manager.addSchemas(schemas);

method to create schemas for validation, the schemas must be an array of valid schema objects or an object with keys being each type (collections, definitions, records) each with keys being the name of object and the value the respective schema  

##### manager.addFormats(formats);

method to add custom formats to z-schema, the formats argument is an object with keys the name of the format and the value is the function to register.  See lib/register for formats that are already registered

##### manager.compile();

method to verify all schema that have been created are valid, returns an object with two keys
+  schemas - an object with each key being the name of created schema
+  formats - an object with each key being the name of format and the value being the required function to be registered with z-schema


### Yajsv constructor

yajsv constructor exposes the following properties
+ formats - an object of formats registered


### Todo

+ Abstracted away from a specific validation library
+ Document the required schema objects to parse and build json-schema complaint schemas
+ Improve documentation especially of yajsv cli interface
