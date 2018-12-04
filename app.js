const {evolve} = require("./index");


console.log(evolve({
    sizePopulation: 5,
    timeMatrix: [
        [1, 2, 3],
        [2, 4, 5],
        [3, 8, 7],
    ],
    date: new Date(),
    pois: [],
    totalGenerations: 1,
    mutation_rate: 0.3
}));