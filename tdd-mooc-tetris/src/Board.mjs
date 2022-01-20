
import { Utils } from "./Utils.mjs";

export class Board {
  width;
  height;
  fallingBlock;
  fallingBlockRow;
  fallingBlockColumn;
  EMPTY;
  stoppedBlocks;
  scoreCounter;

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

  setScoreCounter(scoreCounter) {
    this.scoreCounter = scoreCounter;
  }

  setFallingBlockAfterKick(block, newCol) {
    if(!this.runBlockConstrainCheck(this.checkOverlap, block, newCol)) {
      this.fallingBlock = block;
      this.fallingBlockColumn = newCol;
      return true;
    }
    return false;
  }

  checkKick(block) {
    if(this.setFallingBlockAfterKick(block, this.fallingBlockColumn)) {
      return;
    }
    let col = this.fallingBlockColumn;
    col--;
    if(this.setFallingBlockAfterKick(block, col)) {
      return;
    }
    col = this.fallingBlockColumn;
    col++;
    if(this.setFallingBlockAfterKick(block, col)) {
      return
    }
    col = this.fallingBlockColumn;
    col -= 2;
    if(this.setFallingBlockAfterKick(block, col)) {
      return
    }
    col = this.fallingBlockColumn;
    col += 2;
    if(this.setFallingBlockAfterKick(block, col)) {
      return
    }
    this.fallingBlockColumn = col;
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
    this.fallingBlockColumn = this.findMiddleOfBoard()-1;
    this.fallingBlock = block;
    this.fallingBlockRow = 0;
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
    this.fallingBlockRow++;
  }

  moveLeft() {
    if (!this.hasFalling() || this.runBlockConstrainCheck(this.checkCanMoveLeft)) {
      return;
    }
    this.fallingBlockColumn--;
  }

  moveRight() {
    if (!this.hasFalling() || this.runBlockConstrainCheck(this.checkCanMoveRight)) {
      return;
    }
    this.fallingBlockColumn++;
  }

  moveDown() {
    this.tick();
  }

  addToStoppedBlocks() {
    let size = this.fallingBlock.shape.length;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (this.fallingBlock.shape[row][col] == this.fallingBlock.color){
          this.stoppedBlocks[row+this.fallingBlockRow][col+this.fallingBlockColumn] = this.fallingBlock.color;
        }
      }
    }
    this.checkLineFull()
  }

  checkLineFull() {
    let fullRows = []
    for (let row = 0; row < this.height; row++) {
      let full = true;
      for (let col = 0; col < this.width; col++) {
        if (this.stoppedBlocks[row][col] == this.EMPTY) {
          full = false;
        }
      }
      if (full) {
        fullRows = fullRows.concat(row)
      }
    }
    if(fullRows.length > 0) {
      if(this.scoreCounter) {
        this.scoreCounter.addScore(fullRows.length)
      }
      for (let i = 0; i < fullRows.length; i++) {
        this.stoppedBlocks[fullRows[i]].fill(this.EMPTY)
      }
      this.makeStoppedBlocksFall();
    }
    
  }

  makeStoppedBlocksFall() {
    for (let row = this.height -2; row >= 0; row--) {
      for (let col = 0; col < this.width; col++) {
        let temp = this.stoppedBlocks[row][col];
        this.stoppedBlocks[row][col] = this.EMPTY;
        let newRow = this.findRowToFallIn(row, col);
        this.stoppedBlocks[newRow][col] = temp;
      }
    }
    this.checkLineFull()
  }

  findRowToFallIn(row, col) {
    for (row; row < this.height; row++) {
      let nextRow = row+1;
      if (nextRow == this.height || this.stoppedBlocks[nextRow][col] != this.EMPTY) {
        return row;
      } 
    }
  }

  runBlockConstrainCheck(checker, block = this.fallingBlock, newCol = this.fallingBlockColumn) {
    let size = block.shape.length;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (block.shape[row][col] == block.color) {
          if (checker(row, col, block, this.height, this.width, this.stoppedBlocks, this.EMPTY, this.fallingBlockRow, newCol)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  checkOverlap(row, col, block, height, width, stoppedBlocks, EMPTY, fallingBlockRow, fallingBlockColumn) {
    if (row+fallingBlockRow >= height || col+fallingBlockColumn >= width || col+fallingBlockColumn < 0) {
      return true;
    }
    return stoppedBlocks[row + fallingBlockRow][col + fallingBlockColumn] != EMPTY;
  }

  checkCanMoveDown(row, col, block, height, width, stoppedBlocks, EMPTY, fallingBlockRow, fallingBlockColumn) {
    if (row+fallingBlockRow == height-1) {
      return true
    }
    return stoppedBlocks[row+fallingBlockRow+1][fallingBlockColumn+col] != EMPTY;
  }

  checkCanMoveLeft(row, col, block, height, width, stoppedBlocks, EMPTY, fallingBlockRow, fallingBlockColumn) {
    if (col+fallingBlockColumn <= 0) {
      return true;
    }
    return stoppedBlocks[row+fallingBlockRow][fallingBlockColumn+col-1] != EMPTY;
  }

  checkCanMoveRight(row, col, block, height, width, stoppedBlocks, EMPTY, fallingBlockRow, fallingBlockColumn) {
    if(col+fallingBlockColumn == width -1) {
      return true;
    }
    return stoppedBlocks[row+fallingBlockRow][fallingBlockColumn+col+1] != EMPTY
  }

  draw(row,col, board) {
    if(this.hasFalling()) {
      if(col >= this.fallingBlockColumn && col < this.fallingBlockColumn + this.fallingBlock.shape.length) {
        if (row >= this.fallingBlockRow && row < this.fallingBlockRow + this.fallingBlock.shape.length) {
          if (this.fallingBlock.shape[row-this.fallingBlockRow][col-this.fallingBlockColumn] == this.fallingBlock.color) {
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
