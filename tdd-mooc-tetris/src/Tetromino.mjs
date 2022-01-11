import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {

    static T_SHAPE = new RotatingShape(".T.\nTTT\n...",4, false, "T");
    static I_SHAPE = new RotatingShape(".....\n.....\nIIII.\n.....\n.....", 2, false, "I")
    static O_SHAPE = new RotatingShape(".OO\n.OO\n...", 1, false, "O")
}