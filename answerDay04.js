console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay04.txt', 'utf8');
const input = data.trim().split('\n');

function countXMAS(grid) {
  const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  const [rows, cols] = [grid.length, grid[0].length];
  const isXMAS = (x, y, dx, dy) => {
    for (let i = 0; i < 4; i++) {
      if (x < 0 || x >= cols || y < 0 || y >= rows || grid[y][x] !== "XMAS"[i]) return false;
      [x, y] = [x + dx, y + dy];
    };
    return true;
  };

  let count = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for ([dy, dx] of directions) {
        if (isXMAS(col, row, dx, dy)) count++;
      };
    };
  };
  return count;
}

console.log('answer01:', countXMAS(input));

function countXmasPattern(grid) {
  const [rows, cols] = [grid.length, grid[0].length];
  const isEqual = (pair1, pair2) => {
    return pair1[0] === pair2[0] && pair1[1] === pair2[1];
  };
  const isValid = (row, col) => {
    const checkValue = ['M', 'S'];
    const diagonal1 = [grid[row - 1][col - 1], grid[row + 1][col + 1]].sort();
    const diagonal2 = [grid[row + 1][col - 1], grid[row - 1][col + 1]].sort();
    return isEqual(diagonal1, checkValue) * isEqual(diagonal2, checkValue); // implicit JS coercition
  };

  let count = 0;
  for(let row = 1; row < rows - 1; row++) {
    for(let col = 1; col < cols - 1; col++) {
        count += grid[row][col] === 'A' ? isValid(row, col) : 0;
    };
  };
  return count;
};

console.log('answer02:', countXmasPattern(input));

console.timeEnd('Execution Time');
