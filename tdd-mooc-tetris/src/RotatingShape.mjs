import { Utils } from "./Utils.mjs";

export class RotatingShape {
    shape;
    positions;
    rotated;
    row;
    color;
    column;

    constructor(shape, positions = 4, rotated = false, color = "x", row = 0, column = 0) {
        let splitShape = shape.split("\n").map(s=>s.trim());
        let size = splitShape.length;
        let arr2d = Utils.make2dArray(size, size)
        for (let i = 0; i < size; i++) {
            let s = splitShape[i];
            for (let j = 0; j < size; j++) {
                arr2d[i][j] = s[j];
            }
        }
        this.shape = arr2d;
        this.positions = positions;
        this.rotated = rotated;
        this.row = row;
        this.color = color;
        this.column = column
    }

    setColumn(col) {
        let middle = this.findMiddle();
        this.column = col-middle;
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

    handleRotateLeft() {
        let size = this.shape.length;
        let newArray = Utils.make2dArray(size);
        for(let i = 0; i<size;i++) {
            for (let j =0; j<size;j++) {
                newArray[i][j] = this.shape[j][size-i-1];
            }
        }
        return this.rotatingShapeFactory(newArray);
    }

    handleRotateRight() {
        let size = this.shape.length;
        let newArray = Utils.make2dArray(size);
        for(let i = 0; i<size;i++) {
            for (let j =0; j<size;j++) {
                newArray[i][j] = this.shape[size-j-1][i];
            }
        }
        return this.rotatingShapeFactory(newArray);
    }

    rotatingShapeFactory(array) {
        return new RotatingShape(this.shapeToString(array).trim(), this.positions, !this.rotated, this.color, this.row, this.column);
    }

    rotateLeft() {
        if (this.positions ==1) {
            return this;
        }
        if (this.positions == 2 && !this.rotated){
            return this.handleRotateRight();
        }

        return this.handleRotateLeft();
    }

    rotateRight() {
        if (this.positions ==1) {
            return this;
        }
        if (this.positions == 2 && this.rotated){
            return this.handleRotateLeft();
        }

        return this.handleRotateRight();
    }
}