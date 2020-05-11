class Person {
  constructor(radius, x, y, velX, velY, mask) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.mask = mask;
    this.infected = false;
    this.time = -1;
    this.recoveryTime = 0;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getVelX() {
    return this.velX;
  }
  getVelY() {
    return this.velY;
  }
  getRadius() {
    return this.radius;
  }
  isInfected() {
    return this.infected;
  }
  hasMask() {
    return this.mask;
  }
  wasInfected() {
    if (!this.infected && this.time >= 0) {
      return true;
    } else {
      return false;
    }
  }
  setInfected(time, recoveryTime) {
    if (!(this.isInfected() || this.wasInfected())) {
      this.time = time;
      this.recoveryTime = recoveryTime;
      this.infected = true;
    }
  }
  update(time) {
    if (time - this.time >= this.recoveryTime) {
      this.infected = false;
    }
  }
  infection() {
    if (this.mask) {
      return false;
    }
    if (this.infected) {
      return true;
    }
    return false;
  }
  contact(infection, time, recoveryTime) {
    this.velX = (-1) * this.velX;
    this.velY = (-1) * this.velY;
    if (this.infected | (infection & !this.mask)) {
      this.setInfected(time, recoveryTime);
    }
  }
  move() {
    if (this.x + this.radius > width || this.x - this.radius < 0) {
      this.velX = (-1) * this.velX;
    }
    if (this.y + this.radius > height || this.y - this.radius < 0) {
      this.velY = (-1) * this.velY;
    }
    this.x += this.velX;
    this.y += this.velY;

  }
}
