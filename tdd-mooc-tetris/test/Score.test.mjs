import { expect } from "chai";
import { Score } from "../src/Score.mjs";

describe("Score", () => {
    let score;

    it("level 0 score for one line", () => {
        score = new Score(0);
        score.addScore(1);
        expect(score.score).to.equal(40);
    });

    it("level 9 score for 3 lines", () => {
        score = new Score(9);
        score.addScore(3);
        expect(score.score).to.equal(3000);
    });
    
});