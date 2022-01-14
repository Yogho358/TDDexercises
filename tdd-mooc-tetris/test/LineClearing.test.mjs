import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function moveTenDown(board) {
    for (let i = 0; i < 10; i++) {
        board.moveDown();
    }
}

function moveTenLeft(board) {
    for (let i = 0; i < 10; i++) {
        board.moveLeft();
    }
}

function moveTenRight(board) {
    for (let i = 0; i < 10; i++) {
        board.moveRight();
    }
}

describe("Clearing lines", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    it("line clears when full", () => {

        board.drop(Tetromino.T_SHAPE);
        board.rotateRight();
        board.rotateRight();
        moveTenLeft(board);
        moveTenDown(board);
        board.drop(Tetromino.T_SHAPE);
        board.rotateRight();
        board.rotateRight();
        moveTenDown(board);
        board.drop(Tetromino.I_SHAPE);
        moveTenRight(board);
        moveTenDown(board);
        board.drop(Tetromino.I_SHAPE);
        moveTenRight(board);
        moveTenDown(board);

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             ..........
             ..........
             .T..T.IIII`
          );
    })

});