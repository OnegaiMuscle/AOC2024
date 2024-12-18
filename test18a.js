const fs = require('fs');
const data = fs.readFileSync('inputDay18.txt', 'utf8').split('\n');
const bytes = data.map(line => line.split(',').map(Number));
const n = 71, m = 71;

function createGrid(numBytes) {
  const grid = Array.from({ length: n }, () => Array(m).fill('.'));
  for (let i = 0; i < numBytes; i++) {
    const [x, y] = bytes[i];
    grid[y][x] = '#';
  }
  return grid;
}

function hasPath(grid) {
  const queue = [[0, 0]];
  const visited = new Set();

  while (queue.length > 0) {
    const [i, j] = queue.shift();
    const key = `${i},${j}`;

    if (visited.has(key)) continue;
    visited.add(key);

    if (i === n - 1 && j === m - 1) {
      return true;
    }

    const directions = [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]];
    for (const [ii, jj] of directions) {
      if (ii < 0 || ii >= n || jj < 0 || jj >= m || grid[ii][jj] === '#') {
        continue;
      }
      queue.push([ii, jj]);
    }
  }
  return false;
}

let left = 0;
let right = bytes.length;
while (left < right - 1) {
  const mid = Math.floor((left + right) / 2);
  const grid = createGrid(mid);
  hasPath(grid) ? left = mid : right = mid;
}

const blockingByte = bytes[right - 1];
console.log(blockingByte[0],blockingByte[1]);
