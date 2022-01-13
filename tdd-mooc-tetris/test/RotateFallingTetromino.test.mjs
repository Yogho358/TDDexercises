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

    it("I shape rotates and stops at left edge", () => {
        board.drop(Tetromino.I_SHAPE);
        board.tick();
        board.rotateLeft();
        moveTenLeft(board);

        expect(board.toString()).to.equalShape(
            `..........
             I.........
             I.........
             I.........
             I.........
             ..........`
        );
    });

    it("I shape rotates and stops at right edge", () => {
        board.drop(Tetromino.I_SHAPE);
        board.tick();
        board.rotateRight();
        moveTenRight(board);

        expect(board.toString()).to.equalShape(
            `..........
             .........I
             .........I
             .........I
             .........I
             ..........`
        );
    });

    it("I shape kicks from right wall", () => {
        board.drop(Tetromino.I_SHAPE);
        board.tick();
        board.rotateRight();
        moveTenRight(board);
        board.rotateRight();

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             ......IIII
             ..........
             ..........`
        );
    });

    it("I shape kicks from right wall", () => {
        board.drop(Tetromino.I_SHAPE);
        board.tick();
        board.rotateRight();
        moveTenLeft(board);
        board.rotateLeft();

        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ..........
             IIII......
             ..........
             ..........`
        );
    });
    
    it("wall kick from existing block on left", () => {
        board.drop(Tetromino.O_SHAPE);
        moveTenLeft(board);
        moveTenDown(board);
        board.drop(Tetromino.O_SHAPE);
        moveTenLeft(board);
        moveTenDown(board);
        board.drop(Tetromino.O_SHAPE);
        moveTenLeft(board);
        moveTenDown(board);
        board.drop(Tetromino.T_SHAPE);
        board.rotateRight();
        moveTenLeft(board);
        board.rotateLeft();
        expect(board.toString()).to.equalShape(
            `OO.T......
             OOTTT.....
             OO........
             OO........
             OO........
             OO........`
        );
    });

    it("wall kick from existing block on right", () => {
        board.drop(Tetromino.O_SHAPE);
        moveTenRight(board);
        moveTenDown(board);
        board.drop(Tetromino.O_SHAPE);
        moveTenRight(board);
        moveTenDown(board);board.drop(Tetromino.O_SHAPE);
        moveTenRight(board);
        moveTenDown(board);
        board.drop(Tetromino.T_SHAPE);
        board.rotateRight();
        moveTenRight(board);
        board.rotateLeft();
        expect(board.toString()).to.equalShape(
            `......T.OO
             .....TTTOO
             ........OO
             ........OO
             ........OO
             ........OO`
        );
    });
    

});