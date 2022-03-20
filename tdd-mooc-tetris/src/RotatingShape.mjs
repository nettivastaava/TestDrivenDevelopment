export class RotatingShape {
  shape;
  size;
  initShape;

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
    this.initShape=this.shape;
  }

  toString() {
    var shapeRepresentation = '';

    for (var i=0;i<this.size;i++) {
      for (var j=0;j<this.size;j++) {
        shapeRepresentation += this.shape[i][j];
       }
       shapeRepresentation += '\n';
    }
    this.shape=this.initShape;

    return shapeRepresentation;
  }

  newArray() {
    var newArray = new Array(this.size);

    for (var i=0;i<this.size;i++) {
      newArray[i]=new Array();
    }

    return newArray;
  }

  rotateRight() {
    var newShape = this.newArray();

    for (var i=0, a=this.size-1;i<this.size && a>=0;i++, a--) {
      for (var j=0, b=0;j<this.size && b<this.size;j++, b++) {
        newShape[b][a]=this.shape[i][j];
      }
    }
    this.shape=newShape;
    return this.toString();
  }

  rotateLeft() {
    var newShape = this.newArray();

    for (var i=0, a=0;i<this.size && a<this.size;i++, a++) {
      for (var j=0, b=this.size-1;j<this.size && b>=0;j++, b--) {
        newShape[b][a]=this.shape[i][j];
        console.log('new ', newShape[b][a]);
      }
    }

    this.shape=newShape;
    return this.toString();
  }
}