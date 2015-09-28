print('Dropping collections');

db.lookup.drop();

db.county.drop();

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
