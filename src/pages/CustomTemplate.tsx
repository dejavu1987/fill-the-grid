import { FormEventHandler, useEffect, useState } from 'react';
import FillTheGrid, { Grid, Dimension, ChildObject } from '../lib/fill2DSpace';
import classNames from 'classnames';
import { GridDimensionSelector } from '../components/GridDimensionSelector';
import { createLogger } from 'vite';

const gridObj = new FillTheGrid();

function CustomTemplate() {
  const [gridDim, setGridDim] = useState<[number, number]>([3, 3]);
  const [grid, setGrid] = useState<Grid>([[]]);
  const [rowsColsTpl, setRowsColsTpl] = useState<number[][]>([
    [1, 2, 1],
    [2, 1, 1],
  ]);

  const [blocks, setBlocks] = useState<ChildObject[]>([]);

  useEffect(() => {
    gridObj.init(...gridDim);
    if (
      rowsColsTpl[0].length === gridDim[0] &&
      rowsColsTpl.length === gridDim[1]
    )
      gridObj.setGridTemplate(rowsColsTpl[0], rowsColsTpl[1]);
    setGrid(gridObj.grid);
  }, [gridDim]);

  const placeInput = (input: Dimension) => {
    gridObj.place(input);
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

  const saveTpl: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formRowsTpl = rowsColsTpl[0].map((r, i) =>
      // @ts-ignore
      parseInt(e.target[i].value)
    );
    const formColsTpl = rowsColsTpl[1].map((c, i) =>
      // @ts-ignore
      parseInt(e.target[i + rowsColsTpl[0].length].value)
    );
    console.log(formRowsTpl);
    console.log(formColsTpl);
    setRowsColsTpl([formRowsTpl, formColsTpl]);
  };

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
      <form onSubmit={saveTpl}>
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
          <div className="grid-tpl rows">
            <span>RowsTpl:</span>
            {rowsColsTpl[0].map((r, i) => (
              <input type="number" name={`rowsTpl[${i}]`} defaultValue={r} />
            ))}
          </div>
        </div>

        <div className="grid-tpl cols">
          <span>ColsTpl:</span>
          {rowsColsTpl[1].map((r, i) => (
            <input type="number" name={`colsTpl[${i}]`} defaultValue={r} />
          ))}
        </div>
        <input type="submit" value="Save tpl" />
      </form>

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

export default CustomTemplate;
