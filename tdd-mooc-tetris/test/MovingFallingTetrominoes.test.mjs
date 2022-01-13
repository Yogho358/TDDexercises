import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

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
        for (let i = 0; i < 10; i++) {
            board.moveLeft();
        }
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