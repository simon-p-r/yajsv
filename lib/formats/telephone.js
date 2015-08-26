// Load modules

var internals = {};

module.exports = internals.checkUKTelephone = function (telephoneNumber) {

    // Convert into a string and check that we were provided with something

    var telnum = telephoneNumber + ' ';
    var telNumberErrorNo;
    if (telnum.length === 1) {
        telNumberErrorNo = 1;
        return false;
    }
    telnum.length = telnum.length - 1;

    // Don't allow country codes to be included (assumes a leading "+")
    var exp = /^(\+)[\s]*(.*)$/;
    if (exp.test(telnum) === true) {
        telNumberErrorNo = 2;
        return false;
    }

    // Remove spaces from the telephone number to help validation
    while (telnum.indexOf(' ') !== -1) {
        telnum = telnum.slice(0, telnum.indexOf(' ')) + telnum.slice(telnum.indexOf(' ') + 1);
    }

    // Remove hyphens from the telephone number to help validation
    while (telnum.indexOf('-') !== -1) {
        telnum = telnum.slice(0, telnum.indexOf('-')) + telnum.slice(telnum.indexOf('-') + 1);
    }

    // Now check that all the characters are digits
    exp = /^[0-9]{10,11}$/;
    if (exp.test(telnum) !== true) {
        telNumberErrorNo = 3;
        return false;
    }

    // Now check that the first digit is 0
    exp = /^0[0-9]{9,10}$/;
    if (exp.test(telnum) !== true) {
        telNumberErrorNo = 4;
        return false;
    }

    // Disallow numbers allocated for dramas.

    // Array holds the regular expressions for the drama telephone numbers
    var tnexp = [];
    tnexp.push(/^(0113|0114|0115|0116|0117|0118|0121|0131|0141|0151|0161)(4960)[0-9]{3}$/);
    tnexp.push(/^02079460[0-9]{3}$/);
    tnexp.push(/^01914980[0-9]{3}$/);
    tnexp.push(/^02890180[0-9]{3}$/);
    tnexp.push(/^02920180[0-9]{3}$/);
    tnexp.push(/^01632960[0-9]{3}$/);
    tnexp.push(/^07700900[0-9]{3}$/);
    tnexp.push(/^08081570[0-9]{3}$/);
    tnexp.push(/^09098790[0-9]{3}$/);
    tnexp.push(/^03069990[0-9]{3}$/);

    for (var i = 0; i < tnexp.length; i++) {
        if ( tnexp[i].test(telnum) ) {
            telNumberErrorNo = 5;
            return false;
        }
    }

    // Finally check that the telephone number is appropriate.
    exp = (/^(01|02|03|05|070|071|072|073|074|075|07624|077|078|079)[0-9]+$/);
    if (exp.test(telnum) !== true) {
        telNumberErrorNo = 5;
        return false;
    }

    // Telephone number seems to be valid - return the stripped telephone number
    return true;

    //TODO these 3 work but need some more test cases to test their strengths

    //return (/^((\(?0\d{4}\)?\s?\d{3}\s?\d{3})|(\(?0\d{3}\)?\s?\d{3}\s?\d{4})|(\(?0\d{2}\)?\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/).test(telephoneNumber);
    //return (/^\s*\(?(020[7,8]{1}\)?[ ]?[1-9]{1}[0-9{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\s*$/).test(telephoneNumber);
    //return (/^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/).test(telephoneNumber);
};
