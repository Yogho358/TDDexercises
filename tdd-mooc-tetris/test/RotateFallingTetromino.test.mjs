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

    it("can be rotated left while dropping", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick();
        board.rotateLeft();

        expect(board.toString()).to.equalShape(
            `..........
             ....T.....
             ...TT.....
             ....T.....
             ..........
             ..........`
        );
    });

    it("can be rotated right while dropping", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick();
        board.rotateRight();

        expect(board.toString()).to.equalShape(
            `..........
             ....T.....
             ....TT....
             ....T.....
             ..........
             ..........`
        );
    });

    it("can be rotated left while dropping and moving left", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick();
        board.moveLeft();
        board.rotateLeft();

        expect(board.toString()).to.equalShape(
            `..........
             ...T......
             ..TT......
             ...T......
             ..........
             ..........`
        );
    });

    it("wall kick from board's right edge", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick();
        board.rotateLeft();
        moveTenRight(board);
        board.rotateRight();
        expect(board.toString()).to.equalShape(
            `..........
             ........T.
             .......TTT
             ..........
             ..........
             ..........`
        );
    });

    it("wall kick from board's left edge", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick();
        board.rotateRight();
        moveTenLeft(board);
        board.rotateLeft();
        expect(board.toString()).to.equalShape(
            `..........
             .T........
             TTT.......
             ..........
             ..........
             ..........`
        );
    });
    

});