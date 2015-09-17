exports.isOID = function (id) {

    //A valid Object Id must be 24 hex characters - so returns true
    if (!id) {
        return false;
    }
    if (id === '*' ) {
        return true;
    }
    if (id === 'UNSPECIFIED' ) {
        return true;
    }
    if (id === 'systemOwner' ) {
        return true;
    }
    if (id.length !== 24) {
        return false;
    }

    return (/^[0-9a-fA-F]{24}$/).test(id);

};
