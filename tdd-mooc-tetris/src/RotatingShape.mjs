export class RotatingShape {
  shape;
  size;

  constructor(shape) {
    var characters = shape.split("");
    var length = 0;
    var charSet = '';
    for (var i=0;i<characters.length;i++) {
      if (characters[i].match(/[a-z]/i)) {
        length++;
        charSet+=characters[i];
      }
    }

    if (length%5 === 0) {
      this.size=5;
    } else {
      this.size=3;
    }

    this.shape = new Array(this.size);
    var charIndex = 0;
    charSet = charSet.split("");

    for (var i=0;i<this.size;i++) {
      this.shape[i]=new Array();
      for (var j=0;j<this.size;j++) {
        this.shape[i][j]=charSet[charIndex];
        charIndex++;
      }
    }
  }

  toString() {
    var shapeRepresentation = '';

    for (var i=0;i<this.size;i++) {
      for (var j=0;j<this.size;j++) {
        shapeRepresentation += this.shape[i][j];
       }
       shapeRepresentation += '\n';
    }
    return shapeRepresentation;
  }

  rotateRight() {
    var newShape = new Array(this.size);

    for (var i=0;i<this.size;i++) {
      newShape[i]=new Array();
    }

    for (var i=0, a=this.size-1;i<this.size && a>=0;i++, a--) {
      for (var j=0, b=0;j<this.size && b<this.size;j++, b++) {
        newShape[b][a]=this.shape[i][j];
      }
    }

    this.shape=newShape;
    return this.toString();

  }
}