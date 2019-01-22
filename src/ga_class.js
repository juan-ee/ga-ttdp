const { getRandomPositions } = require("./utilities");
const moment = require("moment");

//------VARIABLES---------
let timeMatrix = [];
let population = [];
let bestIndividual = {};
let date;
let pois;
let lunch_start;
let lunch_end;

class GeneticAlgorithm {
  constructor(parameters) {
    this.travelSchedule = parameters.travelSchedule;
    this.travelDate = parameters.travelDate;
    this.pois = parameters.pois;
    this.timeMatrix = parameters.timeMatrix;
    this.crossOverProbability = parameters.crossOverProbability;
    this.travelDate = this._buildDate(this.travelSchedule.start);
    this.availableTime = this._buildDate(this.travelSchedule.end).diff(
      this.travelDate,
      "minutes"
    );
    this.lunchTimeStart = this._buildDate(parameters.lunchTime.start);
    this.lunchTimeEnd = this._buildDate(parameters.lunchTime.end);
    this.hadLunch = false;
    this.initPopulation(parameters.sizePopulation);
    this.sort();
  }

  initPopulation(size) {
    this.population = [];
    const total = this.pois.length - 1;

    for (let i = 0; i < size; i++) {
      const route = [0, ...getRandomPositions(total, 1, total)];
      this.population[i] = {
        route,
        fitness: this._getFitness(route)
      };
    }

    // init best individual
    const first_route = Array.from(this.pois.keys());
    this.bestIndividual = {
      route: first_route,
      fitness: this._getFitness(first_route)
    };
  }

  sort() {
    // sort population according to Fitness value of individuals
    this.population.sort((a, b) => b.fitness - a.fitness);
    const best = this.population[this.population.length - 1];

    if (best.fitness < this.bestIndividual.fitness) this.bestIndividual = best;
  }

  selection() {
    //select individuals to crossover
    let total = Math.floor(this.population.length * this.crossOverProbability);
    total = total % 2 === 0 ? total : total + 1; // it has to be an even number because of crossover
    const others = Math.floor(total / 8);
    const best = total - others;
    const cut_point = this.population.length - best;

    const random_elements = [];
    const positions = getRandomPositions(others, 0, cut_point);

    for (let i of positions) random_elements.push(this.population[i]);

    return [...random_elements, ...this.population.slice(cut_point)];
  }

  crossover(parents) {
    const newPopulation = [];
    const usedParents = [];
    const total = parents.length;
    while (usedParents.length !== total) {
      const positions =
        parents.length === 2
          ? [0, 1]
          : getRandomPositions(2, 0, parents.length); //random positions
      const parent1 = parents[positions[0]],
        parent2 = parents[positions[1]];
      usedParents.push(parent1);
      usedParents.push(parent2);

      if (positions[0] > positions[1]) {
        parents.splice(positions[0], 1);
        parents.splice(positions[1], 1);
      } else {
        parents.splice(positions[1], 1);
        parents.splice(positions[0], 1);
      }

      const routes = crossoverParents(parent1.route, parent2.route);
      for (const route of routes)
        newPopulation.push({
          route: route,
          fitness: this._getFitness(route)
        });
    }
    population = newPopulation.concat(usedParents);

    function crossoverParents(parent1, parent2) {
      const [even, odd] = getPositionsAndMaps();
      return crossoverPoints(even).concat(crossoverPoints(odd));

      function crossoverPoints(parameters) {
        const [positions, maps] = parameters;
        let childs = [[0], [0]];
        for (let i = 1; i < parent1.length; i++) {
          if (positions.includes(i)) {
            childs[0][i] = parent1[i];
            childs[1][i] = parent2[i];
          } else {
            childs[0][i] =
              maps[0][parent2[i]] !== undefined
                ? maps[0][parent2[i]]
                : parent2[i];
            childs[1][i] =
              maps[1][parent1[i]] !== undefined
                ? maps[1][parent1[i]]
                : parent1[i];
          }
        }
        return childs;
      }
      function getPositionsAndMaps() {
        //return the positions of chromosomes and points to be mapped
        const evenPositions = [],
          oddPositions = [];
        const evenPoints = [[], []],
          oddPoints = [[], []];
        for (let i = 1; i <= parent1.length - 1; i += 2) {
          //even
          evenPoints[0].push(parent1[i]);
          evenPoints[1].push(parent2[i]);
          evenPositions.push(i);
          //odd
          oddPoints[0].push(parent1[i + 1]);
          oddPoints[1].push(parent2[i + 1]);
          oddPositions.push(i + 1);
        }
        const last = oddPoints[0].length - 1;
        if (oddPoints[0][last] === undefined) {
          oddPoints[0].splice(last, 1);
          oddPoints[1].splice(last, 1);
          oddPositions.splice(last, 1);
        }
        return [
          [evenPositions, getMaps(evenPoints)],
          [oddPositions, getMaps(oddPoints)]
        ];
      }
      function getMaps(points) {
        //return the points to be mapped
        const [ar1, ar2] = points;
        for (let i = 0; i < ar1.length; ++i) {
          const index = ar2.indexOf(ar1[i]);
          if (index !== -1) {
            ar2[index] = ar2[i];
            ar1.splice(i, 1);
            ar2.splice(i, 1);
            i--;
          }
        }
        const m1 = {},
          m2 = {};
        for (const i in ar1) {
          m1[ar1[i]] = ar2[i];
          m2[ar2[i]] = ar1[i];
        }
        return [m1, m2];
      }
    }
  }

