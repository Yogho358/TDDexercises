export class Utils {

    static make2dArray(height, width, filling = undefined) {
        let arr2d = new Array(height);
        for (let i = 0; i < height; i++) {
            arr2d[i] = new Array(width).fill(filling);
        }
        return arr2d;
    }

}