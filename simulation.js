var people = [];
var clock = 0;
var stat = {
  infected: [],
  sane: [],
  immune: []
};


const RECOVERY_TIME = 1000;
const RADIUS = 12;
const MAX_VEL = 5;
const INFECTED_COLOR = "#E60026";
const INFECTED_MASK_COLOR = "#EF7F1A";
const SANE_COLOR = "#3BB143";
const SANE_MASK_COLOR = "#FFE900";
const IMMUNE_COLOR = "#828282";

function setup() {
  var canvas = createCanvas(windowWidth*0.75, windowHeight);

  canvas.parent('simulation');
}

function draw() {
  if (inicio === true && !created) {
    createPeople();
    created = true;
  }
  if (inicio === false) {
    people = [];
    created = false;

  }
  background(255);
  showPeople();
  if (!pause) {
    movePeople();
    updatePeople();
    statistics();
    clock++;
  }


}

function windowResized() {
  resizeCanvas(windowWidth*0.75, windowHeight);
}

function createPeople() {
  for (var i = 0; i < numPeople; i++) {
    var hasMask = false;
    var isInfected = false;
    var x = random(RADIUS, width - RADIUS);
    var y = random(RADIUS, height - RADIUS);
    for (var j = 0; j < people.length; j++) {
      while (dist(x, y, people[j].getX(), people[j].getY()) <= RADIUS + people[j].getRadius()) {
        x = random(RADIUS, width - RADIUS);
        y = random(RADIUS, height - RADIUS);
      }
    }
    if (random(1) <= maskRate) {
      hasMask = true;
    }
    if (random(1) <= infectedRate) {
      isInfected = true;
    }

    people.push(new Person(RADIUS, x, y, random(-MAX_VEL * interactionRate, MAX_VEL * interactionRate), random(MAX_VEL * interactionRate, MAX_VEL * interactionRate), hasMask));
    if (isInfected) {
      people[i].setInfected(clock, RECOVERY_TIME);
    }
  }
}

function movePeople() {
  for (var i = 0; i < people.length; i++) {
    for (var j = i + 1; j < people.length; j++) {
      if (dist(people[i].getX(), people[i].getY(), people[j].getX(), people[j].getY()) < people[i].getRadius()) {
        people[i].contact(people[j].infection(), clock, RECOVERY_TIME);
        people[j].contact(people[i].infection(), clock, RECOVERY_TIME);
      }
    }
  }
  for (var i = 0; i < people.length; i++) {
    people[i].move();
  }

}

function showPeople() {
  for (var i = 0; i < people.length; i++) {
    if (people[i].isInfected()) {
      if (people[i].hasMask()) {
        fill(INFECTED_MASK_COLOR);
      } else {
        fill(INFECTED_COLOR);
      }
    } else {
      if (people[i].hasMask()) {
        fill(SANE_MASK_COLOR);
      } else {
        fill(SANE_COLOR);
      }
    }
    if (people[i].wasInfected()) {
      fill(IMMUNE_COLOR);
    }
    ellipse(people[i].getX(), people[i].getY(), people[i].getRadius(), people[i].getRadius());
  }

}

function updatePeople() {
  for (var i = 0; i < people.length; i++) {
    people[i].update(clock);
  }
}

function statistics() {
  var numInfected = 0;
  var numSane = 0;
  var numImmune = 0;
  for (var i = 0; i < people.length; i++) {
    if (people[i].isInfected()) {
      numInfected++;
    } else {
      if (people[i].wasInfected()) {
        numImmune++;
      } else {
        numSane++;
      }
    }
  }
  $("#infectedStat").text(numInfected);
  $("#saneStat").text(numSane);
  $("#immuneStat").text(numImmune);
  stat.infected.push(numInfected);
  stat.sane.push(numSane);
  stat.immune.push(numImmune);
  graph();

}
