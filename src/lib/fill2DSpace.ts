export interface Dimension {
  w: number;
  h: number;
}

export interface Position {
  x: number;
  y: number;
}

export type ChildObject = Dimension & Position;

export type Grid = (0 | 1)[][];

class FillTheGrid {
  grid: Grid;
  children: ChildObject[];
  calcChildren: ChildObject[];
  rowsTemplate: number[];
  colsTemplate: number[];
  rowPositions: number[];
  colPositions: number[];
  rowSizes: number[];
  colSizes: number[];

  constructor() {
    this.grid = [];
    this.children = [];
    this.calcChildren = [];
    this.rowsTemplate = [];
    this.colsTemplate = [];
    this.rowPositions = [];
    this.colPositions = [];
    this.rowSizes = [];
    this.colSizes = [];
  }

  init(rows: number, cols: number): this {
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    this.rowsTemplate = Array(rows).fill(1);
    this.colsTemplate = Array(cols).fill(1);
    this.calcRowColPositions();
    this.children = [];
    return this;
  }

  setGridTemplate(rowTpl: number[], colTpl?: number[]): void {
    if (rowTpl.length !== this.grid.length) {
      throw new Error('Invalid row template length');
    }
    if (colTpl && colTpl.length !== this.grid[0].length) {
      throw new Error('Invalid column template length');
    }
    this.rowsTemplate = rowTpl;
    if (colTpl) {
      this.colsTemplate = colTpl;
    }
    this.calcRowColPositions();
  }

  private arraySum(arr: number[], end: number, start = 0) {
    return arr.slice(start, end + 1).reduce((a, x) => a + x, 0);
  }

  private calcRowColPositions(): void {
    this.rowPositions = this.rowsTemplate.map(
      (r, i) =>
        this.arraySum(this.rowsTemplate, i - 1) /
        this.arraySum(this.rowsTemplate, this.rowsTemplate.length)
    );
    this.colPositions = this.colsTemplate.map(
      (r, i) =>
        this.arraySum(this.colsTemplate, i - 1) /
        this.arraySum(this.colsTemplate, this.colsTemplate.length)
    );
    this.calcRowColSizes();
  }

  private calcRowColSizes(): void {
    this.rowSizes = this.rowsTemplate.map(
      (r) => r / this.arraySum(this.rowsTemplate, this.rowsTemplate.length)
    );
    this.colSizes = this.colsTemplate.map(
      (r) => r / this.arraySum(this.colsTemplate, this.colsTemplate.length)
    );
  }

  calculateChildren(): void {
    this.calcChildren = this.children.map((child) => {
      const newChild = { ...child };
      newChild.x = this.colPositions[child.x];
      newChild.y = this.rowPositions[child.y];
      newChild.w = this.arraySum(this.colSizes, child.x + child.w - 1, child.x);
      newChild.h = this.arraySum(this.rowSizes, child.y + child.h - 1, child.y);
      return newChild;
    });
  }

  place(input: Dimension): Grid {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        if (this.canPlaceInput(row, col, input)) {
          this.fillInput(row, col, input);
          return this.grid;
        }
      }
    }
    throw 'Not enough space in the grid';
  }

  private canPlaceInput(row: number, col: number, input: Dimension): boolean {
    if (
      row + input.h > this.grid.length ||
      col + input.w > this.grid[0].length
    ) {
      return false; // Input goes out of bounds
    }
    for (let i = row; i < row + input.h; i++) {
      for (let j = col; j < col + input.w; j++) {
        if (this.grid[i][j] === 1) {
          return false; // Cell is already occupied
        }
      }
    }
    return true;
  }

  private fillInput(row: number, col: number, input: Dimension): void {
    for (let i = row; i < row + input.h; i++) {
      for (let j = col; j < col + input.w; j++) {
        this.grid[i][j] = 1;
      }
    }
    this.children.push({
      ...input,
      x: col,
      y: row,
    });
  }
}

export default FillTheGrid;
