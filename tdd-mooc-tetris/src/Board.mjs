export class Board {
  width;
  height;
  board;
  movingAllowed;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.movingAllowed = true;

    this.board = new Array(this.height)

    for (var i=0;i<this.height;i++) {
      this.board[i]=new Array();
      for (var j=0;j<this.width;j++) {
       this.board[i][j]='.';
      }
     }
  }

  toString() {
    var boardRepresentation = '';

    for (var i=0;i<this.height;i++) {
      for (var j=0;j<this.width;j++) {
       boardRepresentation += this.board[i][j];
      }
      boardRepresentation += '\n';
     }

    return boardRepresentation;
  }

  drop() {
    for (var i=0;i<this.height;i++) {
      for (var j=0;j<this.width;j++) {
        if (this.board[i][j]!=='.') {
          throw 'already falling';
        }
      }
    }

    this.board[0][1] = 'X';
  }

  tick() {
    for (var i=0;i<this.height-1;i++) {
      if (this.board[i][1] === 'X') {
        this.board[i][1]='.';
        this.board[i+1][1]='X';
        return;
      }
    }
    if (this.board[this.height-1][1] === 'X') {
      this.movingAllowed = false;
    }
  }

  hasFalling() {
    return this.movingAllowed;
  }
}
