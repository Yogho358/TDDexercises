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

describe("Moving falling tetromino", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    it("can be moved left while dropping", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick();
        board.moveLeft();

        expect(board.toString()).to.equalShape(
            `..........
             ...T......
             ..TTT.....
             ..........
             ..........
             ..........`
        );
    });

    it("can be moved right while dropping", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick();
        board.moveRight();

        expect(board.toString()).to.equalShape(
            `..........
             .....T....
             ....TTT...
             ..........
             ..........
             ..........`
        );
    });

    it("can be moved down while dropping", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick();
        board.moveDown();

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ....T.....
             ...TTT....
             ..........
             ..........`
        );
    });

    it("can't be moved over the board's side to the left", () => {
        board.drop(Tetromino.T_SHAPE);
        moveTenLeft(board)
        expect(board.toString()).to.equalShape(
            `.T........
             TTT.......
             ..........
             ..........
             ..........
             ..........`
        );
    });

    it("can't be moved over the board's side to the right", () => {
        board.drop(Tetromino.T_SHAPE);
        moveTenRight(board)
        expect(board.toString()).to.equalShape(
            `........T.
             .......TTT
             ..........
             ..........
             ..........
             ..........`
        );
    });

    it("can't be moved though the floor", () => {
        board.drop(Tetromino.T_SHAPE);
        moveTenDown(board)
        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             ..........
             ....T.....
             ...TTT....`
        );
    });

    it("stops when hitting stopped block on left", () => {
        board.drop(Tetromino.T_SHAPE);
        moveTenLeft(board);
        moveTenDown(board);
        board.drop(Tetromino.O_SHAPE);
        board.tick();
        board.tick();
        board.tick();
        moveTenLeft(board);
        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             ..OO......
             .TOO......
             TTT.......`
        );
    });

    it("stops when hitting stopped block on left", () => {
        board.drop(Tetromino.T_SHAPE);
        moveTenRight(board);
        moveTenDown(board);
        board.drop(Tetromino.O_SHAPE);
        board.tick();
        board.tick();
        board.tick();
        moveTenRight(board);
        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             ......OO..
             ......OOT.
             .......TTT`
        );
    });


});