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

    const result = shuffle.pick(random_numbers, { picks: pickedNumbers });

    switch (pickedNumbers) {
        case 0:
            return [];
        case 1:
            return [result];
        default:
            return result;
    }

}

module.exports = {
    getRandomPositions,
};