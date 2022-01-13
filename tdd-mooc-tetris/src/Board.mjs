import { Utils } from "./Utils.mjs";

export class Board {
  width;
  height;
  fallingBlock;
  EMPTY;
  stoppedBlocks;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.EMPTY = ".";
    this.stoppedBlocks = Utils.make2dArray(this.height, this.width, this.EMPTY)
  }

  toString() {
    let board = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        board = this.draw(row, col, board)
      }
      board += "\n"
    }
    return board;
  }

  drop(block) {
    
    if (this.hasFalling()) {
      throw "already falling"
    }
    block.setColumn(this.findMiddleOfBoard())
    this.fallingBlock = block;
    this.fallingBlock.row = 0;
    this.fallingBlock.rotated = false;
  }

  findMiddleOfBoard() {
    let middle = Math.floor(this.width / 2);
    if(this.width % 2 == 0) {
      middle -= 1;
    }
    return middle;
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }
    if (this.stopFallingBlock(true,false, false)) {
      this.addToStoppedBlocks();
      this.fallingBlock = null;
      return;
    }
    this.fallingBlock.row++;
  }

  moveLeft() {
    if (!this.hasFalling() || this.stopFallingBlock(false,true,false)) {
      return;
    }
    this.fallingBlock.column--;
  }

  moveRight() {
    if (!this.hasFalling() || this.stopFallingBlock(false,false,true)) {
      return;
    }
    this.fallingBlock.column++;
  }

  moveDown() {
    this.tick();
  }

  addToStoppedBlocks() {
    let size = this.fallingBlock.shape.length;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (this.fallingBlock.shape[row][col] == this.fallingBlock.color){
          this.stoppedBlocks[row+this.fallingBlock.row][col+this.fallingBlock.column] = this.fallingBlock.color;
        }
      }
    }
  }

  stopFallingBlock (moveDown = false, moveLeft = false, moveRight = false) {
    let size = this.fallingBlock.shape.length;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (this.fallingBlock.shape[row][col] == this.fallingBlock.color) {
          if(
            (moveDown && this.checkCanMoveDown(row, col)) ||
            (moveLeft && this.checkCanMoveLeft(row, col)) ||
            (moveRight && this.checkCanMoveRight(row, col))
            ) {
              return true;
            }
        
        }      
      }
    }
    return false;
  }

  checkCanMoveDown(row, col) {
    if (row+this.fallingBlock.row == this.height-1) {
      return true
    }
    return this.stoppedBlocks[row+this.fallingBlock.row+1][this.fallingBlock.column+col] != this.EMPTY;
  }

  checkCanMoveLeft(row, col) {
    if (col+this.fallingBlock.column <= 0) {
      return true;
    }
    return this.stoppedBlocks[row+this.fallingBlock.row][this.fallingBlock.column+col-1] != this.EMPTY;
  }

  checkCanMoveRight(row, col) {
    if(col+this.fallingBlock.column == this.width -1) {
      return true;
    }
    return this.stoppedBlocks[row+this.fallingBlock.row][this.fallingBlock.column+col+1] != this.EMPTY
  }

  draw(row,col, board) {
    if(this.hasFalling()) {
      if(col >= this.fallingBlock.column && col < this.fallingBlock.column + this.fallingBlock.shape.length) {
        if (row >= this.fallingBlock.row && row < this.fallingBlock.row + this.fallingBlock.shape.length) {
          if (this.fallingBlock.shape[row-this.fallingBlock.row][col-this.fallingBlock.column] == this.fallingBlock.color) {
            return board + this.fallingBlock.color;
          }
        }
      }
    }

    if(this.stoppedBlocks[row][col] != this.EMPTY) {
      return board + this.stoppedBlocks[row][col];
    }
    return board + this.EMPTY;
  }

  hasFalling() {
    return this.fallingBlock != null;
  }

}
