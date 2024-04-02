import { useEffect, useState } from 'react';
import FillTheGrid, { Grid, Dimension } from '../lib/fill2DSpace';
import classNames from 'classnames';
import { GridDimensionSelector } from '../components/GridDimensionSelector';

const gridObj = new FillTheGrid();

function Basic() {
  const [gridDim, setGridDim] = useState<[number, number]>([3, 3]);
  const [grid, setGrid] = useState<Grid>([[]]);

  useEffect(() => {
    gridObj.init(...gridDim);
    setGrid(gridObj.grid);
  }, [gridDim]);

  const placeInput = (input: Dimension) => {
    console.log(input);
    gridObj.place(input);
    console.log(gridObj.grid);
    setGrid([...gridObj.grid]);
  };

  console.log(grid);

  return (
    <>
      <h1>Fill the grid</h1>
      <div className="stage">
        <div className="grid-wrap">
          {grid.map((r) => (
            <div style={{ display: 'flex', gap: 2 }}>
              {r.map((c) => (
                <div className={classNames('cell', c && 'green')}>{c}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <span>Grid Size: </span>
        <button
          onClick={() => {
            setGridDim([2, 2]);
          }}
        >
          2x2
        </button>
        <button
          onClick={() => {
            setGridDim([3, 3]);
          }}
        >
          3x3
        </button>
        <button
          onClick={() => {
            setGridDim([4, 4]);
          }}
        >
          4x4
        </button>
        <button
          onClick={() => {
            setGridDim([gridDim[0] + 1, gridDim[1] + 1]);
          }}
        >
          ++
        </button>
        <div className="input">
          <GridDimensionSelector
            rows={5}
            cols={5}
            onChange={(dim) => placeInput(dim)}
          />
        </div>
      </div>
    </>
  );
}

export default Basic;
