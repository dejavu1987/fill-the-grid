import classNames from 'classnames';
import { FC, useState } from 'react';

type Grid = number[][];
interface Dimension {
  w: number;
  h: number;
}
type GridDimensionSelectorProps = {
  rows: number;
  cols: number;
  onChange: (val: Dimension) => void;
};

const createGrid = (rows: number, cols: number): Grid => {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
};

const GridDimensionSelector: FC<GridDimensionSelectorProps> = ({
  rows,
  cols,
  onChange,
}) => {
  const [grid, setGrid] = useState<Grid>(createGrid(rows, cols));

  const updateGrid = (x: number, y: number) => {
    const newGrid = createGrid(rows, cols);
    for (let i = 0; i <= y; i++) {
      newGrid[i].fill(1, 0, x + 1);
    }
    setGrid(newGrid);
  };
  return (
    <div>
      {grid.map((row, y) => (
        <div style={{ display: 'flex' }}>
          {row.map((col, x) => (
            <div
              className={classNames('cell', col && 'blue')}
              onMouseOver={() => updateGrid(x, y)}
              onClick={() => onChange({ w: x + 1, h: y + 1 })}
            >
              {col}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export { GridDimensionSelector };
