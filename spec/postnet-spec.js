'use strict';
let {checkZipcode, calculateAndAddCD, exchangeZipcode, zipcodeToBarcode}=require('../src/postnet.js');

describe('检查 zip code 的合法性', ()=> {
    describe('检查 zip code 位数的合法性', ()=> {
        it("检验4位zip code 的合法性", ()=> {
            let input_zip = '2435';
            let checkedZip = checkZipcode(input_zip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("检验5位zip code 的合法性", ()=> {
            let input_zip = '24357';
            let checkedZip = checkZipcode(input_zip);
            let expected = true;
            expect(checkedZip).toEqual(expected);
        });

        it("检验6位zip code 的合法性", ()=> {
            let input_zip = '243577';
            let checkedZip = checkZipcode(input_zip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("检验8位zip code 的合法性", ()=> {
            let input_zip = '24357684';
            let checkedZip = checkZipcode(input_zip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("检验10位zip code 的合法性", ()=> {
            let input_zip = '2435768433';
            let checkedZip = checkZipcode(input_zip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("检验11位zip code 的合法性", ()=> {
            let input_zip = '24357684335';
            let checkedZip = checkZipcode(input_zip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });
    });

    describe('检验 zip code 里含有其他字符或字母', ()=> {
        it("zip code 包含字母", ()=> {
            let input_zip = '24a35';
            let checkedZip = checkZipcode(input_zip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("zip code 包含其他字符", ()=> {
            let input_zip = '24357#427';
            let checkedZip = checkZipcode(input_zip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });
    });

    describe('检验 zip code 里'-'的位置', ()=> {
        it("'-'在第六位,共十位", ()=> {
            let input_zip = '12345-7890';
            let checkedZip = checkZipcode(input_zip);
            let expected = true;
            expect(checkedZip).toEqual(expected);
        });

        it("'-'在第六位,共九位", ()=> {
            let input_zip = '12345-789';
            let checkedZip = checkZipcode(input_zip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("'-'不在第六位,共十位", ()=> {
            let input_zip = '123456-789';
            let checkedZip = checkZipcode(input_zip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("'-'不在第六位,共九位", ()=> {
            let input_zip = '1234-6789';
            let checkedZip = checkZipcode(input_zip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });

        it("'-'不在第六位,共五位", ()=> {
            let input_zip = '6-789';
            let checkedZip = checkZipcode(input_zip);
            let expected = false;
            expect(checkedZip).toEqual(expected);
        });
    });
});

describe('should calculate and add CD', ()=> {
    it("五位", ()=> {
        let input_zip = '12345';
        let addedCDCode = calculateAndAddCD(input_zip);
        let expected = '123455';
        expect(addedCDCode).toEqual(expected);
    });

    it("九位", ()=> {
        let input_zip = '123412341';
        let addedCDCode = calculateAndAddCD(input_zip);
        let expected = '1234123419';
        expect(addedCDCode).toEqual(expected);
    });

    it("十位", ()=> {
        let input_zip = '12346-1234';
        let addedCDCode = calculateAndAddCD(input_zip);
        let expected = '12346-12344';
        expect(addedCDCode).toEqual(expected);
    });
});

describe('should exchange zip code', ()=> {
    it("五位", ()=> {
        let addedCDCode = '123455';
        let barcode = exchangeZipcode(addedCDCode);
        let expected = '|:::||::|:|::||::|::|:|:|::|:|:|';
        expect(barcode).toEqual(expected);
    });

    it("九位", ()=> {
        let addedCDCode = '1234123419';
        let barcode = exchangeZipcode(addedCDCode);
        let expected = '|:::||::|:|::||::|::|:::||::|:|::||::|::|:::|||:|::|';
        expect(barcode).toEqual(expected);
    });

    it("十位", ()=> {
        let addedCDCode = '12346-12344';
        let barcode = exchangeZipcode(addedCDCode);
        let expected = '|:::||::|:|::||::|::|:||:::::||::|:|::||::|::|:|::||';
        expect(barcode).toEqual(expected);
    });
});

describe('zip code to bar code', ()=> {
    it("五位", ()=> {
        let input_zip = '12345';
        let barcode = zipcodeToBarcode(input_zip);
        let expected = '|:::||::|:|::||::|::|:|:|::|:|:|';
        expect(barcode).toEqual(expected);
    });

    it("九位", ()=> {
        let input_zip = '123412341';
        let barcode = zipcodeToBarcode(input_zip);
        let expected = '|:::||::|:|::||::|::|:::||::|:|::||::|::|:::|||:|::|';
        expect(barcode).toEqual(expected);
    });

    it("十位", ()=> {
        let input_zip = '12346-1234';
        let barcode = zipcodeToBarcode(input_zip);
        let expected = '|:::||::|:|::||::|::|:||:::::||::|:|::||::|::|:|::||';
        expect(barcode).toEqual(expected);
    });
});