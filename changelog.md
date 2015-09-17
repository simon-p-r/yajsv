### Changelog

0.0.6 - removed definitions and records from schemas including logic (definitions and other subschemas are to be required by parent schemas), made registration of formats separate from internals of module, further reduced dependencies on schemas for testing.  Also removed unrequired validator.setRemoteReference method call and added unRegisterFormats helper for testing (making temp fix in z-schema to enable and have opened issue there).  Reached 100% code coverage

0.0.5 - improved error message from validation when validating with z-schema, tidied up fixtures and improved for loops

0.0.4 - changed return value of validateData method and reported issue with z-schema validate method allowing empty object to pass validation

0.0.3 - fixed bug with loading order (stopped infinite loop), removed excessive fixture files and tidied up tests.  Code coverage still the same.
