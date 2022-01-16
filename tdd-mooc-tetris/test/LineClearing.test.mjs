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

    it("Line clears when full", () => {

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
    });

    it("Stopped blocks fall when line under disappears", () => {
        board.drop(Tetromino.T_SHAPE);
        moveTenLeft(board);
        moveTenDown(board);
        board.drop(Tetromino.T_SHAPE);
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
             .T..T.....`
          );

    });

    it("If making stopped blocks disappear causes line to get full, line disappears", () => {
        board.drop(Tetromino.O_SHAPE);
        moveTenRight(board);
        moveTenDown(board);
        board.drop(Tetromino.O_SHAPE);
        board.moveRight();
        board.moveRight();
        moveTenDown(board);
        board.drop(Tetromino.O_SHAPE);
        moveTenDown(board);
        board.drop(Tetromino.O_SHAPE);
        board.moveLeft();
        board.moveLeft();
        moveTenDown(board);
        board.drop(Tetromino.I_SHAPE);
        moveTenLeft(board);
        moveTenDown(board);
        board.drop(Tetromino.I_SHAPE);
        board.moveRight();
        moveTenDown(board);
        board.drop(Tetromino.T_SHAPE);
        board.rotateRight();
        moveTenLeft(board);
        moveTenDown(board);
        board.drop(Tetromino.O_SHAPE);
        moveTenRight(board);
        moveTenDown(board);

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             ..........
             T.......OO
             T.OOOOOOOO`
          );

    });

});