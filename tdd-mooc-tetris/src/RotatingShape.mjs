export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = '';

    const characters = shape.split("");

    for (var i=0;i<characters.length;i++) {
      if (characters[i].match(/[a-z]/i)) {
        this.shape += characters[i];
      } else {
        this.shape += '\n';
        i+=5;
      }
    }
    this.shape+='\n';
  }

  toString() {

    return this.shape;
  }
}