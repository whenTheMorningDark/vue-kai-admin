class Adjoin {
  constructor(vertex) {
    this.vertex = vertex;
    this.quantity = vertex.length;
    this.init();
  }

  init () {
    this.adjoinArray = Array.from({ length: this.quantity * this.quantity });
  }
}
export default Adjoin;