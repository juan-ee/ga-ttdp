function getRandomPositions(total, start, limit) {// TODO: change
    var random = new Array(total);
    var i = 0;
    while (i < random.length) {
        const num = Math.floor(Math.random() * limit + start);
        if (!random.includes(num)) {
            random[i] = num;
            i++;
        }
    }
    return random;
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