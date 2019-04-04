const { getRandomPositions } = require("./utilities");
const { it } = require("mocha");
const { expect } = require("chai");

describe("Utilities Tests", () => {
  it("should generate a random array, from 1 to 5", done => {
    const picked = 5,
      start = 1,
      max = 5;
    const expected_elements = [1, 2, 3, 4, 5];
    const array = getRandomPositions(picked, start, max);

    expect(array.length).to.be.eq(picked);
    expected_elements.forEach(
      expected_element => expect(array.includes(expected_element)).to.be.true
    );
    done();
  });

  it("should generate a random array, from 0 to 5", done => {
    const picked = 6,
      start = 0,
      max = 6;
    const expected_elements = [0, 1, 2, 3, 4, 5];
    const array = getRandomPositions(picked, start, max);

    expect(array.length).to.be.eq(picked);
    expected_elements.forEach(
      expected_element => expect(array.includes(expected_element)).to.be.true
    );

    done();
  });

  it("should generate a random array, from 0 to 9 - pick 2 elements", done => {
    const picked = 2,
      start = 0,
      max = 10;
    const expected_elements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = getRandomPositions(picked, start, max);

    expect(array.length).to.be.eq(picked);
    array.forEach(elem => expect(expected_elements.includes(elem)).to.be.true);

    done();
  });

  it("should return an array with 1 element", done => {
    const picked = 1,
      start = 1,
      max = 3;
    const array = getRandomPositions(picked, start, max);

    expect(array.length).to.be.eq(1);
    expect(array[0] >= 1 && array[0] <= 7).to.be.eq(true);

    done();
  });

  it("should return an empty array", done => {
    const picked = 0,
      start = 1,
      max = 5;
    const array = getRandomPositions(picked, start, max);

    expect(array.length).to.be.eq(0);

    done();
  });

  it("should return an empty asd", done => {
    console.log(getRandomPositions(2, 0, 2))

    done();
  });

});
