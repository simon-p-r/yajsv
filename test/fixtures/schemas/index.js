// Load modules

var Control = require('./schemata/definitions/control.js');
var County = require('./schemata/collections/county.js');
var DbRef = require('./schemata/definitions/dbRef.js');
var Dummy = require('./schemata/collections/dummy.js');


module.exports = [

    Control,
    County,
    DbRef,
    Dummy

];
