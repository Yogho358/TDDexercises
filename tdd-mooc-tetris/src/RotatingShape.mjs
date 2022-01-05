export class RotatingShape {
    shape;
    positions;
    rotated;

    constructor(shape, positions = 4, rotated = false) {
        let splitShape = shape.split("\n").map(s=>s.trim());
        let size = splitShape.length;
        let arr2d = this.make2dArray(size)
        for (let i = 0; i < size; i++) {
            let s = splitShape[i];
            for (let j = 0; j < size; j++) {
                arr2d[i][j] = s[j];
            }
        }
        this.shape = arr2d;
        this.positions = positions;
        this.rotated = rotated;
    }

    make2dArray(size) {
        let arr2d = new Array(size);
        for (let i = 0; i < size; i++) {
            arr2d[i] = new Array(size);
        }
        return arr2d;
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
        let newArray = this.make2dArray(size);
        for(let i = 0; i<size;i++) {
            for (let j =0; j<size;j++) {
                newArray[i][j] = this.shape[j][size-i-1];
            }
        }
        return new RotatingShape(this.shapeToString(newArray).trim(), this.positions, !this.rotated);
    }

    handleRotateRight() {
        let size = this.shape.length;
        let newArray = this.make2dArray(size);
        for(let i = 0; i<size;i++) {
            for (let j =0; j<size;j++) {
                newArray[i][j] = this.shape[size-j-1][i];
            }
        }
        return new RotatingShape(this.shapeToString(newArray).trim(), this.positions, !this.rotated);
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