// Load modules

var Control = require('./schemas/definitions/control.js');
var County = require('./schemas/collections/county.js');
var DbRef = require('./schemas/definitions/dbRef.js');
var Dummy = require('./schemas/collections/dummy.js');


module.exports = [

    Control,
    County,
    DbRef,
    Dummy

];
