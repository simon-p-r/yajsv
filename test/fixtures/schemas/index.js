// Load modules

var Address = require('./definitions/address.js');
var Control = require('./definitions/control.js');
var County = require('./collections/county.js');
var DbRef = require('./definitions/dbRef.js');
var Dummy = require('./collections/dummy.js');
var Honorific = require('./records/honorific.js');
var Uk = require('./records/uk.js');


module.exports = {

    address: Address,
    control: Control,
    county: County,
    dbRef: DbRef,
    honorific: Honorific,
    uk: Uk,
    dummy: Dummy


};
