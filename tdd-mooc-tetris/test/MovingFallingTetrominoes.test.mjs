
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

function moveToLeftEdge(board) {
  for (let i=0;i<10;i++) {
    board.moveLeft();
  }
}

describe("Moving falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
  });
  
  it("move left", () => {
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("move right", () => {
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("move down", () => {
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  it("cannot go left beyond the board", () => {
    board.moveToLeftEdge();
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  })
});
  