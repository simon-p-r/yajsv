// Load modules
var Async = require('neo-async');
var Iban = require('iban');
var Telephone = require('./formats/telephone.js');
var Postcode = require('./formats/postcode.js');
var Oid = require('./formats/oid.js');
var ObjectID = require('bson-objectid');

var internals = {};

internals.findCollection = function (arr, coll) {

    var collections = [];
    arr.map(function (collection) {

        collections.push(collection.name);
    });
    if (collections.indexOf(coll) !== -1) {
        return true;
    };
    return false;

};

module.exports = {

    duration: function (str) {

        return true;
    },
    dbRef: function (obj, callback) {

        var query = {};
        if (typeof obj.q === 'string') {
            if (Oid.isOID(obj.q)) {
                var id = ObjectID(obj.q);
                query = { _id: id };
            } else {
                query = { sid: obj.q };
            }
        } else {
            query = obj.q;
        }
        var valid = internals.findCollection(this.collections, obj.cn);
        if (!valid) {
            return callback(false);
        }
        var collection = this.db.collection(obj.cn);
        collection.findOne(query, function (err, rec) {
            // console.log('DBREF', query, err);s
            if (err || !rec) {
                return callback(false);
            }
            return callback(true);
        });

    },
    password: function (str) {

        return true;
    },
    phone: function (str) {

        return Telephone(str);
    },
    postcode: function (str) {

        // var pc = str.trim();
        // pc = pc.replace(/ /g, '');
        return Postcode(str);
    },
    vat: function (str) {

        return true;
    },
    lookup: function (obj, callback) {

        var self = this;
        var lus = [];

        if ( Array.isArray(obj.lv) ) {
            lus = obj.lv;
        } else {
            lus = [obj.lv];
        }
        Async.forEachSeries(lus, function (lu, next) {

            var query = {
                recType: obj.lt,
                luValue: lu
            };
            self.db.collection('lookup').findOne(query, function (err, rec) {
                // console.log('lookup', query, err, Object.keys(rec))
                if (err || !rec) {
                    return next('db error or no lookep record returned');
                }
                return next();
            });
        }, function (err) {

            if (err) {
                return callback(false);
            }
            return callback(true);
        });

    },
    iban: function (str) {

        return Iban.isValid(str);
    },
    contact: function (str) {

        return true;
    },
    amt: function (str) {

        return true;
    }

};
