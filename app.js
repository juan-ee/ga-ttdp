var ga_tsp = require('./index');

var points = [{"lat":-0.2197858,"lng":-78.5132522},{"lat":-0.2199577,"lng":-78.5127576},{"lat":-0.222888,"lng":-78.510443},{"lat":-0.2102002,"lng":-78.51206789999999},{"lat":-0.2174576,"lng":-78.5102873},{"lat":-0.2108024,"lng":-78.5069942},{"lat":-0.2063798,"lng":-78.51076739999999}]

const parameters = {
    totalCities:points.length,
    distanceMatrix:require('./distanceMatrix').getDistanceMatrix(points),
    mutation_rate: 0.03,
    sizePopulation:50,
    totalGenerations:50
};

var best = ga_tsp.execGA(parameters);
for(var i=0;i<2;i++){
    var c=ga_tsp.execGA(parameters);
    if(c.fitness<best.fitness){best=c};
}

console.log(best);

