import { Block } from "./Block.mjs";

export class Board {
  width;
  height;
  board;
  movingAllowed;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.movingAllowed = false;

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
    if (this.hasFalling()) {
      throw 'already falling';
    }

    this.movingAllowed = true;


    if (Block.color) {
      this.board[0][1] = Block.color;
    } else if (Block.shape) {
      for (var i=0;i<2;i++) {
        for (var j=3;j<6;j++) {
          this.board[i][j]=Block.shape[i][j-3];
        }
      }
    }
  }

  moveLeft() {
    if (this.movingAllowed) {
      for (var i=this.height-1;i>=0;i--) {
        for (var j=0;j<this.width-1;j++) {
          this.board[i][j]=this.board[i][j+1];
        }
      }
    }
  }

  moveRight() {
    if (this.movingAllowed) {
      for (var i=this.height-1;i>=0;i--) {
        for (var j=this.width;j>0;j--) {
          this.board[i][j]=this.board[i][j-1];
        }
      }
    }
  }

  tick() {
    var moved = false;
    for (var i=this.height-2;i>=0;i--) {
      var indexesToLower = new Array(this.width)
      for (var j=0;j<this.width;j++) {
        if (this.board[i][j]!=='.' && this.board[i+1][j]==='.') {
          indexesToLower[j]=true
        } else if (this.board[i][j]!=='.' && this.board[i+1][j]!=='.') {
          indexesToLower=new Array(this.width)
          break;
        }
      }
      for (var m=0;m<this.width;m++) {
        if (indexesToLower[m]) {
          this.board[i+1][m]=this.board[i][m];
          this.board[i][m]='.'
          moved=true;
        }
      }
    }
    
    if (!moved) {
      this.movingAllowed = false;
    }
  }

  hasFalling() {
    return this.movingAllowed;
  }
}