  mutation(mutation_probability) {
    function mutate(individual) {
      const route = individual.route;
      const positions = getRandomPositions(
        Math.floor((route.length - 1) / 2),
        1,
        route.length - 1
      );
      for (let p = 0; p < positions.length - 1; p += 2) {
        const aux = route[positions[p]];
        route[positions[p]] = route[positions[p + 1]];
        route[positions[p + 1]] = aux;
      }
      individual.fitness = getFitness(route);
    }

    population.forEach(individual => {
      if (Math.random() < mutation_probability) {
        mutate(individual);
      }
    });
  }

  evolve() {
    timeMatrix = parameters.timeMatrix;
    date = parameters.travelDate;
    lunch_start = date.getTime() + 3 * 3600 * 1000;
    lunch_end = lunch_start + 3600 * 1000;

    pois = parameters.pois;
    //---EVOLVE---
    for (let i = 0; i < parameters.totalGenerations; i++) {
      crossoverAllParents(this.selection());
      mutation(parameters.mutation_rate);
      this.sort();
    }

    return buildSchedule(bestIndividual.route);
  }

  _getFitness(individual) {
    //calculate fitness value of any individual
    let travel_time = this.timeMatrix[0][individual[1]].duration;
    let total =
      travel_time + this.pois[individual[individual.length - 1]].expected_time;
    const day_schedule = moment(this.travelDate);

    for (let i = 1; i < individual.length - 1; i++) {
      // time duration to arrive to the next poi
      travel_time = this.timeMatrix[individual[i]][individual[i + 1]].duration;
      // expected time to visit POI
      const expected_time = Number(this.pois[individual[i]].expected_time);
      //get penalties
      const penalties = this._calculatePenalties(
        day_schedule,
        this.pois[individual[i]],
        this.timeMatrix[individual[i]][individual[i - 1]].duration // Spent time to arrive to the current POI
      );
      const spent1 = this._addSpentTime(day_schedule, expected_time);
      const spent2 = this._addSpentTime(day_schedule, travel_time);

      total += spent1 + spent2 + expected_time + travel_time + penalties;
    }

    return Math.abs(this.availableTime - total);
  }

  _addSpentTime(currentTime, timeToSpend) {
    let lunch_time = 0;

    if (this.hadLunch) currentTime.add(timeToSpend, "m");
    else {
      const next_stop = currentTime.clone();
      next_stop.add(timeToSpend, "m");

      if (this.lunchTimeStart.isBetween(currentTime, next_stop, "m", "[]"))
        lunch_time = this._haveLunch(currentTime, next_stop);
      else currentTime.add(timeToSpend, "m");
    }

    return lunch_time;
  }

