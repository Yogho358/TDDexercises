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
    this.stoppedBlocks = []
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
    block.column = this.findMiddleOfBoard()
    this.fallingBlock = block;
  }

  findMiddleOfBoard() {
    let middle = Math.floor(this.width / 2);
    if(this.width % 2 == 0) {
      middle -= 1;
    }
    return middle;
  }

  tick() {
    if (this.fallingBlock.row == this.height-1 || this.hitsBlock(this.fallingBlock.row)) {
      this.stoppedBlocks = this.stoppedBlocks.concat(this.fallingBlock);
      this.fallingBlock = null;
      return;
    }
    this.fallingBlock.row++;
  }

  hitsBlock(row) {
    for (let i = 0; i < this.stoppedBlocks.length; i++) {
      let block  =this.stoppedBlocks[i];
      if (block.row == row+1) {
        return true;
      }
    }
    return false;
  }

  draw(row,col, board) {
    let middle = this.findMiddleOfBoard()

    if (this.hasFalling() && this.fallingBlock.row == row && col == middle) {
      return board + this.fallingBlock.color;
    }

    if (this.hasFalling()){
      for (let checkedRow = 0; checkedRow < 5; checkedRow++){
        if (row+checkedRow >= this.fallingBlock.shape.length){
          continue;
        }
        for (let checkedCol = -5; checkedCol <= 5; checkedCol++) {
          if (middle+checkedCol < 0 || middle+checkedCol >= this.fallingBlock.shape.length){
            continue;
          }
          if (this.fallingBlock.shape[row+checkedRow][col+checkedCol] == this.fallingBlock.color){
            return board +this.fallingBlock.color;
          }
        }
    }
    }

    for (let i = 0; i < this.stoppedBlocks.length; i++) {
      let block = this.stoppedBlocks[i];
      if (block.row == row && col == 1) { 
        return board + block.color;
      }
    }
    return board + this.EMPTY;
  }

  hasFalling() {
    return this.fallingBlock != null;
  }

}
