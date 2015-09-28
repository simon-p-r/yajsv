print('Dropping collections');

var drop1 = db.lookup.drop();

if (!drop1) {
    exit();
};

var drop2 = db.county.drop();

if (!drop2) {
    exit();
};

print('Inserting data for tests');

db.lookup.insert([{
    recType: 'bankCodeType',
    luValue: 'bsb',
    valueText: 'BSB'
},
{
    recType: 'bankCodeType',
    luValue: 'iban',
    valueText: 'IBAN'
}]);

db.county.insert([{
    _id: ObjectId('55e071b8aa1643a3971c430f'),
    county: 'Berkshire',
    country: 'England'
},
{
    county: 'Bedfordshire',
    country: 'England'
}]);

print('Finished');
