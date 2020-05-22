class Dog {
  constructor() {
    this.r = 70;
    this.x = 50;
    this.y = height - 50;
    this.vy = 0;
    this.gravity = 0.9;
  }

  jump() {
    if (this.y == height - this.r) {
      this.vy = -20;

    }
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y , 0, height - this.r);
  }

  show() {
    image(dImg, this.x, this.y, this.r, this.r);

  }
}
