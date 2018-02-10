# ga-tsp
Genetic Algorithm to solve TSP with a personalized Crossover

### Installation
```$ npm install ga-tsp```

### Usage
```
const ga_tsp = require('ga-tsp');

var points = [{"lat":-0.2197858,"lng":-78.5132522},{"lat":-0.2199577,"lng":-78.5127576},{"lat":-0.222888,"lng":-78.510443},{"lat":-0.2102002,"lng":-78.51206789999999},{"lat":-0.2174576,"lng":-78.5102873},{"lat":-0.2108024,"lng":-78.5069942},{"lat":-0.2063798,"lng":-78.51076739999999}]

const parameters = {
    totalCities:points.length,
    distanceMatrix:ga_tsp.getDistanceMatrix(points),
    mutation_rate: 0.03,
    sizePopulation:50,
    totalGenerations:50
};

var optimalRoute = ga_tsp.evolve(parameters);
console.log(optimalRoute);

```