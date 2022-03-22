export class RotatingShape {
  shape;
  size;

  constructor(shape) {
    var characters = shape.split("");
    var length = 0;
    var charSet = '';
    for (var i=0;i<characters.length;i++) {
      if (characters[i].match(/^\s+$/) === null) {
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
    var newCharSet = '';

    for (var i=0;i<this.size;i++) {
      for (var j=this.size-1;j>=0;j--) {
        newCharSet+=this.shape[j][i];
      }
      newCharSet+=' ';
    }
    return new RotatingShape(newCharSet);
  }

  rotateLeft() {
    var newCharSet = '';

    for (var i=this.size-1;i>=0;i--) {
      for (var j=0;j<this.size;j++) {
        newCharSet+=this.shape[j][i];
      }
      newCharSet+=' ';
    }
    return new RotatingShape(newCharSet);
  }
}