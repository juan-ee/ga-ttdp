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
    it('should generate a random array', () => {
        const start = 1 , end = 5, total = 4;
        const arr = getRandomPositions(total,start,end), all = [];

        for(let i=start;i<=end;i++)
            all.push(i);

        expect(arr.length).to.eq(total);
        console.log(arr);
        arr.forEach((elem)=>{
            if(!all.includes(elem))
                console.log(elem,'in',all);
            expect(all.includes(elem)).to.be.true;
        })
    });
});