  _haveLunch(currentDate, nextDate) {
    let invaded_time;
    const time_window = nextDate.diff(currentDate, "m"); // spent time between 2 events (visiting a POI or travelling to the next POI)
    const lunch_time = this.lunchTimeEnd.diff(this.lunchTimeStart, "m");
    const diff1 = Math.abs(this.lunchTimeStart.diff(currentDate, "m"));
    const diff2 = Math.abs(this.lunchTimeStart.diff(nextDate, "m"));

    if (diff1 < diff2) {
      currentDate.add(lunch_time, "m");
      currentDate.add(time_window, "m");
      invaded_time = diff1;
    } else {
      currentDate.add(time_window, "m");
      currentDate.add(lunch_time, "m");
      invaded_time = diff2;
    }

    this.hadLunch = true;

    return lunch_time + invaded_time;
  }

  _calculatePenalties(date, poi, travel_time) {
    let open_time, close_time;
    try {
      open_time = this._buildDate(poi.opening_hours.periods[date.day()].open);
      close_time = this._buildDate(poi.opening_hours.periods[date.day()].close);
    } catch (_) {
      // TODO remove this
      open_time = this._buildDate(this.travelSchedule.start);
      close_time = this._buildDate(this.travelSchedule.end);
    }

    if (!date.isBetween(open_time, close_time, "minutes", "[)"))
      return date.diff(open_time, "minutes") < 0
        ? open_time.diff(date, "minutes")
        : travel_time;

    return 0;
  }

  _buildDate(timeString) {
    // string of 4 chars
    const [hour, minutes] = timeString.match(/\d{2}/g).map(x => Number(x));

    return moment(this.travelDate)
      .hour(hour)
      .minutes(minutes)
      .seconds(0);
  }

  _buildSchedule(individual) {
    let duration = timeMatrix[0][individual[1]].duration;
    const schedule = [];
    const hours = new Date(date);

    const time_ini = new Date(date);
    time_ini.setTime(date.getTime() - duration * 60 * 1000);

    //location User
    schedule.push({ poi: pois[0] });
    //---ROUTE TO FIRST POI---
    schedule.push({
      route: timeMatrix[0][individual[1]].points,
      departure: time_ini.toTimeString().split(" ")[0],
      arrival: date.toTimeString().split(" ")[0]
    });

    for (let i = 1; i < individual.length - 1; i++) {
      duration = timeMatrix[individual[i]][individual[i + 1]].duration;
      const expected_time = parseFloat(pois[individual[i]].expected_time);

      //visit time to POI
      const visit_time = { poi: pois[individual[i]] };

      //route to next POI
      const next = {
        route: timeMatrix[individual[i]][individual[i + 1]].points
      };

      //POI expected visit time
      setTime(hours, expected_time, visit_time);
      schedule.push(visit_time);

      //time to travel to de next POI
      setTime(hours, duration, next);
      schedule.push(next);

      //lunch time
      if (hours.getTime() >= lunch_start && hours.getTime() < lunch_end) {
        const lunch_time = {
          lunch: true,
          location: pois[individual[i + 1]].location
        };
        setTime(hours, 60, lunch_time);
        schedule.push(lunch_time);
      }
    }
    const last = { poi: pois[individual[individual.length - 1]] };
    setTime(hours, pois[individual[individual.length - 1]].expected_time, last);
    schedule.push(last);

    return schedule;

    function setTime(date, duration, obj) {
      obj.start = date
        .toTimeString()
        .split(":", 2)
        .join(":");
      date.setTime(date.getTime() + duration * 60 * 1000);
      obj.end = date
        .toTimeString()
        .split(":", 2)
        .join(":");
    }
  }
}

module.exports.GeneticAlgorithm = GeneticAlgorithm;
