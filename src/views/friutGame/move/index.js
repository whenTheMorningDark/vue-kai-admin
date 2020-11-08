class Move {
  constructor({start, end, speed}) {
    this.speed = speed;
    this.start = start;
    this.end = end;
    this.timer = null;
    this.isMove = false;
  }

  start() {
    if (this.isMove) {
      return;
    }
    this.timer = setInterval(() => {
      this.start++;
      if (this.start >= this.end) {
        clearInterval(this.timer);
      }
      console.log("move");
    }, this.speed);
  }
}