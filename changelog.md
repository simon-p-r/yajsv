### Changelog

v0.2.6 - return definitions for reference encase record is polymorphic

v0.2.5 - fixed bug with files not been written out from cli

v0.2.4 - fixed bug with extending collection schema into record schema, if record schema has no base it now is the record schema.  This will allow for non-polymorphic schemas to be created

v0.2.3 - moved require-plkus to dep like joi on last version

v0.2.2 - fixed missing dep joi from cli interface, it was a dev dep instead of true dep

v0.2.1 - improved cli interface by removing some defauly parameters and improved docs to explain usage and installation

v0.2.0 - major changes to api however still not at version 1 due to changing scope of module

v0.1.6 - removed crud methods, cleaned up and updated docs

v0.1.5 - removed data validation logic and related tests, enable db to be passed as part of options to constructor.  Removed dependency on mongodb

v0.1.4 - exposed hidden schemas cache as hidden from consumer of module

v0.1.3 - tidied up compile method with checking to see if formats have been loaded before registering with z-schema

v0.1.2 - improved error handling for duplicate schema and format names, also improved validation of addSchemas method and introduced addSchema method for loading one valid schema

v0.1.1 - bumped version due to test issues with travis

v0.1.0 - more changes to api as still unstable and likely to change in near future.  Added different variants to schemas and ways to load schemas, setting object values is done first so that plugins can use methods to add schemas before they are validate with z-schema at end of process.  Improved tests to cover changes and change fixtures and added require-plus dependency.  Change readme to reflect changes

v0.0.8 - removed register format throw and will fallback to z-schema error handling now, removed find-key dependency and internals.defaultFormats as not needed.  Changed return value to just return schemaSet and not schemaSet > collections to remove nested properties and changed name of array called collections into models.

v0.0.7 - improved readme and added error object to be returned from validateData method

v0.0.6 - removed definitions and records from schemas including logic (definitions and other subschemas are to be required by parent schemas), made registration of formats separate from internals of module, further reduced dependencies on schemas for testing.  Also removed unrequired validator.setRemoteReference method call and added unRegisterFormats helper for testing (making temp fix in z-schema to enable and have opened issue there).  Reached 100% code coverage

v0.0.5 - improved error message from validation when validating with z-schema, tidied up fixtures and improved for loops

v0.0.4 - changed return value of validateData method and reported issue with z-schema validate method allowing empty object to pass validation

v0.0.3 - fixed bug with loading order (stopped infinite loop), removed excessive fixture files and cleaned up tests.  Code coverage still the same.
