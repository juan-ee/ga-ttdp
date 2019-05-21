const { getRandomPositions } = require("./utilities");
const { get } = require("lodash");
const moment = require("moment");

class GeneticAlgorithm {
  constructor(parameters) {
    this.travelSchedule = parameters.travelSchedule;
    this.totalGenerations = parameters.totalGenerations;
    this.travelDate = parameters.travelDate;
    this.pois = parameters.pois;
    this.timeMatrix = parameters.timeMatrix;
    this.crossOverProbability = parameters.crossOverProbability;
    this.mutationProbability = parameters.mutationProbability;
    this.travelDate = this._buildDate(this.travelSchedule.start);
    this.availableTime = this._buildDate(this.travelSchedule.end).diff(
      this.travelDate,
      "minutes"
    );
    this.lunchTime = {
      start: this._buildDate(parameters.lunchTime.start),
      end: this._buildDate(parameters.lunchTime.end)
    };
    this.initPopulation(parameters.populationSize);
    this.sort();
  }

  initPopulation(size) {
    this.population = [];
    const total = this.pois.length - 1;

    for (let i = 0; i < size; i++) {
      const route = [0, ...getRandomPositions(total, 1, total)];

      this.population[i] = this._createChromosome(route);
    }

    // init best individual
    const first_route = Array.from(this.pois.keys());
    this.bestIndividual = this._createChromosome(first_route);
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
    while (newPopulation.length < this.population.length) {
      const positions = getRandomPositions(2, 0, parents.length); // random positions
      const parent1 = parents[positions[0]];
      const parent2 = parents[positions[1]];

      for (const route of this._crossoverParents(parent1.route, parent2.route))
        newPopulation.push(this._createChromosome(route));
    }
    this.population = newPopulation;
  }

  mutation() {
    this.population.forEach(individual => {
      if (Math.random() < this.mutationProbability) {
        this._mutate(individual);
      }
    });
  }

  evolve() {
    for (let i = 0; i < this.totalGenerations; i++) {
      this.crossover(this.selection());
      this.mutation();
      this.sort();
    }

    return this._buildItinerary(this.bestIndividual);
  }

  _mutate(individual) {
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
    individual.lunchTime = null;
    individual.fitness = this._getFitness(individual);
  }

  _getFitness(individual) {
    //calculate fitness value of any individual
    const route = individual.route;
    let travel_time = this.timeMatrix[0][route[1]].duration;
    let total = travel_time + this.pois[route[route.length - 1]].expected_time;
    const day_schedule = moment(this.travelDate);

    for (let i = 1; i < route.length - 1; i++) {
      // time duration to arrive to the next poi
      travel_time = this.timeMatrix[route[i]][route[i + 1]].duration;
      // expected time to visit POI
      const expected_time = Number(this.pois[route[i]].expected_time);
      //get penalties
      const penalties = this._calculatePenalties(
        day_schedule,
        this.pois[route[i]],
        this.timeMatrix[route[i]][route[i - 1]].duration // Spent time to arrive to the current POI
      );
      const spent1 = this._addSpentTime(
        individual,
        day_schedule,
        expected_time
      );
      const spent2 = this._addSpentTime(individual, day_schedule, travel_time);

      total += spent1 + spent2 + expected_time + travel_time + penalties;
    }

    return Math.abs(this.availableTime - total);
  }

  _addSpentTime(individual, currentTime, timeToSpend) {
    let lunch_time = 0;

    if (individual.lunchTime !== null) currentTime.add(timeToSpend, "m");
    else {
      const next_stop = currentTime.clone();
      next_stop.add(timeToSpend, "m");

      if (this.lunchTime.start.isBetween(currentTime, next_stop, "m", "[]"))
        lunch_time = this._haveLunch(individual, currentTime, next_stop);
      else currentTime.add(timeToSpend, "m");
    }

    return lunch_time;
  }

