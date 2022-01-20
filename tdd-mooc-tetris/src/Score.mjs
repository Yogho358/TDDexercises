export class Score {
    score;
    level;

    constructor(level) {
        this.level = level;
        this.score = 0;
    }

    addScore(lines) {
        if (lines == 1) {
            this.score += 40 * (this.level +1)
        }
        if (lines == 2) {
            this.score += 100 * (this.level +1)
        }
        if (lines == 3) {
            this.score += 300 * (this.level +1)
        }
        if (lines == 4) {
            this.score += 1200 * (this.level +1)
        }
    }
}