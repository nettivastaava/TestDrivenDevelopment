import { Block } from "./Block.mjs";

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

  drop(Block) {
    for (var i=0;i<this.height-1;i++) {
      for (var j=0;j<this.width;j++) {
        if (this.board[i][j]!=='.') {
          throw 'already falling';
        }
      }
    }

    this.movingAllowed = true;
    this.board[0][1] = Block.color;
  }

  tick() {
    for (var i=0;i<this.height-1;i++) {
      if (this.board[i][1] !== '.' && this.board[i+1][1] === '.') {
        this.board[i+1][1]=this.board[i][1];
        this.board[i][1]='.';
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