  _haveLunch(individual, currentDate, nextDate) {
    let invaded_time;
    const time_window = nextDate.diff(currentDate, "m"); // spent time between 2 events (visiting a POI or travelling to the next POI)
    const lunch_time = this.lunchTime.end.diff(this.lunchTime.start, "m");
    const diff1 = Math.abs(this.lunchTime.start.diff(currentDate, "m"));
    const diff2 = Math.abs(this.lunchTime.start.diff(nextDate, "m"));

    individual.lunchTime = {};
    if (diff1 < diff2) {
      individual.lunchTime.start = currentDate.clone();
      currentDate.add(lunch_time, "m");
      individual.lunchTime.end = currentDate.clone();
      currentDate.add(time_window, "m");
      invaded_time = diff1;
    } else {
      currentDate.add(time_window, "m");
      individual.lunchTime.start = currentDate.clone();
      currentDate.add(lunch_time, "m");
      individual.lunchTime.end = currentDate.clone();
      invaded_time = diff2;
    }

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

  _crossoverParents(parent1, parent2) {
    const [even, odd] = this._getPositionsAndMaps(parent1, parent2);
    return [...pmx(even), ...pmx(odd)];

    function pmx(parameters) {
      const [positions, maps] = parameters;
      let children = [[0], [0]];
      for (let i = 1; i < parent1.length; i++) {
        if (positions.includes(i)) {
          children[0][i] = parent1[i];
          children[1][i] = parent2[i];
        } else {
          children[0][i] =
            maps[0][parent2[i]] !== undefined
              ? maps[0][parent2[i]]
              : parent2[i];
          children[1][i] =
            maps[1][parent1[i]] !== undefined
              ? maps[1][parent1[i]]
              : parent1[i];
        }
      }
      return children;
    }
  }

  _getPositionsAndMaps(parent1, parent2) {
    //return the positions of chromosomes and points to be mapped
    const evenPositions = [],
      oddPositions = [];
    const evenPoints = [[], []],
      oddPoints = [[], []];

    for (let i = 1; i <= parent1.length - 1; i += 2) {
      // even
      evenPoints[0].push(parent1[i]);
      evenPoints[1].push(parent2[i]);
      evenPositions.push(i);
      // odd
      oddPoints[0].push(parent1[i + 1]);
      oddPoints[1].push(parent2[i + 1]);
      oddPositions.push(i + 1);
    }

    const last = oddPoints[0].length - 1;

    if (oddPoints[0][last] === undefined) {
      // when the array.length % 2 = 0, the last element will be undefined
      oddPoints[0].splice(last, 1);
      oddPoints[1].splice(last, 1);
      oddPositions.splice(last, 1);
    }
    return [
      [evenPositions, GeneticAlgorithm._getMaps(evenPoints)],
      [oddPositions, GeneticAlgorithm._getMaps(oddPoints)]
    ];
  }

  static _getMaps(points) {
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

  _buildItinerary(chromosome) {
    let had_lunch = false;
    const pois = this.pois;
    const timeMatrix = this.timeMatrix;
    const route = chromosome.route;
    const itinerary = [];
    const current_time = this.travelDate.clone();

    // From home to the first POI
    current_time.subtract(this.timeMatrix[0][route[1]].duration, "m");

    // User location
    itinerary.push({
      type: "home",
      ...this.pois[route[0]]
    });

    let position = 0;
    let [obj, duration, next_event] = _getEvent("route", position);

    while (position < route.length - 1) {
      const next_time = current_time.clone();
      next_time.add(duration, "m");

      if (
        !had_lunch &&
        get(
          chromosome,
          "lunchTime.start",
          this.travelDate.clone().add(1, "d")
        ).isBefore(next_time)
      ) {
        const lunch_duration = chromosome.lunchTime.end.diff(
          chromosome.lunchTime.start,
          "m"
        );

        itinerary.push({
          type: "lunch",
          duration: lunch_duration,
          schedule: _getSchedule(lunch_duration)
        });
        had_lunch = true;
      }

      itinerary.push({
        ...obj,
        schedule: _getSchedule(duration)
      });

      [obj, duration, next_event] = _getEvent(next_event, position);
    }

    itinerary.push({
      ...obj,
      schedule: _getSchedule(duration)
    });

    // Last POI
    [obj, duration] = _getEvent(next_event, position);

    itinerary.push({
      ...obj,
      schedule: _getSchedule(duration)
    });

    return itinerary;

    function _getEvent(currentEvent, i) {
      if (currentEvent === "poi") {
        const poi = pois[route[position]];

        return [
          {
            type: "poi",
            ...poi
          },
          poi.expected_time,
          "route"
        ];
      }

      const next_route = timeMatrix[route[i]][route[i + 1]];
      position += 1;

      return [
        {
          type: "route",
          ...next_route
        },
        next_route.duration,
        "poi"
      ];
    }

    function _getSchedule(duration) {
      const start = current_time.format("HH:mm");

      current_time.add(duration, "minutes");

      return {
        start,
        end: current_time.format("HH:mm")
      };
    }
  }

  _createChromosome(route) {
    const chromosome = {
      route,
      lunchTime: null
    };

    chromosome.fitness = this._getFitness(chromosome);

    return chromosome;
  }
}

module.exports.GeneticAlgorithm = GeneticAlgorithm;
