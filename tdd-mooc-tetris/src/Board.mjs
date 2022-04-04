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
        var moved = false;
        var rowWithBlocks = false;
        for (var j=0;j<this.width-1;j++) {
          if (this.board[i][j]==='.' && this.board[i][j+1]!=='.') {
            this.board[i][j]=this.board[i][j+1];
            this.board[i][j+1]='.';
            moved = true;
          } else if (this.board[i][j]!=='.') {
            rowWithBlocks=true;
          }
        }
        if (!moved && rowWithBlocks) {
          this.movingAllowed=false;
          return;
        }
      }
    }
  }

  moveRight() {
    var rightEdge = this.width-1;
    if (this.movingAllowed) {
      for (var i=this.height-1;i>=0;i--) {
        var moved = false;
        var rowWithBlocks = false;
        for (var j=rightEdge;j>0;j--) {
          if (this.board[i][j]==='.' && this.board[i][j-1]!=='.') {
            this.board[i][j]=this.board[i][j-1];
            this.board[i][j-1]='.';
            moved = true;
          } else if (this.board[i][j]!=='.') {
            if (this.board[i][j]!=='.' && this.board[i][j-1]!=='.') {
              rightEdge=j;
            }
            rowWithBlocks=true;
          }
        }
        if (!moved && rowWithBlocks) {
          this.movingAllowed=false;
          return;
        }
      }
    }
  }

  checkLength(row, index) {
    var endIndex = index;
    for (var i = index; i < this.width; i++) {
      if (row[i]!=='.') {
        endIndex = i;
      } else {
        break;
      }
    }
    return endIndex;
  }

  canFall(row, start, end) {
    for (var i = start; i <= end; i++) {
      if (row[i]!=='.') {
        return false;
      }
    }

    return true;
  }

  moveDown() {
    if (this.movingAllowed) {
      var moved = false;
      for (var i=this.height-1;i>0;i--) {
        var upperRowLastIndex = null;
        for (var j=0;j<this.width;j++) {
          if (this.board[i][j]==='.' && this.board[i-1][j]!=='.') {
            upperRowLastIndex=this.checkLength(this.board[i-1], j);
            if (this.canFall(this.board[i], j, upperRowLastIndex)) {
              for (var m = j; m <= upperRowLastIndex; m++) {
                this.board[i][m]=this.board[i-1][m];
                this.board[i-1][m]='.';
              }
              moved=true;
            }
            j=upperRowLastIndex;
          }
        }
      }
      if (!moved) {
        this.movingAllowed=false;
        return;
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
