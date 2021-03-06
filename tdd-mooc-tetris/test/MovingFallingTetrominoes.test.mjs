
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function moveToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.moveDown();
  }
}

function moveToLeftEdge(board) {
  for (let i=0;i<10;i++) {
    board.moveLeft();
  }
}

function moveToRightEdge(board) {
  for (let i=0;i<10;i++) {
    board.moveRight();
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
    moveToLeftEdge(board);
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  })

  it("cannot go right beyond the board", () => {
    moveToRightEdge(board);
    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  })
  it("cannot go down beyond the board", () => {
    moveToBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  })
  it("cannot go left through other blocks", () => {
    moveToLeftEdge(board);
    board.drop(Tetromino.T_SHAPE);
    moveToLeftEdge(board);
    expect(board.toString()).to.equalShape(
      `.T..T.....
       TTTTTT....
       ..........
       ..........
       ..........
       ..........`
    );
  })
  it("cannot go right through other blocks", () => {
    moveToRightEdge(board);
    board.drop(Tetromino.T_SHAPE);
    moveToRightEdge(board);
    expect(board.toString()).to.equalShape(
      `.....T..T.
       ....TTTTTT
       ..........
       ..........
       ..........
       ..........`
    );
  })
  it("cannot go down through other blocks", () => {
    moveToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    moveToBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  })
});
  