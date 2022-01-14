import { RotatingShape } from "./RotatingShape.mjs";
import { RotatingShape2 } from "./NewRotatingShape.mjs";

export class Tetromino {

    static T_SHAPE = new RotatingShape(".T.\nTTT\n...",4, false, "T", 0);
    static I_SHAPE = new RotatingShape2("I")
    static O_SHAPE = new RotatingShape(".OO\n.OO\n...", 1, false, "O", 0)
}