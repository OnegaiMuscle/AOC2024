const fs = require('fs');
const data = fs.readFileSync('inputDay18.txt', 'utf8').split('\n');
const bytes = data.map(line => line.split(',').map(Number));
const n = 71, m = 71;

function bfs(grid) {
  const queue = [[0, 0]];
  const visited = new Set();
  visited.add('0,0');
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  while (queue.length > 0) {
    const [i, j] = queue.shift();
    if (i === n - 1 && j === m - 1) {
      return true;
    }
    for (const [di, dj] of directions) {
      const ni = i + di, nj = j + dj;
      if (ni >= 0 && ni < n && nj >= 0 && nj < m && !visited.has(`${ni},${nj}`) && grid[ni][nj] === '.') {
        queue.push([ni, nj]);
        visited.add(`${ni},${nj}`);
      }
    }
  }

  return false;
}

function findBlockingByte(bytes, n, m) {
  const grid = Array.from({ length: n }, () => Array(m).fill('.'));

  for (let t = 0; t < bytes.length; t++) {
    const [x, y] = bytes[t];
    grid[y][x] = '#';
    if (!bfs(grid)) {
      return `${x},${y}`;
    }
  }
  return null;
}

const result = findBlockingByte(bytes, n, m);
console.log(result);
