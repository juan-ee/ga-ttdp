const shuffle = require('shuffle-array');

/**
* @pickedNumbers - total number of elements to pick from the array
* @maxNumber - max value that an element of the array can have
* @startNumber - 0 or 1
 *               if 0: an array of [0,...,maxNumber - 1] will be generated
 *               if 1: an array of [1,...,maxNumber] will be generated
 */
function getRandomPositions(pickedNumbers, startNumber, maxNumber) {
    const random_numbers = Array.from(Array(maxNumber), (_,x) => x+startNumber);
    return shuffle.pick(random_numbers, { picks: pickedNumbers });
}

function toMili(minutes) {
    return minutes * 60000;
}

function toMinutes(mili) {
    return mili / 60000;
}


module.exports = {
    getRandomPositions, toMili, toMinutes
};