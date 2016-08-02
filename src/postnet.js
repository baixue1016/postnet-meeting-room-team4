'use strict';
let _ = require('lodash');

function checkZipcode(input_zip) {
    let zipArray = _.split(input_zip, '');
    let len = input_zip.length;
    if (len === 5 || len === 9 || len === 10) {
        let symbolLen = _(zipArray)
            .map(element=> {
                if (_.isNaN(Number(element))) {
                    return element;
                }
            })
            .filter(x=> x !== undefined)
            .size();
        // console.log(symbolLen);
        if (symbolLen === 0 && len !== 10) {
            return true;
        } else if (symbolLen === 1) {
            // return _.indexOf(zipArray, '-') === 5 && len === 10 ? true : false;
            return !!(_.indexOf(zipArray, '-') === 5 && len === 10);
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function calculateAndAddCD(input_zip) {
    let sum = _(input_zip).split('').filter(x=> x !== '-').map(x=> _.parseInt(x)).sum();
    let cd = 10 - sum % 10;
    return input_zip + cd;
}

function exchangeZipcode(addedCDCode) {
    let table = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let code = _.chain(addedCDCode).split('').filter(x=> x !== '-').map(element=> {
        let index = _.parseInt(element);
        let code = '';
        code += table[index];
        return code;
    }).value();

    let barcode = '|' + code.join('') + '|';
   // console.log(barcode);
    return barcode;
}

function zipcodeToBarcode(input_zip) {
    let checkedZip = checkZipcode(input_zip);
    if(checkedZip === true){
        let addedCDCode = calculateAndAddCD(input_zip);
        let barcode = exchangeZipcode(addedCDCode);
        return barcode;
    }else {
        return 'error!!!'
    }
}

module.exports = {
    checkZipcode: checkZipcode,
    calculateAndAddCD: calculateAndAddCD,
    exchangeZipcode: exchangeZipcode,
    zipcodeToBarcode: zipcodeToBarcode
};