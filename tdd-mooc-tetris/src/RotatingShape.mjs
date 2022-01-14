import { Utils } from "./Utils.mjs";

export class RotatingShape {
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
        this.createShape();
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

    createTShape() {
     
        let shape0 = [".","T",".",
                      "T","T","T",
                      ".",".","."]
        

        
        let shape1 = [".","T",".",
                      "T","T",".",
                      ".","T","."]
        

       
        let shape2 = [".",".",".",
                      "T","T","T",
                      ".","T","."]
        

        
        let shape3 = [".","T",".",
                      ".","T","T",
                      ".","T","."]
        
        let shape;
        if (this.currentPosition == 0) {
            shape = shape0;
        }
        if (this.currentPosition == 1) {
            shape = shape1;
        }
        if (this.currentPosition == 2) {
            shape = shape2;
        }
        if (this.currentPosition == 3) {
            shape = shape3;
        }
        let grid = Utils.make2dArray(3,3);
        this.setShape(shape, grid)        
    }

    createIShape() {
        let shape0 = [".",".",".",".",".",
                      ".",".",".",".",".",
                      "I","I","I","I",".",
                      ".",".",".",".",".",
                      ".",".",".",".","."]
        

        
        let shape1 = [".",".","I",".",".",
                      ".",".","I",".",".",
                      ".",".","I",".",".",
                      ".",".","I",".",".",
                      ".",".",".",".","."]

        
        let shape;
        if (this.currentPosition == 0) {
            shape = shape0;
        }
        if (this.currentPosition == 1) {
            shape = shape1;
        }
        if (this.currentPosition == 2) {
            shape = shape0;
        }
        if (this.currentPosition == 3) {
            shape = shape1;
        }
        let grid = Utils.make2dArray(5,5);
        this.setShape(shape, grid)
    }

    createOShape() {
        let shape = [".","O","O",
                      ".","O","O",
                      ".",".","."]
        
        let grid = Utils.make2dArray(3,3);
        this.setShape(shape, grid)        
    }

    setShape(shape, grid) {
        let i = 0;
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid.length; col++) {
                grid[row][col] = shape[i];
                i++;
            }
        }
        this.shape = grid;
    }

    createShape() {
        if (this.color == "T") {
            this.createTShape();
        }
        if (this.color == "I") {
            this.createIShape();
        }
        if(this.color == "O") {
            this.createOShape();
        }
    }

    rotateLeft() {
        let pos;
        if (this.currentPosition == 3) {
            pos = 0;
        } else {
            pos = this.currentPosition + 1;
        }
        return new RotatingShape(this.color, this.row, this.column, pos)
    }

    rotateRight() {
        let pos;
        if (this.currentPosition == 0) {
            pos = 3;
        } else {
            pos = this.currentPosition - 1;
        }
        return new RotatingShape(this.color, this.row, this.column, pos)
    }

}