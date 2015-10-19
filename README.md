# yajsv [![build status](https://travis-ci.org/simon-p-r/yajsv.svg?branch=master)](https://travis-ci.org/simon-p-r/yajsv)

Yet another json validator

Unstable changing api, originally a validation library hence the name but now a module that pre-processes schemas into json-schemas.  Module now only works with node version 4 or greater due to use of ES6 features.  This module constructs an abstraction from json-schema to allow for more composable schemas from smaller subschemas.

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

##### manager.toJson(match);

method to return either an object with the keys being the names of all schemas with values being json strings called by passing '*' to method or by passing a name of schema to return as json the schema name must be passed to method to return the strignified schema

##### manager.compile();

method to verify all schema that have been created are valid, returns an object with two keys
+  schemas - an object with each key being the name of created schema
+  formats - an object with each key being the name of format and the value being the required function to be registered with z-schema

### cli

installation
````js
npm i -g yajsv
````

usage

````js
yajsv -i path/to/input -o path/to/output -f path/to/formats/file -s testSchema
````

##### Input -i
Directory containing folder names collections, records and definitions.  They must containing relevant schema files in the respective directories

##### Output -o
Output directory where json-schemas will be saved to

##### Formats -f
Formats option is path to a valid formats file

##### Schema -s
Schema is either a name of the schema you want to save to file or default is a * which means all schemas in directory will be saved

##### Version -v
Prints version of yajsv

##### Help -h
Prints usage of cli





### Todo

+ Abstracted away from a specific validation library
+ Document the required schema objects to parse and build json-schema complaint schemas
+ Improve documentation especially of yajsv cli interface
+ Remove custom formats interface?
