import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

class FakeScore {
    lines;

    addScore(lines) {
        this.lines = lines;
    }
}

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

describe("BoardSendsLineScore", () => {
    let board;
    let score;
    beforeEach(() => {
        board = new Board(4, 6);
        score = new FakeScore();
        board.setScoreCounter(score);
    });

    it("Two Os give 2",() => {
        board.drop(Tetromino.O_SHAPE);
        moveTenLeft(board);
        moveTenDown(board);
        board.drop(Tetromino.O_SHAPE);
        moveTenRight(board);
        moveTenDown(board);

        expect(score.lines).to.equal(2);
    });
});