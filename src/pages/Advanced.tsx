import { useEffect, useState } from 'react';
import FillTheGrid, { Grid, Dimension, ChildObject } from '../lib/fill2DSpace';
import classNames from 'classnames';
import { GridDimensionSelector } from '../components/GridDimensionSelector';

const gridObj = new FillTheGrid();

function Advanced() {
  const [gridDim, setGridDim] = useState<[number, number]>([3, 3]);
  const [grid, setGrid] = useState<Grid>([[]]);

  const [blocks, setBlocks] = useState<ChildObject[]>([]);

  useEffect(() => {
    gridObj.init(...gridDim);
    setGrid(gridObj.grid);
    console.log(gridObj);
  }, [gridDim]);

  const placeInput = (input: Dimension) => {
    console.log(input);
    gridObj.place(input);
    console.log(gridObj);
    setGrid([...gridObj.grid]);
    setBlocks([...gridObj.children]);
  };

  const randomColor = () => {
    const shade = Math.floor(Math.random() * 3);
    const r = Math.floor((shade === 0 ? 100 : 0) + Math.random() * 155);
    const g = Math.floor((shade === 1 ? 100 : 0) + Math.random() * 155);
    const b = Math.floor((shade === 2 ? 100 : 0) + Math.random() * 155);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  };

  console.log(grid);

  return (
    <>
      <h1>Fill the grid 2</h1>

      <div className="blocks">
        {blocks.map((b) => {
          return (
            <div
              className="block"
              style={{
                left: `${(b.x / grid[0].length) * 100}%`,
                top: `${(b.y / grid[0].length) * 100}%`,
                width: `${(b.w / grid[0].length) * 100}%`,
                height: `${(b.h / grid.length) * 100}%`,
                backgroundColor: randomColor(),
              }}
            >
              <img
                className="block-img"
                src={`https://picsum.photos/200/300?random=${Math.round(
                  Math.random() * 100
                )}`}
                crossOrigin="anonymous"
              />
            </div>
          );
        })}
      </div>
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
            setGridDim([4, 3]);
          }}
        >
          3x4
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

export default Advanced;
