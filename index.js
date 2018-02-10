
//------VARIABLES---------
global.distanceMatrix=[];
global.population=[];
global.bestIndividual;


function getDistance(point1,point2) {
    var R = 6371000; // Radius of the earth in m
    var dLat = deg2rad(point2.lat-point1.lat);  // deg2rad below
    var dLon = deg2rad(point2.lng-point1.lng);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(point1.lat)) * Math.cos(deg2rad(point2.lat)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return  parseFloat((R * c).toFixed(2)); // Distance in km
}

function deg2rad(deg) { return deg * (Math.PI/180); }

function getRandomPositions(total,start,limit){//get random positions of any array
    if (total===2){return [0,1]};
    var random = new Array(total);
    var i = 0;
    while(i<random.length){
        num = Math.floor(Math.random()*limit+start);
        if (!random.includes(num)){
            random[i]=num;
            i++;
        }
    }
    return random;
}

function getFitness(individual){ //calculate fitness value of any individual
    var total = distanceMatrix[individual.length-1][0];
    for(var i=0;i<individual.length-1;i++){
        total+=distanceMatrix[individual[i]][individual[i+1]];
    }
    return parseFloat(total.toFixed(2));
}

function sort() {//sort population according to Fitness value of individuals
    population.sort(function(a, b) {
        return b.fitness - a.fitness;
    });
    var best = population[population.length-1];
    // bestIndividual =  best.fitness < bestIndividual.fitness ? best : bestIndividual;
    if(best.fitness < bestIndividual.fitness){
        bestIndividual = best;
    }
}

function initPopulation(totalCities,size) {
    var total = totalCities-1;
    for(var i=0;i<size;i++){
        var route = [0].concat(getRandomPositions(total,1,total));
        population[i] = {
            route:route,
            fitness:getFitness(route)
        }
    }
}

function selection(parentsSize) { //select individuals to crossover
    others=~~(parentsSize/3);
    best=parentsSize-others;
    start=Math.floor(Math.random()*(population.length-(best+others)));
    randomIndividuals=population.slice(start,start+others);
    return randomIndividuals.concat(population.slice(population.length-(best+1),population.length-1));
    // return population.slice(population.length-(parentsSize+1),population.length-1);
}

function crossoverAllParents(parents) {
    var newPopulation = [];
    var usedParents=[];
    var total=parents.length;
    while(usedParents.length!==total){
        var positions = getRandomPositions(2,0,parents.length-1); //random positions
        var parent1 = parents[positions[0]], parent2 = parents[positions[1]];
        usedParents.push(parent1);
        usedParents.push(parent2);

        if(positions[0]>positions[1]){
            parents.splice(positions[0],1);
            parents.splice(positions[1],1);
        }else{
            parents.splice(positions[1],1);
            parents.splice(positions[0],1);
        }

        var routes = crossover(parent1.route,parent2.route);
        for(var i in routes){
            newPopulation.push({
                route: routes[i],
                fitness: getFitness(routes[i])
            });
        }
    }
    population = newPopulation.concat(usedParents);

    function crossover(parent1,parent2){
        values = getPositionsAndMaps();
        even = values[0];
        odd = values[1];
        return crossoverPoints(even).concat(crossoverPoints(odd));

        function crossoverPoints(parameters) {
            positions=parameters[0];
            maps=parameters[1];
            childs=[[0],[0]];
            for(var i =1;i<parent1.length;i++){
                if(positions.includes(i)){
                    childs[0][i]=parent1[i];
                    childs[1][i]=parent2[i];
                }else{
                    childs[0][i]= maps[0][parent2[i]] != undefined ? maps[0][parent2[i]] : parent2[i];
                    childs[1][i]= maps[1][parent1[i]] != undefined ? maps[1][parent1[i]] : parent1[i];
                }
            }
            return childs;
        }
        function getPositionsAndMaps(){ //return the positions of chromosomes and points to be mapped
            evenPositions=[],oddPositions=[];
            evenPoints=[[],[]],oddPoints=[[],[]];
            for(var i=1;i<=parent1.length-1;i+=2){
                //even
                evenPoints[0].push(parent1[i]);
                evenPoints[1].push(parent2[i]);
                evenPositions.push(i);
                //odd
                oddPoints[0].push(parent1[i+1]);
                oddPoints[1].push(parent2[i+1]);
                oddPositions.push(i+1);
            }
            var last=oddPoints[0].length-1;
            if(oddPoints[0][last]==undefined){
                oddPoints[0].splice(last,1);
                oddPoints[1].splice(last,1);
                oddPositions.splice(last,1);
            }
            return [[evenPositions,getMaps(evenPoints)],[oddPositions,getMaps(oddPoints)]];
        }
        function getMaps(points){ //return the points to be mapped
            ar1=points[0];
            ar2=points[1];
            for(var i=0;i<ar1.length;++i){
                index=ar2.indexOf(ar1[i]);
                if(index!=-1){
                    ar2[index]=ar2[i];
                    ar1.splice(i,1);
                    ar2.splice(i,1);
                    i--;
                }
            }
            m1={},m2={};
            for(i in ar1){
                m1[ar1[i]]=ar2[i];
                m2[ar2[i]]=ar1[i];
            }
            return[m1,m2];
        }
    }
}

function mutation(mutation_probability) {
    function mutate(individual){
        var route = individual.route;
        var positions = getRandomPositions(Math.floor((route.length-1)/2),1,route.length-1);
        for(var p=0;p<positions.length-1;p+=2){
            var aux=route[positions[p]];
            route[positions[p]]=route[positions[p+1]];
            route[positions[p+1]]=aux;
        }
        individual.fitness=getFitness(route);
    }

    population.forEach(function(individual){
        if(Math.random() < mutation_probability ){
            mutate(individual);
        }
    });
}

function initBestIndividual(totalCities) {
    var route=[];
    for(var i=0; i < totalCities; i++){
        route.push(i);
    }
    bestIndividual = {
        route:route,
        fitness:getFitness(route)
    }
}

module.exports = {
    evolve : function (parameters) {
        const crossover_probability = 1/3;
        var total = Math.ceil(parameters.sizePopulation*crossover_probability);
        var parentsSize = total % 2 === 0 ? total : total+1;
        distanceMatrix = parameters.distanceMatrix;

        //---EVOLVE---
        initBestIndividual(parameters.totalCities);
        initPopulation(parameters.totalCities,parameters.sizePopulation);
        sort();
        for(var i=0;i<parameters.totalGenerations;i++){
            crossoverAllParents(selection(parentsSize));
            mutation(parameters.mutation_rate);
            sort();
        }
        return bestIndividual;
    },
    getDistanceMatrix: function (points) {
        var distanceMatrix=[];
        for(i in points){
            distanceMatrix[i] = new Array(points.length);
        }
        for(var i=0;i<points.length-1;i++){
            for(var j=i;j<points.length;j++){
                if(i==j){
                    distanceMatrix[i][j] = 0.00;
                }else{
                    distanceMatrix[i][j] = getDistance(points[i],points[j]);
                    distanceMatrix[j][i] = distanceMatrix[i][j];
                }
            }
        }
        return distanceMatrix;
    }
}

