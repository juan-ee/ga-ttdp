const {toMili,toMinutes,getRandomPositions} = require("./utilities");
const {it} = require('mocha');
const {expect} = require('chai');

describe("Utilities Tests", () => {
    it('should test toMili', (done) => {
        const minutes = 1 , expectedMili = minutes * 60 * 1000;
        expect(toMili(minutes)).to.be.equal(expectedMili);
        done();
    });

    it('should test toMinutes', (done) => {
        const mili = 1000 , minutes = mili / 1000 / 60;
        expect(toMinutes(mili)).to.be.equal(minutes);
        done();
    });

    it('should generate a random array, from 1 to 5', (done) => {
        const picked = 5 , start = 1, max = 5;
        const expected_elements = [1,2,3,4,5];
        const array = getRandomPositions(picked, start, max);

        expected_elements.forEach((expected_element)=>expect(array.includes(expected_element)).to.be.true);
        done();
    });

    it('should generate a random array, from 0 to 5', (done) => {
        const picked = 6 , start = 0, max = 6;
        const expected_elements = [0,1,2,3,4,5];
        const array = getRandomPositions(picked, start, max);

        expected_elements.forEach((expected_element)=>expect(array.includes(expected_element)).to.be.true);

        done();
    });

    it('should generate a random array, from 0 to 9 - pick 2 elements', (done) => {
        const picked = 2 , start = 0, max = 10;
        const expected_elements = [0,1,2,3,4,5,6,7,8,9];
        const array = getRandomPositions(picked, start, max);

        console.log(array);
        expect(array.length).to.be.eq(picked);
        array.forEach((elem)=>expect(expected_elements.includes(elem)).to.be.true);

        done();
    });


});