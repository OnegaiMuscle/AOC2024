console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay18.txt', 'utf8').split('\n');
const bytes = data.map(line => line.split(',').map(Number));
const n = 71, m = 71;
const grid = Array.from({ length: n }, () => Array(m).fill('.'));
for (let i = 0; i < 1024; i++) {
  const [x, y] = bytes[i];
  grid[y][x] = '#';
}

function bfs(grid) {
  const queue = [[0, 0, 0]];
  const visited = new Set();

  let k = 0;
  while (k < queue.length) {
    const [i, j, steps] = queue[k];
    const directions = [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]]
    visited.add(`${i},${j}`);
    if (i === n - 1 && j === m - 1) {
      return steps;
    }
    for (const [ii, jj] of directions) {
      if (ii < 0 || ii >= n || jj < 0 || jj >= m || visited.has(`${ii},${jj}`) || grid[ii][jj] === '#') {
        continue;
      }
      queue.push([ii, jj, steps + 1]);
      visited.add(`${ii},${jj}`);
    }
    k++;
  }
  return 0;
}

console.log(bfs(grid));

console.timeEnd('Execution Time');
