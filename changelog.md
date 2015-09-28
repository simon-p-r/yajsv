### Changelog

v0.0.9 - more changes to api as still unstable and likely to change in near future.  Added different variants to schemas and ways to load schemas, setting object values is done first so that plugins can use methods to add schemas before they are validate with z-schema at end of process.  Improved tests to cover changes and change fixtures and added require-plus dependency.  Change readme to reflect changes

v0.0.8 - removed register format throw and will fallback to z-schema error handling now, removed find-key dependency and internals.defaultFormats as not needed.  Changed return value to just return schemaSet and not schemaSet > collections to remove nested properties and changed name of array called collections into models.

v0.0.7 - improved readme and added error object to be returned from validateData method

v0.0.6 - removed definitions and records from schemas including logic (definitions and other subschemas are to be required by parent schemas), made registration of formats separate from internals of module, further reduced dependencies on schemas for testing.  Also removed unrequired validator.setRemoteReference method call and added unRegisterFormats helper for testing (making temp fix in z-schema to enable and have opened issue there).  Reached 100% code coverage

v0.0.5 - improved error message from validation when validating with z-schema, tidied up fixtures and improved for loops

v0.0.4 - changed return value of validateData method and reported issue with z-schema validate method allowing empty object to pass validation

v0.0.3 - fixed bug with loading order (stopped infinite loop), removed excessive fixture files and cleaned up tests.  Code coverage still the same.
