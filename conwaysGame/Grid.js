import produce from 'immer';

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];
const num_rows = 10;
const num_cols = 10;
const Grid = {
  createEmptyGrid: () => {
    const rows = [];
    for (let i = 0; i < num_rows; i++) {
      rows.push(Array.from(Array(num_cols), () => 0));
    }
    return rows;
  },
  mutateGrid: (grid, row_index, col_index) => {
    const new_grid = produce(grid, (grid_copy) => {
      grid_copy[row_index][col_index] = grid[row_index][col_index] ? 0 : 1;
    });
    return new_grid;
  },
  randomPath: () => {
    const rows = [];
    for (let i = 0; i < num_rows; i++) {
      rows.push(
        Array.from(Array(num_cols), () => (Math.random() > 0.8 ? 1 : 0)),
      );
    }
    return rows;
  },
  startGame: (current_grid) => {
    return produce(current_grid, (grid_copy) => {
      for (let i = 0; i < num_rows; i++) {
        for (let j = 0; j < num_cols; j++) {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const new_i = i + x;
            const new_j = j + y;
            if (
              new_i >= 0 &&
              new_i < num_rows &&
              new_j >= 0 &&
              new_j < num_cols
            ) {
              neighbors += current_grid[new_i][new_j];
            }
          });
          if (neighbors < 2 || neighbors > 3) {
            grid_copy[i][j] = 0;
          } else if (current_grid[i][j] === 0 && neighbors === 3) {
            grid_copy[i][j] = 1;
          }
        }
      }
    });
  },
};

export default Grid;
