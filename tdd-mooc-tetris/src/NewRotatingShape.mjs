import { Utils } from "./Utils.mjs";

export class RotatingShape2 {
    shape;
    currentPosition;
    color;
    row;
    column;

    constructor(color = "x", row = 0, column = 0, currentPosition = 0) {
        this.color = color;
        this.row = row;
        this.column = column;
        this.currentPosition = currentPosition;
        this.shape = Utils.make2dArray(4,4);
        this.shape = this.createShape();
    }

    setColumn(col) {
        
        this.column = col-1;
    }

    findMiddle() {
        let middle = Math.floor(this.shape.length / 2);
        if(this.shape.length % 2 == 0) {
          middle -= 1;
        }
        return middle;
      }

    toString() {
        return this.shapeToString(this.shape);
    }

    shapeToString(shape) {
        let res = "";
        for(let i = 0; i<shape.length; i++){
            for(let j = 0; j<shape.length; j++){
                res += shape[i][j];
            }   
            res += "\n";       
        }
        return res;
    }

    createShape() {
        let grid = Utils.make2dArray(4,4);

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (this.currentPosition == 0) {
                    if (this.color == "I") {
                        if (row == 1) {
                            grid[row][col] = "I";
                        }
                    }// I pos 0
                }// pos 0
                if (this.currentPosition == 1) {
                    if (this.color == "I") {
                        if (col == 2) {
                            grid[row][col] = "I";
                        }
                    }// I pos 1
                }// pos 1
                if (this.currentPosition == 2) {
                    if (this.color == "I") {
                        if (row == 1) {
                            grid[row][col] = "I";
                        }
                    }// I pos 2
                }// pos 2
                if (this.currentPosition == 3) {
                    if (this.color == "I") {
                        if (col == 2) {
                            grid[row][col] = "I";
                        }
                    }// I pos 3
                }// pos3
            }
        }
        return grid;
    }

    rotateLeft() {
        let pos;
        if (this.currentPosition == 3) {
            pos = 0;
        } else {
            pos = this.currentPosition + 1;
        }
        return new RotatingShape2(this.color, this.row, this.column, pos)
    }

    rotateRight() {
        let pos;
        if (this.currentPosition == 0) {
            pos = 3;
        } else {
            pos = this.currentPosition - 1;
        }
        return new RotatingShape2(this.color, this.row, this.column, pos)
    }

}