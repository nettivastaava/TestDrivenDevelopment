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

    if (this.checkOShape()) {
      return this.rotateO();
    }

    for (var i=0;i<this.size;i++) {
      for (var j=this.size-1;j>=0;j--) {
        newCharSet+=this.shape[j][i];
      }
      newCharSet+=' ';
    }
    return new RotatingShape(newCharSet);
  }

  checkIShape() {
    if (this.size < 5) {
      return false;
    }
    var i=0;
    for (var j=0;j<this.size-1;j++) {
      if (this.shape[i][j]!=='.') {
        return false;
      }
    }

    return true;
    
  }

  checkOShape() {
    if (this.size > 3) {
      return false;
    }
    console.log('THIS SHAPE IS ', this.shape);
    for (var i=0;i<this.size-1;i++) {
      if (this.shape[0][i]==='O') {
        return true;
      }
    }
    return false;
  }

  rotateLeftI() {
    var newCharSet = '';

    for (var i=this.size-2;i>=0;i--) {
      for (var j=0;j<this.size-1;j++) {
        newCharSet+=this.shape[j][i];
      }
      newCharSet+=' .';
    }
    newCharSet+=' .....';
    return new RotatingShape(newCharSet);
  }

  rotateO() {
    var newCharSet = '';
    console.log('THIS ', this.shape)

    for (var i=0;i<this.size;i++) {
      for (var j=0;j<this.size;j++) {
        newCharSet+=this.shape[i][j];
      }
      newCharSet+=' ';
    }
    return new RotatingShape(newCharSet);
  }

  rotateLeft() {
    var newCharSet = '';

    if (this.checkIShape()) {
      return this.rotateLeftI();
    } else if (this.checkOShape()) {
      console.log('IS O SHAPE');
      return this.rotateO();
    }

    for (var i=this.size-1;i>=0;i--) {
      for (var j=0;j<this.size;j++) {
        newCharSet+=this.shape[j][i];
      }
      newCharSet+=' ';
    }
    return new RotatingShape(newCharSet);
  }
}