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

  setFallingBlockAfterKick(block) {
    if(!this.runBlockConstrainCheck(this.checkOverlap, block)) {
      this.fallingBlock = block;
      return true;
    }
    return false;
  }

  checkKick(block) {
    if(this.setFallingBlockAfterKick(block)) {
      return;
    }
    let col = block.column;
    block.column--;
    if(this.setFallingBlockAfterKick(block)) {
      return;
    }
    block.column = col;
    block.column++;
    if(this.setFallingBlockAfterKick(block)) {
      return
    }
    block.column = col;
    block.column -= 2;
    if(this.setFallingBlockAfterKick(block)) {
      return
    }
    block.column = col;
    block.column += 2;
    if(this.setFallingBlockAfterKick(block)) {
      return
    }
    block.column = col;
  }

  rotateLeft() {
    let newBlock = this.fallingBlock.rotateLeft();
    this.checkKick(newBlock);
  }

  rotateRight() {
    let newBlock = this.fallingBlock.rotateRight();
    this.checkKick(newBlock);
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
    if (this.runBlockConstrainCheck(this.checkCanMoveDown)) {
      this.addToStoppedBlocks();
      this.fallingBlock = null;
      return;
    }
    this.fallingBlock.row++;
  }

  moveLeft() {
    if (!this.hasFalling() || this.runBlockConstrainCheck(this.checkCanMoveLeft)) {
      return;
    }
    this.fallingBlock.column--;
  }

  moveRight() {
    if (!this.hasFalling() || this.runBlockConstrainCheck(this.checkCanMoveRight)) {
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
    this.checkLineFull()
  }

  checkLineFull() {
    for (let row = 0; row < this.height; row++) {
      let full = true;
      for (let col = 0; col < this.width; col++) {
        if (this.stoppedBlocks[row][col] == this.EMPTY) {
          full = false;
        }
      }
      if (full) {
        this.stoppedBlocks[row].fill(this.EMPTY)
        this.makeStoppedBlocksFall(row);
      }
    }
  }

  makeStoppedBlocksFall(currentRow) {
    for (let row = this.height-2; row >= 0; row--) {
      for (let col = 0; col < this.width; col++) {
        if (this.stoppedBlocks[row+1][col] == this.EMPTY) {
          this.stoppedBlocks[row+1][col] = this.stoppedBlocks[row][col];
          this.stoppedBlocks[row][col] = this.EMPTY;
          this.checkLineFull();
        }
      }
    }
  }

  runBlockConstrainCheck(checker, block = this.fallingBlock) {
    let size = block.shape.length;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (block.shape[row][col] == block.color) {
          if (checker(row, col, block, this.height, this.width, this.stoppedBlocks, this.EMPTY)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  checkOverlap(row, col, block, height, width, stoppedBlocks, EMPTY) {
    if (row+block.row >= height || col+block.column >= width || col+block.column < 0) {
      return true;
    }
    return stoppedBlocks[row + block.row][col + block.column] != EMPTY;
  }

  checkCanMoveDown(row, col, block, height, width, stoppedBlocks, EMPTY) {
    if (row+block.row == height-1) {
      return true
    }
    return stoppedBlocks[row+block.row+1][block.column+col] != EMPTY;
  }

  checkCanMoveLeft(row, col, block, height, width, stoppedBlocks, EMPTY) {
    if (col+block.column <= 0) {
      return true;
    }
    return stoppedBlocks[row+block.row][block.column+col-1] != EMPTY;
  }

  checkCanMoveRight(row, col, block, height, width, stoppedBlocks, EMPTY) {
    if(col+block.column == width -1) {
      return true;
    }
    return stoppedBlocks[row+block.row][block.column+col+1] != EMPTY
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
