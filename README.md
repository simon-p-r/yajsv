# yajsv [![build status](https://travis-ci.org/simon-p-r/yajsv.svg?branch=master)](https://travis-ci.org/simon-p-r/yajsv)

### Todo
+ ~~Schema crud methods~~
+ ~~Schema validated by z-schema~~
+ ~~Ability to add custom format functions for z-schema~~
+ Add external interface to handle an array of them
+ Document the redesigned schema objects, registering custom formats, etc
+ Look into why z-schema strict mode fails validation every time
+ 100% code coverage
+ Are remove and resetAll crud methods required?
+ Are all lookup methods required?

<!-- ## Usage -->

<!-- ```js

var manager = new Manager({
    db: null,

});

var schemes = Object.keys(Schemas); //Schemas is an object with each key being a schema object
schemes.forEach(function (scheme) {

    var testSchema = Schemas[scheme];
    manager.create(testSchema);

});

// Compile schemas to validate they are valid
var results = manager.compile();
// results object will now contain valid (boolean) and errors (object) with keys being name of each schema that failed validation with z-schema

``` -->
